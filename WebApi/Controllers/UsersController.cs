using Application.Interface.API;

using Ardalis.GuardClauses;

using Domain;

using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

public class UsersController : ApiController
{
    private readonly IUserUseCase _userUseCase;

    public UsersController(IUserUseCase userUseCase)
    {
        Guard.Against.Null(userUseCase, nameof(userUseCase));

        _userUseCase = userUseCase;
    }

    [ApiConventionMethod(typeof(DefaultApiConventions),
             nameof(DefaultApiConventions.Get))]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
    {
        try
        {
            var users = await _userUseCase.GetAllUsers();
            return Ok(users);
        }
        catch (System.Exception)
        {           
            throw;
        }
    }

    [HttpGet("{id}")]
    [ApiConventionMethod(typeof(DefaultApiConventions),
             nameof(DefaultApiConventions.Get))]
    public async Task<ActionResult<UserDTO>> GetUserById(string id)
    {
        try
        {
            var user = await _userUseCase.GetUserById(id);
            return Ok(user);
        }
        catch (System.Exception)
        {           
            throw;
        }
    }

    [HttpPost]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Create))]
    public async Task<ActionResult<UserDTO>> CreateUser(UserDTO tempUser)
    {
        try
        {
            var user = await _userUseCase.CreateUser(tempUser);
            return Ok(user);
        }
        catch (System.Exception)
        {           
            throw;
        }
    }

    [HttpPut]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Update))]
    public async Task<ActionResult<UserDTO>> UpdateUser(UserDTO tempUser)
    {
        try
        {
            var user = await _userUseCase.UpdateUser(tempUser);
            return Ok(user);
        }
        catch (System.Exception)
        {           
            throw;
        }
    }

    [HttpDelete("{id}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
    public async Task<ActionResult> DeleteUser(string id)
    {
        try
        {
            await _userUseCase.DeleteUser(id);
            return NoContent();               
        }
        catch (System.Exception)
        {            
            throw;
        }
    }
}