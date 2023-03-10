using Application.Interface.SPI;
using Domain;
using MediatR;

namespace Application.Users;

public record GetAllUsersQuery : IRequest<IEnumerable<UserDTO>>;

public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IEnumerable<UserDTO>>
{
    private readonly IUserRepository _userRepository;

    public GetAllUsersQueryHandler(IUserRepository userRepository) => _userRepository = userRepository;

    public async Task<IEnumerable<UserDTO>> Handle(GetAllUsersQuery request,
        CancellationToken cancellationToken)
    {
        return await _userRepository.GetAllAsync();
    }
}

