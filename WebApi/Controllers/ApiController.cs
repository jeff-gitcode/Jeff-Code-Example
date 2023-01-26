using Microsoft.AspNetCore.Mvc;

using WebApi.Filter;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ErrorHandlingFilter]
    public class ApiController : ControllerBase
    {
    }
}