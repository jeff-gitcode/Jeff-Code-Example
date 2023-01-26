using AutoFixture;
using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;
using Domain;
using FluentAssertions;
using Infrastructure.DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using WebAPI.Infrastructure.DB;

namespace CodeTest.TestProject.Infrastruture.DB;

public class UserRepositoryTest
{
    private readonly Mock<IDbContext> _dbContextMock;
    private readonly Mock<ILogger<UserRepository>> _iloggerMock;
    protected IFixture Fixture;
    private UserRepository _sut;

    public UserRepositoryTest()
    {
        _dbContextMock = new Mock<IDbContext>();
        _iloggerMock = new Mock<ILogger<UserRepository>>();
        
        Fixture = new Fixture().Customize(new AutoMoqCustomization());

    }

    [Theory, AutoData]
    public async Task Should_Return_When_GetAllUsers(List<UserDTO> users)
    {

        // Arrange
        var usersSet = Fixture.Create<Mock<DbSet<UserDTO>>>();
        {
            var user = Fixture.Create<UserDTO>();

            usersSet.Setup(x => x.AsQueryable()).Returns(users.AsQueryable());

            usersSet.Setup(x => x.FindAsync(
                It.IsAny<object[]>(),
                It.IsAny<CancellationToken>())).ReturnsAsync(user);

            usersSet.As<IQueryable<UserDTO>>().Setup(m => m.Provider).Returns(users.AsQueryable().Provider);
            usersSet.As<IQueryable<UserDTO>>().Setup(m => m.Expression).Returns(users.AsQueryable().Expression);
            usersSet.As<IQueryable<UserDTO>>().Setup(m => m.ElementType).Returns(users.AsQueryable().ElementType);
            usersSet.As<IQueryable<UserDTO>>().Setup(m => m.GetEnumerator()).Returns(users.AsQueryable().GetEnumerator());

            usersSet.Setup(m => m.Find(It.IsAny<object[]>())).Returns<object[]>(ids => users.AsQueryable().FirstOrDefault(d => d.Id == (string)ids[0]));
        }

        // usersSet.Setup(r => r.AddRange(It.IsAny<IEnumerable<UserDTO>>())).Returns(users);

        var context = Fixture.Freeze<Mock<IDbContext>>();
        {
            context.Setup(x => x.Users).Returns(usersSet.Object);
        }


        _sut = new UserRepository(context.Object, _iloggerMock.Object);

        var result = await _sut.GetAllAsync();

        context.Verify(x => x.Users, Times.Once);

        result.Should().BeEquivalentTo(users);
    }

    [Theory, AutoData]
    public async Task Should_Return_When_GetUserById(UserDTO user)
    {
        // Arrange
        var usersSet = Fixture.Create<Mock<DbSet<UserDTO>>>();
        {
            usersSet.Setup(x => x.FindAsync(
                It.IsAny<object[]>(),
                It.IsAny<CancellationToken>())).ReturnsAsync(user);

            usersSet.As<IQueryable<UserDTO>>().Setup(m => m.Provider).Returns(new List<UserDTO> { user }.AsQueryable().Provider);
            usersSet.As<IQueryable<UserDTO>>().Setup(m => m.Expression).Returns(new List<UserDTO> { user }.AsQueryable().Expression);
            usersSet.As<IQueryable<UserDTO>>().Setup(m => m.ElementType).Returns(new List<UserDTO> { user }.AsQueryable().ElementType);
            usersSet.As<IQueryable<UserDTO>>().Setup(m => m.GetEnumerator()).Returns(new List<UserDTO> { user }.AsQueryable().GetEnumerator());

            usersSet.Setup(m => m.Find(It.IsAny<object[]>())).Returns<object[]>(ids => new List<UserDTO> { user }.AsQueryable().FirstOrDefault(d => d.Id == (string)ids[0]));
        }

        var context = Fixture.Freeze<Mock<IDbContext>>();
        {
            context.Setup(x => x.Users).Returns(usersSet.Object);
        }

        _sut = new UserRepository(context.Object, _iloggerMock.Object);

        var result = await _sut.GetByIdAsync(user.Id);

        context.Verify(x => x.Users, Times.Once);

        result.Should().BeEquivalentTo(user);
    }
}