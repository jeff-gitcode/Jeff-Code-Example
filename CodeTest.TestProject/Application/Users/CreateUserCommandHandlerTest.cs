using Application.Interface.SPI;
using Application.Users;
using AutoFixture.Xunit2;
using Domain;
using FluentAssertions;
using Moq;

namespace CodeTest.TestProject.Application.Users;

public class CreateUserCommandHandlerTest
{
    private readonly Mock<IUserRepository> _mockUserRepository;

    private readonly CreateUserCommandHandler _sut;

    public CreateUserCommandHandlerTest()
    {
        _mockUserRepository = new Mock<IUserRepository>();
        _sut = new CreateUserCommandHandler(_mockUserRepository.Object);
    }

    [Theory, AutoData]
    public async Task Should_ReturnUser_When_Handle_Create(CreateUserCommand command, UserDTO user)
    {
        // Arrange
        _mockUserRepository.Setup(x => x.AddAsync(It.IsAny<UserDTO>())).ReturnsAsync(user);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        _mockUserRepository.Verify(x => x.AddAsync(It.IsAny<UserDTO>()), Times.Once);

        result.Should().BeEquivalentTo(user);
    }

    [Theory, AutoData]
    public async Task Should_ThrowException_When_Handle_Create_Error(CreateUserCommand command)
    {
        // Arrange
        _mockUserRepository.Setup(x => x.AddAsync(It.IsAny<UserDTO>())).ThrowsAsync(new Exception());

        // Act
        Func<Task> act = async () => await _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<Exception>();
    }

    [Theory, AutoData]
    public void Should_Return_When_Validate_Create(CreateUserCommand command)
    {
        // Arrange
        var validator = new CreateUserCommandValidator();

        // Act
        var result = validator.Validate(command);

        // Assert
        result.IsValid.Should().BeTrue();
    }

    [Theory, AutoData]
    public void Should_Return_When_Validate__Create_With_InvalidData()
    {
        // Arrange
        var command = new CreateUserCommand(new UserDTO()
        {
            FirstName = "Test",
            LastName = "",
        });

        var validator = new CreateUserCommandValidator();

        // Act
        var result = validator.Validate(command);

        // Assert
        result.IsValid.Should().BeFalse();
    }
}