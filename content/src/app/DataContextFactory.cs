using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using TemplateName.Infrastructure;

namespace TemplateName.Api
{
    public class DataContextFactory : IDesignTimeDbContextFactory<SampleDbContext>
    {
        public SampleDbContext CreateDbContext(string[] args)
        {
            // IConfigurationRoot configuration = new ConfigurationBuilder()
            //     .SetBasePath(Directory.GetCurrentDirectory())
            //     .AddJsonFile("appsettings.json")
            //     .Build();

            var builder = new DbContextOptionsBuilder<SampleDbContext>();

            //var connectionString = configuration.GetConnectionString("DefaultConnection");

            builder.UseSqlServer("Data Source=simagendaschedulerapp-dbserver.database.windows.net;Initial Catalog=SIMAgendaSchedulerApp-prod_db;User ID=agenda-planner-root;Password=7-fgs7qan01n6r-y9o7sp7;Connect Timeout=60;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False", options => options.MigrationsAssembly(typeof(SampleDbContext).Assembly.FullName));

            return new SampleDbContext(builder.Options);
        }
    }
}
