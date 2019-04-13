using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using TemplateName.Infrastructure;
using TemplateName.Module.Contacts;

namespace TemplateName.Api.Features
{
    public class CreateContactRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }

    [Route("api/[controller]")]
    [ApiVersion("1.0")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly SampleDbContext ctx;

        public ContactsController(SampleDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet]
        public IQueryable<Contact> Get()
        {
            return ctx.Contacts;
        }

        [HttpPost("create-contact")]
        public async Task<IActionResult> Create(CreateContactRequest request)
        {
            ctx.Contacts.Add(new Contact
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Phone = request.Phone
            });
            await ctx.SaveChangesAsync();
            return Ok();
        }
    }
}
