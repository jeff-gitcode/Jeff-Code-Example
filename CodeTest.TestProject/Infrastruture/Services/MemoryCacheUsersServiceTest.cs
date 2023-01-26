using AutoFixture.Xunit2;
using Domain;
using FluentAssertions;
using Infrastructure.Services;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;

namespace CodeTest.TestProject.Infrastructure.Services;

public class MemoryCacheUsersServiceTest
{
    private MemoryCacheUsersService _sut;

    private readonly IList<UserDTO> users = new List<UserDTO>(){
        new UserDTO { Id = "1", FirstName = "John", LastName = "Doe" },
    };

    public MemoryCacheUsersServiceTest()
    {
        var services = new ServiceCollection();
        services.AddMemoryCache();
        var serviceProvider = services.BuildServiceProvider();

        var memoryCache = serviceProvider.GetService<IMemoryCache>();
        _sut = new MemoryCacheUsersService(memoryCache);
    }

    [Theory, AutoData]
    public async Task Should_Return_When_GetAllUsers(UserDTO user)
    {
        // Arrange
        await _sut.Set("key", users);

        // Act
        var result = await _sut.Get("key");

        // Assert
        result.Should().BeEquivalentTo(users);
    }

    [Theory, AutoData]
    public async Task Should_Return_When_SetAllUsers(UserDTO user)
    {
        // Arrange

        // Act
        var result = await _sut.Set("key", users);

        // Assert
        result.Should().BeTrue();
    }
}
