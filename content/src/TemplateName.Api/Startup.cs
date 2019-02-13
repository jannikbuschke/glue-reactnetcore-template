using AutoMapper;
using AutoMapper.EquivalencyExpression;
using MediatR;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNet.OData.Formatter;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using Npgsql;
using Serilog;
using System;
using System.Data;
using System.Linq;
using System.Net;
using TemplateName.Infrastructure;

namespace TemplateName.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IHostingEnvironment env, IConfiguration configuration)
        {
            Configuration = configuration;

            Log.Information("Configuring " + env.ApplicationName);
            Log.Information("Environment: " + env.EnvironmentName);
            Log.Information("ContentRoot: " + env.ContentRootPath);
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
               .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1)
               .AddJsonOptions(options =>
               {
                   options.SerializerSettings.Formatting = Formatting.Indented;
                   options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
               });

            services.AddVersionedApiExplorer(o => o.GroupNameFormat = "'v'VVV");

            services.AddApiVersioning(options =>
            {
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.DefaultApiVersion = new ApiVersion(1, 0);
                options.ReportApiVersions = true;
            });
            services.AddOData().EnableApiVersioning();

            //workaround for swagger/odata/api-versioning integrationg: https://github.com/OData/WebApi/issues/1177#issuecomment-358659774
            services.AddMvcCore(options =>
            {
                foreach (var outputFormatter in options.OutputFormatters.OfType<ODataOutputFormatter>().Where(_ => _.SupportedMediaTypes.Count == 0))
                {
                    outputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
                }
                foreach (var inputFormatter in options.InputFormatters.OfType<ODataInputFormatter>().Where(_ => _.SupportedMediaTypes.Count == 0))
                {
                    inputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
                }
            });

            services.AddSwaggerDocument();

            services.AddOptions();

            services.AddAutoMapper(cfg =>
            {
                cfg.AddCollectionMappers();
            });

            services.AddMediatR(typeof(Startup).Assembly);

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "TemplateName.Client/build";
            });

            services.AddDbContext<SampleDbContext>(options =>
            {
                //options.UseSqlite(Configuration.GetConnectionString("Sqlite"));
                options.UseSqlServer(Configuration.GetConnectionString("MsSqlLocalDb"), dbOptions =>
                 {
                     dbOptions.MigrationsAssembly("TemplateName.Module");
                 });
                //options.UseInMemoryDatabase(Configuration.GetConnectionString("InmemoryDb"));
                //options.EnableSensitiveDataLogging(env.IsDevelopment());
            });

            var connectionString = Configuration.GetConnectionString("Default");

            services.AddSingleton<Func<IDbConnection>>(() =>
            {
                var connection = new NpgsqlConnection(connectionString);
                connection.Open();
                return connection;
            });
        }

        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment env,
            ILoggerFactory loggerFactory,
            IApiVersionDescriptionProvider provider,
            VersionedODataModelBuilder modelBuilder
        )
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            var pathBase = Configuration["ASPNETCORE_APPL_PATH"] ?? Configuration["APPL_PATH"] ?? "/";
            if (!string.IsNullOrEmpty(pathBase))
            {
                app.UsePathBase(pathBase);
            }

            app.UseHttpsRedirection();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                  name: "mvc",
                  template: "{controller=Home}/{action=Index}/{id?}"
                );

                routes.Select().Expand().Filter().OrderBy().MaxTop(100).Count();
                routes.MapVersionedODataRoutes("odata", "odata", modelBuilder.GetEdmModels());
                routes.EnableDependencyInjection();
            });

            foreach (var path in new string[] { "/api", "/odata" })
            {
                app.Map(path, builder =>
                {
                    builder.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                        await context.Response.WriteAsync("");
                    });
                });
            }


            app.UseSwagger();
            app.UseSwaggerUi3();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "TemplateName.Client";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                    //spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

    }
}
