using Microsoft.AspNetCore.Mvc;

namespace TemplateName.Api.Controllers
{
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [ApiVersionNeutral]
    [Route("api/[controller]")]
    public class ValueController : Controller
    {
        [HttpGet]
        public string Index()
        {
            return "Hello World";
        }
    }

    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [ApiVersionNeutral]
    public class ValuesController : Controller
    {
        [HttpGet]
        public string Index()
        {
            return "Hello World2";
        }
    }
}
