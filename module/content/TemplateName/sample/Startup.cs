using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TemplateName.Core;
using TemplateName.Ui;

namespace TemplateName.Sample
{
    public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration config)
        {
            configuration = config;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddTemplateName();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
            app.UseTemplateNameUi();

            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "web";

            //    if (env.IsDevelopment())
            //    {
            //        spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
            //    }
            //});

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("hello world");
            });
        }
    }
}
