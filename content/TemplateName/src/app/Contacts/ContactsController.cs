using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TemplateName.Contacts
{
    [ODataRoutePrefix("Contacts")]
    [ApiVersion("1.0")]
    public class ContactsOdataController : ODataController
    {
        private readonly DataContext ctx;

        public ContactsOdataController(DataContext ctx)
        {
            this.ctx = ctx;
        }

        [ODataRoute("{key}")]
        [EnableQuery]
        public SingleResult<Contact> Get(Guid key)
        {
            return new SingleResult<Contact>(ctx.Contacts.Where(v => v.Id == key));
        }

        [ODataRoute]
        [EnableQuery]
        public IQueryable<Contact> Get()
        {
            return ctx.Contacts;
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    public class ContactsController : ControllerBase
    {
        private readonly DataContext ctx;

        public ContactsController(DataContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet("{key}")]
        public async Task<Contact> Get(Guid key)
        {
            return await ctx.Contacts.SingleAsync(v => v.Id == key);
        }

        [HttpPost("create")]
        public async Task<ActionResult<Contact>> CreateContact(Contact contact)
        {
            ctx.Contacts.Add(contact);
            await ctx.SaveChangesAsync();

            return Created("odata/Contacts", contact);
        }
    }
}
