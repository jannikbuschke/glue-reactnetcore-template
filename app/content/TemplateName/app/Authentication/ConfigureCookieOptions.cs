using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Options;

namespace Glue.Authentication
{
    public static partial class AzureAdAuthenticationBuilderExtensions
    {
        public class ConfigureCookieOptions : IConfigureNamedOptions<CookieAuthenticationOptions>
        {
            private readonly TicketStoreService _ticketStore;

            public ConfigureCookieOptions(TicketStoreService service)
            {
                _ticketStore = service;
            }

            public void Configure(string name, CookieAuthenticationOptions options)
            {
                options.SessionStore = _ticketStore;
            }

            public void Configure(CookieAuthenticationOptions options)
            {
                Configure(Options.DefaultName, options);
            }
        }
    }
}
