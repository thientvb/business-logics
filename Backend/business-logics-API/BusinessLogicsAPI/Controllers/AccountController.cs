using Microsoft.AspNetCore.Mvc;
using BusinessLogicsAPI.DTOs;
using BusinessLogicsAPI.Intefaces;

namespace BusinessLogicsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(IAuthService _authService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO userDTO)
        {
            var response = await _authService.RegisterAccount(userDTO);
            if (response.Flag)
            {
                // Return a success response with data
                return Ok(response);
            }
            return BadRequest(response.Message);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO model)
        {
            var response = await _authService.Login(model);
            if (response.TokenViewModel.StatusCode == 200)
            {
                // Return a success response with data
                return Ok(response);
            }

            return BadRequest(response.TokenViewModel);
        }
    }
}
