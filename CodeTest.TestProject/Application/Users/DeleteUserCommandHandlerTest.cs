using Application.Interface.SPI;
using Application.Users;
using AutoFixture.Xunit2;
using Domain;
using FluentAssertions;
using MediatR;
using Moq;

namespace CodeTest.TestProject.Application.Users;

public class DeleteUserCommandHandlerTest
{
    private readonly Mock<IUserRepository> _mockUserRepository;

    private readonly DeleteUserCommandHandler _sut;

    public DeleteUserCommandHandlerTest()
    {
        _mockUserRepository = new Mock<IUserRepository>();
        _sut = new DeleteUserCommandHandler(_mockUserRepository.Object);
    }

    [Theory, AutoData]
    public async Task Should_Return_When_Handle_Delete(DeleteUserCommand command, UserDTO user)
    {
        // Arrange
        _mockUserRepository.Setup(x => x.DeleteAsync(It.IsAny<string>()));

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        _mockUserRepository.Verify(x => x.DeleteAsync(It.IsAny<string>()), Times.Once);
    }

    [Theory, AutoData]
    public async Task Should_ThrowException_When_Handle_Error(DeleteUserCommand command)
    {
        // Arrange
        _mockUserRepository.Setup(x => x.DeleteAsync(It.IsAny<string>())).ThrowsAsync(new Exception());

        // Act
        Func<Task> act = async () => await _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<Exception>();
    }
}