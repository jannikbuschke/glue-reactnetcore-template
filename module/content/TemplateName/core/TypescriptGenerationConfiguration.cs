using Reinforced.Typings.Fluent;

namespace TemplateName.Core
{
    public class TypescriptGenerationConfiguration
    {
        public static void Configure(ConfigurationBuilder builder)
        {
            builder.Global(options =>
            {
                options.CamelCaseForProperties(true);
                options.UseModules(true);
            });

            //builder.ExportAsInterface<Contacts.Contact>()
            //    .WithDefaults();
        }
    }
}
