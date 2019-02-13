using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using TemplateName.Infrastructure;

namespace TemplateName.Api
{
    public class DataContextFactory : IDesignTimeDbContextFactory<SampleDbContext>
    {
        public SampleDbContext CreateDbContext(string[] args)
        {
            var configuration = Program.Configuration;

            var builder = new DbContextOptionsBuilder<SampleDbContext>();

            var connectionString = configuration.GetConnectionString("MsSqlLocalDb");

            builder.UseSqlServer(connectionString, options =>
             {
                 options.MigrationsAssembly("TemplateName.Module");
             });

            return new SampleDbContext(builder.Options);
        }
    }
}
