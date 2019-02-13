using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TemplateName.Module.Contacts;

namespace TemplateName.Api
{
    public class OdataConfigurations : IModelConfiguration
    {
        public void Apply(ODataModelBuilder builder, ApiVersion apiVersion)
        {
            var contact = builder.EntitySet<Contact>("Contacts");
        }
    }
}
