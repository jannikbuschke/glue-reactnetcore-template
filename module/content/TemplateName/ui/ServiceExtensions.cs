using System.Collections.Generic;
using System.Reflection;
using TemplateName.Core;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

namespace TemplateName.Ui
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddTemplateNameUi(this IServiceCollection services, IEnumerable<Assembly> assembliesToScan)
        {
            services.AddMvcCore();

            return services;
        }

        public static void UseTemplateNameUi(this IApplicationBuilder app)
        {
            app.UseFileServer(new FileServerOptions
            {
                RequestPath = "/__configuration",
                FileProvider = new ManifestEmbeddedFileProvider(
                    assembly: Assembly.GetAssembly(typeof(ServiceExtensions)), "web/build")
            });
        }
    }
}
