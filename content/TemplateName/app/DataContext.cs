using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using TemplateName.Contacts;

namespace TemplateName
{
    public class DbContextFactory : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            IConfiguration config = Program.Configuration;
            string cs = config["ConnectionStrings:Default"];
            DbContextOptionsBuilder<DataContext> builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseSqlServer(cs, options => options.MigrationsAssembly(typeof(Program).Assembly.FullName));
            return new DataContext(builder.Options);
        }
    }

    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }

}
