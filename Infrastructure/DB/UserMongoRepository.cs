using Application.Interface.SPI;

using Domain;

using Infrastructure.DB;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MediatR;
using Microsoft.Extensions.Logging;
using Infrastructure.Config;

namespace WebAPI.Infrastructure.DB;

public class UserMongoRepository : IUserRepository
{
    private readonly IMongoCollection<UserMongo> _users;
    private readonly ILogger<UserMongoRepository> _logger;

    public UserMongoRepository(IOptions<MongoDBSettings> settings, ILogger<UserMongoRepository> logger)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);

        _users = database.GetCollection<UserMongo>(settings.Value.UsersCollectionName);
        _logger = logger;
    }

    public async Task<UserDTO> GetByIdAsync(string id)
    {
        var user = await _users.Find(user => user.Id == id).FirstOrDefaultAsync();
        return user is null ? null : new UserDTO(){Id = user.Id, FirstName = user.FirstName, LastName = user.LastName};
    }

    public async Task<UserDTO> AddAsync(UserDTO user)
    {
        var userMongo = new UserMongo(){FirstName = user.FirstName, LastName = user.LastName};
        await _users.InsertOneAsync(userMongo);
        return new UserDTO(){Id = userMongo.Id, FirstName = userMongo.FirstName, LastName = userMongo.LastName};
    }
    
    public async Task<UserDTO> UpdateAsync(UserDTO user)
    {
        var userMongo = new UserMongo(){Id = user.Id, FirstName = user.FirstName, LastName = user.LastName};
        await _users.ReplaceOneAsync(user => user.Id == userMongo.Id, userMongo);
        return new UserDTO(){Id = userMongo.Id, FirstName = userMongo.FirstName, LastName = userMongo.LastName};
    }

    public async Task<Unit> DeleteAsync(string id)
    {
        await _users.DeleteOneAsync(user => user.Id == id);
        return Unit.Value;
    }

    public async Task<List<UserDTO>> GetAllAsync()
    {
        var users = await _users.Find(user => true).ToListAsync();
        return users.Select(user => new UserDTO(){Id = user.Id, FirstName = user.FirstName, LastName = user.LastName}).ToList();
    }

    IEnumerable<UserDTO> IUserRepository.FindWithSpecificationPattern(ISpecification<UserDTO> specification)
    {
        throw new NotImplementedException();
    }
}