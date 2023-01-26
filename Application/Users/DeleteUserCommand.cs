using Application.Interface.SPI;
using MediatR;

namespace Application.Users;

public record DeleteUserCommand(string id) : IRequest;

public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Unit>
{
    private readonly IUserRepository _userRepository;

    public DeleteUserCommandHandler(IUserRepository userRepository) => _userRepository = userRepository;

    public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        await _userRepository.DeleteAsync(request.id);

        return Unit.Value;
    }
}