using Application.Interface.SPI;
using Domain;
using FluentValidation;
using MediatR;

namespace Application.Users;

public record UpdateUserCommand(UserDTO tempUser) : IRequest<UserDTO>;

public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, UserDTO>
{
    private readonly IUserRepository _userRepository;

    public UpdateUserCommandHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserDTO> Handle(UpdateUserCommand request, CancellationToken cancellationToken) => await _userRepository.UpdateAsync(request.tempUser);
}

public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
{
    public UpdateUserCommandValidator()
    {
        RuleFor(v => v.tempUser.FirstName)
            .NotEmpty();

        RuleFor(v => v.tempUser.LastName)
            .NotEmpty();
    }
}



