using Application.Interface.SPI;
using Infrastructure.DB;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebAPI.Infrastructure.DB;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection ConfigureInfrastructureServices(this IServiceCollection services, Microsoft.Extensions.Configuration.ConfigurationManager configuration)
        {
            // user ef core in memory db
            services.AddDbContext<DemoDBContext>(o => o.UseInMemoryDatabase("demo-db"));
            services.AddScoped<IDbContext>(provider => provider.GetRequiredService<DemoDBContext>());

            // memory cache
            services.AddMemoryCache();
            services.AddScoped<ICacheUsersService, MemoryCacheUsersService>();

            services.AddScoped<DBGenerator>();

            services.AddSingleton<IDateTimeService, DateTimeService>();

            services.AddScoped<IUserRepository, UserRepository>();

            // adding health check service.
            services.AddHealthChecks()
                   .AddDbContextCheck<DemoDBContext>();

            return services;
        }
    }
}