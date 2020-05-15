using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TemplateName.Core;

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
            services.AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
            });
            services.AddTemplateName();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();

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
