using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Core;
using System;
using System.IO;

namespace TemplateName.Api
{
    public class Program
    {
        private static string EnvironmentName => Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";

        public static IConfiguration Configuration {
            get
            {
                var environment = EnvironmentName;

                return new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                    .AddJsonFile($"appsettings.{EnvironmentName}.json", optional: true, reloadOnChange: true)
                    .AddEnvironmentVariables()
                    .Build();
            }
        }

        private static Logger GetPreStartLogger()
        {
            return EnvironmentName == "Production"
                ? new LoggerConfiguration()
                    .WriteTo.RollingFile("log/log-{Date}.txt")
                    .CreateLogger()
                : new LoggerConfiguration()
                    .WriteTo.Console()
                    .CreateLogger();
        }


        public static int Main(string[] args)
        {
            Log.Logger = GetPreStartLogger();
            var name = typeof(Program).Namespace;
            Log.Information($"Starting {name}");

            try
            {
                Log.Logger = new LoggerConfiguration()
                    .ReadFrom.Configuration(Configuration)
                    .Enrich.FromLogContext()
                    .Enrich.WithProperty("Application", typeof(Program).Namespace)
                    .CreateLogger();

                Log.Information($"Build host {name}");
                var host = CreateWebhost(args).Build();
                using (var scope = host.Services.CreateScope())
                {
                    var ctx = scope.ServiceProvider.GetRequiredService<SampleDbContext>();
                    if (EnvironmentName == "Development" || EnvironmentName == "Test")
                    {
                        ctx.Database.EnsureDeleted();
                        ctx.Database.Migrate();
                        SeedDevelopmentData(ctx);
                    }
                    else
                    {
                        ctx.Database.Migrate();
                    }

                }
                host.Run();
                return 0;

            }
            catch (Exception e)
            {
                Log.Fatal(e, "Host terminated unexpectedly");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IWebHostBuilder CreateWebhost(string[] args)
        {
            return new WebHostBuilder()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseKestrel()
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseConfiguration(Configuration)
                .UseSerilog();
        }

        private static void SeedDevelopmentData(SampleDbContext ctx)
        {
            ctx.Contacts.Add(
                new Contact
                {
                    Email = "sample@email.com",
                    FirstName = "Max",
                    LastName = "Müller",
                    Phone = "012345"
                });
            ctx.Contacts.Add(new Contact
            {
                Email = "angelo@email.com",
                FirstName = "Angelo",
                LastName = "Merte"
            }
            );
            ctx.SaveChanges();
        }
    }
}
