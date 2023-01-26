using Application.Behaviours;
using Application.Users;
using AutoFixture.Xunit2;
using Domain;
using FluentAssertions;
using FluentValidation;
using MediatR;

namespace CodeTest.TestProject.Application.Behaviours;

public class ValidationBehaviourTest
{
    [Theory, AutoData]
    public async Task Should_Throw_When_Validation_Fails()
    {
        // Arrange
        CreateUserCommand request = new CreateUserCommand(new UserDTO() { FirstName = string.Empty, LastName = string.Empty });
        var validator = new CreateUserCommandValidator();
        var validators = new List<IValidator<CreateUserCommand>> { validator };
        var sut = new ValidationBehaviour<CreateUserCommand, UserDTO>(validators);
        var next = new RequestHandlerDelegate<UserDTO>(() => Task.FromResult(new UserDTO()));

        // Act
        Func<Task> act = async () => await sut.Handle(request, next, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<ValidationException>();
    }

    [Theory, AutoData]
    public async Task Should_Pass_When_Validation_Passes(CreateUserCommand request)
    {
        // Arrange
        var validator = new CreateUserCommandValidator();
        var validators = new List<IValidator<CreateUserCommand>> { validator };
        var sut = new ValidationBehaviour<CreateUserCommand, UserDTO>(validators);
        var next = new RequestHandlerDelegate<UserDTO>(() => Task.FromResult(new UserDTO()));

        // Act
        Func<Task> act = async () => await sut.Handle(request, next, CancellationToken.None);

        // Assert
        await act.Should().NotThrowAsync<ValidationException>();
    }
}