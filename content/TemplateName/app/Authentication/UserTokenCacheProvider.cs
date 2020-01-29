using System;
using System.Security.Claims;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Identity.Client;

namespace Glue.Authentication
{
    public class UserTokenCacheProvider
    {
        // the in memory cache
        private readonly IMemoryCache _cache;
        private readonly ClaimsPrincipal _principal;

        public UserTokenCacheProvider(IMemoryCache cache, ClaimsPrincipal principal)
        {
            _cache = cache;
            _principal = principal;
        }

        public void Initialize(ITokenCache tokenCache)
        {
            tokenCache.SetBeforeAccess(BeforeAccessNotification);
            tokenCache.SetAfterAccess(AfterAccessNotification);
            tokenCache.SetBeforeWrite(BeforeWriteNotification);
        }

        public void Clear()
        {
            _cache.Remove(_principal.GetMsalAccountId());
        }

        private void AfterAccessNotification(TokenCacheNotificationArgs args)
        {
            if (args.HasStateChanged)
            {
                Persist(_principal.GetMsalAccountId(), args.TokenCache);
            }
        }

        private void BeforeAccessNotification(TokenCacheNotificationArgs args)
        {
            Load(_principal.GetMsalAccountId(), args.TokenCache);
        }

        private void BeforeWriteNotification(TokenCacheNotificationArgs args)
        {
        }

        private void Persist(string key, ITokenCacheSerializer tokenCache)
        {
            _cache.Set(key, tokenCache.SerializeMsalV3(), DateTimeOffset.Now.AddHours(12));
        }

        private void Load(string key, ITokenCacheSerializer tokenCache)
        {
            byte[] data = (byte[]) _cache.Get(key);
            tokenCache.DeserializeMsalV3(data);
        }
    }
}
