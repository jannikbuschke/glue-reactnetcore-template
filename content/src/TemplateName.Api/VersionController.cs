namespace TemplateName.Api
{
    [ApiVersion("1.0")]
    [Route("api/[controller]")]
    [Route("api/Info")]
    public class VersionController : Controller
    {
        [HttpGet]
        public string Get()
        {
            return System.IO.File.ReadAllText("CurrentCommit.txt");
        }
    }
}
