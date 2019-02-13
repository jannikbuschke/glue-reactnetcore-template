using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using TemplateName.Infrastructure;
using TemplateName.Module.Contacts;

namespace TemplateName.Api.Features
{
    [ODataRoutePrefix("Contacts")]
    [ApiVersion("1.0")]
    public class ContactsOdataController : ODataController
    {
        private readonly SampleDbContext ctx;

        public ContactsOdataController(SampleDbContext ctx)
        {
            this.ctx = ctx;
        }

        [ODataRoute]
        [EnableQuery]
        public IQueryable<Contact> GetContacts()
        {
            return ctx.Contacts;
        }
    }
}
