using Application.Interface.SPI;
using Application.Users;
using AutoFixture.Xunit2;
using Domain;
using FluentAssertions;
using Moq;

namespace CodeTest.TestProject.Application.Users;

public class UpdateUserCommandHandlerTest
{
    private readonly Mock<IUserRepository> _mockUserRepository;

    private readonly UpdateUserCommandHandler _sut;

    public UpdateUserCommandHandlerTest()
    {
        _mockUserRepository = new Mock<IUserRepository>();
        _sut = new UpdateUserCommandHandler(_mockUserRepository.Object);
    }

    [Theory, AutoData]
    public async Task Should_ReturnUser_When_Handle_Update(UpdateUserCommand command, UserDTO user)
    {
        // Arrange
        _mockUserRepository.Setup(x => x.UpdateAsync(It.IsAny<UserDTO>())).ReturnsAsync(user);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        _mockUserRepository.Verify(x => x.UpdateAsync(It.IsAny<UserDTO>()), Times.Once);

        result.Should().BeEquivalentTo(user);
    }

    [Theory, AutoData]
    public async Task Should_ThrowException_When_Handle_Update_Error(UpdateUserCommand command)
    {
        // Arrange
        _mockUserRepository.Setup(x => x.UpdateAsync(It.IsAny<UserDTO>())).ThrowsAsync(new Exception());

        // Act
        Func<Task> act = async () => await _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<Exception>();
    }

    [Theory, AutoData]
    public void Should_Return_True_When_Validate_Update(UpdateUserCommand command)
    {
        // Arrange
        var validator = new UpdateUserCommandValidator();

        // Act
        var result = validator.Validate(command);

        // Assert
        result.IsValid.Should().BeTrue();
    }

    [Theory, AutoData]
    public void Should_Return_False_When_Validate_Update_Error()
    {
        // Arrange
        var command = new UpdateUserCommand(new UserDTO()
        {
            FirstName = "Test",
            LastName = "",
        });
        var validator = new UpdateUserCommandValidator();

        // Act
        var result = validator.Validate(command);

        // Assert
        result.IsValid.Should().BeFalse();
    }
}