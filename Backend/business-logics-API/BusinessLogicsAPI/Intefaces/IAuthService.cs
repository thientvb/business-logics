using BusinessLogicsAPI.DTOs;
using static BusinessLogicsAPI.DTOs.UserServiceResponses;

namespace BusinessLogicsAPI.Intefaces
{
    public interface IAuthService
    {
        Task<GeneralResponse> RegisterAccount(UserDTO user);
        Task<LoginResponse> Login(LoginDTO login);
    }
}
