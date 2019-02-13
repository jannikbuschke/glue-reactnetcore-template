using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TemplateName.Api.Validation;
using TemplateName.Infrastructure;
using TemplateName.Module.Contacts;

namespace TemplateName.Api.Features
{

    public class CreateContactRequest
    {
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Phone]
        public string Phone { get; set; }
    }

    [Route("api/Contacts")]
    [ApiVersion("1.0")]
    [ApiController]
    public class ContactCommandsController : ControllerBase
    {
        private readonly SampleDbContext ctx;

        public ContactCommandsController(SampleDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpPost("create-contact")]
        public async Task<IActionResult> Create(CreateContactRequest request)
        {
            var contact = new Contact
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Phone = request.Phone
            };
            ctx.Contacts.Add(contact);
            await ctx.SaveChangesAsync();
            return Ok(contact);
        }

        [HttpPost("validate-create-contact")]
        public ActionResult<IActionResult> ValidateCreate(CreateContactRequest request)
        {
            return Ok();
        }
    }
}
