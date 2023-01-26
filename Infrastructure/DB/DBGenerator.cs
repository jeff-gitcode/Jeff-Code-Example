using Domain;

using Microsoft.Extensions.Logging;

namespace Infrastructure.DB;

public class DBGenerator
{
    private readonly ILogger<DBGenerator> _logger;
    private readonly DemoDBContext _context;

    public DBGenerator(ILogger<DBGenerator> logger, DemoDBContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task InitializeAsync()
    {
        await _context.Database.EnsureCreatedAsync();
        await SeedAsync();
    }

    public async Task SeedAsync()
    {
        try
        {
            // Default data
            // Seed, if necessary
            if (!_context.Users.Any())
            {
                _context.Users.Add(new UserDTO
                {
                    Id = Guid.NewGuid().ToString(),
                    FirstName = "John",
                    LastName = "Doe",
                });

                await _context.SaveChangesAsync();
            }
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }
}
