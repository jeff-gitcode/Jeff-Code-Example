using Application.Interface.SPI;
using Application.Users;
using AutoFixture.Xunit2;
using Domain;
using FluentAssertions;
using Moq;

namespace CodeTest.TestProject.Application.Users;

public class GetAllUsersQueryHandlerTest
{
    private readonly Mock<IUserRepository> _mockUserRepository;

    private readonly GetAllUsersQueryHandler _sut;

    public GetAllUsersQueryHandlerTest()
    {
        _mockUserRepository = new Mock<IUserRepository>();
        _sut = new GetAllUsersQueryHandler(_mockUserRepository.Object);
    }

    [Theory, AutoData]
    public async Task Should_ReturnUsers_When_Handle_GetAllUsers(GetAllUsersQuery query, List<UserDTO> users)
    {
        // Arrange
        _mockUserRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(users);

        // Act
        var result = await _sut.Handle(query, CancellationToken.None);

        // Assert
        _mockUserRepository.Verify(x => x.GetAllAsync(), Times.Once);

        result.Should().BeEquivalentTo(users);
    }

    [Theory, AutoData]
    public async Task Should_ThrowException_When_Handle_GetAllUsers(GetAllUsersQuery query)
    {
        // Arrange
        _mockUserRepository.Setup(x => x.GetAllAsync()).ThrowsAsync(new Exception());

        // Act
        Func<Task> act = async () => await _sut.Handle(query, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<Exception>();
    }
}