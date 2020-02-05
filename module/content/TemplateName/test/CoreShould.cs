using TemplateName.Core;
using TemplateName.Sample;
using FluentValidation;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace TemplateName.Test
{
    public class CoreShould : BaseIntegrationTestClass
    {
        public CoreShould(CustomWebApplicationFactory<Startup> factory) : base(factory) { }

        [Fact]
        public void Not_Throw()
        {
            IConfiguration config = GetRequiredService<IConfiguration>();
        }
    }
}
