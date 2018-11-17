using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace TemplateName.Api.Features.FeatureA
{
    [ApiVersion("1.0")]
    [Route("api/[controller]")]
    public class HelloWorldController : Controller
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return "Hello World";
        }
    }
}
