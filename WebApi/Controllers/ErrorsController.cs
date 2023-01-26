using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class ErrorsController : ApiController
    {
        [Route("/error")]
        [HttpGet]
        public async Task<IActionResult> Error()
        {
            await Task.CompletedTask;
            Exception exception = HttpContext.Features.Get<IExceptionHandlerFeature>()?.Error ?? new Exception("Unknown error");
            return Problem(statusCode: 400, title: exception.Message);
        }
    }
}