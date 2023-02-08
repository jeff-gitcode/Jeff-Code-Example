using Application.Interface.SPI;
using Infrastructure.Config;
using Infrastructure.DB;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using WebAPI.Infrastructure.DB;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection ConfigureInfrastructureServices(this IServiceCollection services, Microsoft.Extensions.Configuration.ConfigurationManager configuration)
        {
            services.Configure<ConfigurationSettings>(configuration);
            ServiceProvider serviceProvider = services.BuildServiceProvider();
            ConfigurationSettings opt = serviceProvider.GetRequiredService<IOptions<ConfigurationSettings>>().Value;

            // user ef core in memory db
            services.AddDbContext<DemoDBContext>(o => o.UseInMemoryDatabase("demo-db"));
            services.AddScoped<IDbContext>(provider => provider.GetRequiredService<DemoDBContext>());

            // memory cache
            services.AddMemoryCache();
            services.AddScoped<ICacheUsersService, MemoryCacheUsersService>();

            services.AddScoped<DBGenerator>();

            services.AddSingleton<IDateTimeService, DateTimeService>();

            if (opt.MongoDBSettings.EFCore)
            {
                services.AddScoped<IUserRepository, UserRepository>();
            }
            else
            {
                services.AddScoped<IUserRepository, UserMongoRepository>();
            }

            // adding health check service.
            services.AddHealthChecks()
                   .AddDbContextCheck<DemoDBContext>();

            return services;
        }
    }
}