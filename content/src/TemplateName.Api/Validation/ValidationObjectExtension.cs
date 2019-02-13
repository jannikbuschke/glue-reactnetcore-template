using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateName.Api.Validation
{
    public static class ValidationObjectExtension
    {
        public static List<ValidationResult> Validate(this object obj)
        {
            var context = new ValidationContext(obj, serviceProvider: null, items: null);
            var validationResults = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(obj, context, validationResults, true);
            return validationResults;
        }
    }
}
