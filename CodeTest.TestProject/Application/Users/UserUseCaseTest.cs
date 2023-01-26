using Application.Interface.API;
using Application.Users;
using AutoFixture.Xunit2;
using Domain;
using FluentAssertions;
using MediatR;
using Moq;

namespace CodeTest.TestProject.Application.Users
{
    public class UserUseCaseTest
    {
        private readonly IUserUseCase _userUseCase;
        private readonly Mock<IMediator> _mediator;

        public UserUseCaseTest()
        {
            _mediator = new Mock<IMediator>();
            _userUseCase = new UserUseCase(_mediator.Object);
        }

        [Theory, AutoData]
        public void Should_Return_When_GetAllUsers(List<UserDTO> users)
        {
            _mediator.Setup(x => x.Send(It.IsAny<GetAllUsersQuery>(), It.IsAny<CancellationToken>())).ReturnsAsync(users);

            var result = _userUseCase.GetAllUsers();

            result.Result.Should().BeEquivalentTo(users);
        }

        [Theory, AutoData]
        public void Should_Return_When_GetUserById(string id, UserDTO user)
        {
            _mediator.Setup(x => x.Send(It.IsAny<GetUserByIdQuery>(), It.IsAny<CancellationToken>())).ReturnsAsync(user);

            var result = _userUseCase.GetUserById(id);

            result.Result.Should().Be(user);
        }

        [Theory, AutoData]
        public void Should_Return_When_CreateUser(UserDTO user)
        {
            _mediator.Setup(x => x.Send(It.IsAny<CreateUserCommand>(), It.IsAny<CancellationToken>())).ReturnsAsync(user);

            var result = _userUseCase.CreateUser(user);

            result.Result.Should().Be(user);
        }

        [Theory, AutoData]
        public void Should_Return_When_UpdateUser(UserDTO user)
        {
            _mediator.Setup(x => x.Send(It.IsAny<UpdateUserCommand>(), It.IsAny<CancellationToken>())).ReturnsAsync(user);

            var result = _userUseCase.UpdateUser(user);

            result.Result.Should().Be(user);
        }

        [Theory, AutoData]
        public void Should_Return_When_DeleteUser(string id)
        {
            _mediator.Setup(x => x.Send(It.IsAny<DeleteUserCommand>(), It.IsAny<CancellationToken>())).ReturnsAsync(Unit.Value);

            var result = _userUseCase.DeleteUser(id);

            result.Result.Should().Be(Unit.Value);
        }

        // [Theory, AutoData]
        // public void Should_Return_When_GetUserByUsername(string username, UserDTO user)
        // {
        //     _mediator.Setup(x => x.Send(It.IsAny<GetUserByUsernameQuery>(), It.IsAny<CancellationToken>())).ReturnsAsync(user);

        //     var result = _userUseCase.GetUserByUsername(username);

        //     result.Result.Should().Be(user);
        // }

    }
}
