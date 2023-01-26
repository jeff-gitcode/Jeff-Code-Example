using Application.Interface.SPI;
using Application.Users;
using AutoFixture.Xunit2;
using Domain;
using FluentAssertions;
using Moq;

namespace CodeTest.TestProject.Application.Users;

public class GetUserByIdQueryHandlerTest
{
    private readonly Mock<IUserRepository> _mockUserRepository;

    private readonly GetUserByIdQueryHandler _sut;

    public GetUserByIdQueryHandlerTest()
    {
        _mockUserRepository = new Mock<IUserRepository>();
        _sut = new GetUserByIdQueryHandler(_mockUserRepository.Object);
    }

    [Theory, AutoData]
    public async Task Should_ReturnUser_When_Handle_GetUserById(GetUserByIdQuery query, UserDTO user)
    {
        // Arrange
        _mockUserRepository.Setup(x => x.GetByIdAsync(It.IsAny<string>())).ReturnsAsync(user);

        // Act
        var result = await _sut.Handle(query, CancellationToken.None);

        // Assert
        _mockUserRepository.Verify(x => x.GetByIdAsync(It.IsAny<string>()), Times.Once);

        result.Should().BeEquivalentTo(user);
    }

    [Theory, AutoData]
    public async Task Should_ThrowException_When_Handle_GetUserById(GetUserByIdQuery query)
    {
        // Arrange
        _mockUserRepository.Setup(x => x.GetByIdAsync(It.IsAny<string>())).ThrowsAsync(new Exception());

        // Act
        Func<Task> act = async () => await _sut.Handle(query, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<Exception>();
    }
}