using Application.Interface.SPI;
using Domain;
using MediatR;

namespace Application.Users;

public record GetUserByIdQuery(string id) : IRequest<UserDTO>;

public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, UserDTO>
{
    private readonly IUserRepository _userRepository;

    public GetUserByIdQueryHandler(IUserRepository userRepository) => _userRepository = userRepository;

    public async Task<UserDTO> Handle(GetUserByIdQuery request, CancellationToken cancellationToken) =>
        await _userRepository.GetByIdAsync(request.id);
}