using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace TemplateName.Core
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddTemplateName(this IServiceCollection services)
        {
            services.AddMediatR();
            return services;
        }
    }
}
