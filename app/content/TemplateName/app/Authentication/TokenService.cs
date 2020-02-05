using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;

namespace Glue.Authentication
{
    public class TokenService
    {
        private readonly AzureAdOptions _azureAdOptions;
        private readonly string[] _scopes = new[] { "https://graph.microsoft.com/User.Read" };
        private readonly UserTokenCacheProviderFactory _userTokenCacheProviderFactory;

        public TokenService(IOptions<AzureAdOptions> options, UserTokenCacheProviderFactory userTokenCacheProviderFactory)
        {
            _azureAdOptions = options.Value;
            _userTokenCacheProviderFactory = userTokenCacheProviderFactory;
        }

        public async Task<AuthenticationResult> GetAccessTokenByAuthorizationCodeAsync(ClaimsPrincipal principal, string code)
        {
            IConfidentialClientApplication app = BuildApp(principal);
            AuthenticationResult result = await app.AcquireTokenByAuthorizationCode(_scopes, code).ExecuteAsync().ConfigureAwait(false);
            IAccount account = await app.GetAccountAsync(principal.GetMsalAccountId());
            return result;
        }

        public Task<AuthenticationResult> GetAccessTokenAsync(ClaimsPrincipal principal)
        {
            return GetAccessTokenAsync(principal, _scopes);
        }

        public async Task<AuthenticationResult> GetAccessTokenAsync(ClaimsPrincipal principal, string[] scopes)
        {
            IConfidentialClientApplication app = BuildApp(principal);
            IAccount account = await app.GetAccountAsync(principal.GetMsalAccountId());

            // guest??
            if (null == account)
            {
                System.Collections.Generic.IEnumerable<IAccount> accounts = await app.GetAccountsAsync();
                account = accounts.FirstOrDefault(a => a.Username == principal.GetLoginHint());
            }

            AuthenticationResult token = await app.AcquireTokenSilent(scopes, account).ExecuteAsync().ConfigureAwait(false);
            return token;
        }

        public void RemoveAccount(ClaimsPrincipal principal)
        {
            _userTokenCacheProviderFactory.Create(principal).Clear();
        }

        private IConfidentialClientApplication BuildApp(ClaimsPrincipal principal)
        {
            IConfidentialClientApplication app = ConfidentialClientApplicationBuilder.Create(_azureAdOptions.ClientId)
                .WithClientSecret(_azureAdOptions.ClientSecret)
                // we only allow users from our tenant
                .WithAuthority(AzureCloudInstance.AzurePublic, Guid.Parse(_azureAdOptions.TenantId))
                // reply url
                .WithRedirectUri(_azureAdOptions.BaseUrl + _azureAdOptions.CallbackPath)
                .Build();

            _userTokenCacheProviderFactory.Create(principal).Initialize(app.UserTokenCache);

            return app;
        }
    }
}
