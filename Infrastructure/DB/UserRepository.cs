using Application.Interface.SPI;

using Domain;

using Infrastructure.DB;

using MediatR;
using Microsoft.Extensions.Logging;

namespace WebAPI.Infrastructure.DB;

public class UserRepository : IUserRepository
{
    private readonly IDbContext _context;
    private readonly ILogger<UserRepository> _logger;

    public UserRepository(IDbContext context, ILogger<UserRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<UserDTO>> GetAllAsync()
    {
        // Get rid of async warning for now
        await Task.CompletedTask;

        // return _users;
        return _context.Users.ToList();
    }

    public async Task<UserDTO> GetByIdAsync(string id)
    {
        await Task.CompletedTask;

        return _context.Users.FirstOrDefault(x => x.Id == id);
    }

    public async Task<UserDTO> AddAsync(UserDTO user)
    {
        user.Id = Guid.NewGuid().ToString();

        _context.Users.Add(user);

        var result = await _context.SaveChangesAsync();

        _logger.LogInformation($"[Created] Receive Request from {user.FirstName} {user.LastName}");

        return user;
    }

    public async Task<UserDTO> UpdateAsync(UserDTO user)
    {
        _context.Users.Update(user);
        var result = await _context.SaveChangesAsync();

        _logger.LogInformation($"[Updated] Receive Request from {user.FirstName} {user.LastName}");
        return user;
    }

    public async Task<Unit> DeleteAsync(string id)
    {
        var user = _context.Users.FirstOrDefault(x => x.Id == id);
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        _logger.LogInformation($"[Deleted] Receive Request from {user.FirstName} {user.LastName}");
        return Unit.Value;

    }

    public IEnumerable<UserDTO> FindWithSpecificationPattern(ISpecification<UserDTO> specification = null)
    {
        return SpecificationEvaluator<UserDTO>.GetQuery(_context.Users.AsQueryable(), specification);
    }
}