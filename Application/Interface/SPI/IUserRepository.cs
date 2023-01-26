using Domain;

using MediatR;

namespace Application.Interface.SPI;

public interface IUserRepository
{
    Task<List<UserDTO>> GetAllAsync();
    Task<UserDTO> GetByIdAsync(string id);
    Task<UserDTO> AddAsync(UserDTO tempUser);
    Task<UserDTO> UpdateAsync(UserDTO tempUser);
    Task<Unit> DeleteAsync(string id);

    IEnumerable<UserDTO> FindWithSpecificationPattern(ISpecification<UserDTO> specification = null);
}