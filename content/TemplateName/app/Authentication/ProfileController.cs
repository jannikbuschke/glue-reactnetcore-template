using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Client;

namespace Glue.Authentication
{
    public class Profile
    {
        public string Displayname { get; set; }
        public string IdentityName { get; set; }
        public bool IsAuthenticated { get; set; }
        public IEnumerable<string> Scopes { get; set; }
    }

    public class HasConsented
    {
        public bool Value { get; set; }
    }

    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IHostingEnvironment env;
        private readonly ILogger<ProfileController> logger;
        private readonly TokenService tokenService;

        public ProfileController(IHostingEnvironment env, ILogger<ProfileController> logger, TokenService tokenService)
        {
            this.env = env;
            this.logger = logger;
            this.tokenService = tokenService;
        }

        [Authorize]
        [HttpGet("has-consent")]
        public async Task<HasConsented> HasConsent(string scope)
        {
            try
            {
                AuthenticationResult result = await tokenService.GetAccessTokenAsync(User, new string[] { scope });
                return new HasConsented { Value = result.Scopes.Contains(scope.ToLower()) };
            }
            catch (MsalUiRequiredException e)
            {
                if (e.ErrorCode == "invalid_grant")
                {
                    return new HasConsented { Value = false };
                }
                throw e;
            }
        }

        [HttpGet("me")]
        [Authorize]
        [AllowAnonymous]
        public async Task<Profile> Get()
        {
            bool isAuthenticated = User?.Identity.IsAuthenticated ?? false;
            IEnumerable<string> scopes = env.IsDevelopment() ? new string[] { } : isAuthenticated ? (await tokenService.GetAccessTokenAsync(User)).Scopes : null;

            return new Profile
            {
                Displayname = User?.Claims.FirstOrDefault(v => v.Type == "name")?.Value,
                IdentityName = User?.Identity.Name,
                IsAuthenticated = isAuthenticated,
                Scopes = scopes
            };
        }

        [HttpGet]
        [Authorize]
        public object Index()
        {
            logger.LogInformation("Identity {@identity}", User.Identity);
            return User.Identity;
        }

        [HttpGet("claims")]
        [Authorize]
        public object Claims()
        {
            var claims = User.Claims.Select(c => new { c.Value, c.Type }).ToList();
            logger.LogInformation("Claims {@claims}", claims);

            return claims;
        }
    }
}
