using System.Security.Claims;
using Microsoft.Extensions.Caching.Memory;

namespace Glue.Authentication
{
    public class UserTokenCacheProviderFactory
    {
        private readonly IMemoryCache _memoryCache;

        public UserTokenCacheProviderFactory(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public UserTokenCacheProvider Create(ClaimsPrincipal principal)
        {
            return new UserTokenCacheProvider(_memoryCache, principal);
        }
    }
}
