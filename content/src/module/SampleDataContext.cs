using Microsoft.EntityFrameworkCore;
using TemplateName.Module.Contacts;

namespace TemplateName.Infrastructure
{
    public class SampleDbContext : DbContext
    {
        public SampleDbContext(DbContextOptions<SampleDbContext> options) : base(options) { }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }

}
