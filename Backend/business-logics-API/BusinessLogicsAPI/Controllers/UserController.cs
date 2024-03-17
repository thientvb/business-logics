using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using BusinessLogicsAPI.Intefaces;

namespace BusinessLogicsAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService _userService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetCurrentUser()
        {
            ClaimsPrincipal currentUser = User;
            string id = currentUser.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
            var res = await _userService.GetUserInfomation(id);
            if (res.User == null)
            {
                return BadRequest(res.Message);
            }

            return Ok(res.User);
        }
    }
}
