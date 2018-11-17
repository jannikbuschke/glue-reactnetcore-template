using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;
using Serilog;
using System;
using System.Data;
using MediatR;
using Newtonsoft.Json;
using AutoMapper;
using AutoMapper.EquivalencyExpression;
using System.Net;
using Microsoft.AspNetCore.Http;

namespace TemplateName.Api
{
    public class Startup
    {
        private const string CorsAllowAny = "AllowAnyOrigin";

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
            services.AddMvcCore().AddVersionedApiExplorer(
                options =>
                {
                    options.GroupNameFormat = "'v'VVV";
                });

            services.AddMvc()
                .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1)
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.Formatting = Formatting.Indented;
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });
            services.AddApiVersioning(options => options.ReportApiVersions = true);
            services.AddCustomSwaggerGen(services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>());

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

            //services.AddDbContext<SampleDbContext>(options=>{
            //options.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=AgendaScheduler-dev;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            //    options.UseInMemoryDatabase("inmem.db");
            //    options.EnableSensitiveDataLogging(env.IsDevelopment());
            //});

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
            IApiVersionDescriptionProvider provider)
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

            app.UseMvc();

            app.Map("/api", builder =>
            {
                builder.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    await context.Response.WriteAsync("");
                });
            });

            app.UseSwagger();
            app.UseCustomSwaggerUI(provider, pathBase);

            app.UseSpaStaticFiles();

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
