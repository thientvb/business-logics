using static BusinessLogicsAPI.DTOs.UserServiceResponses;

namespace BusinessLogicsAPI.Intefaces
{
    public interface IUserService
    {
        Task<UserInfomationResponse> GetUserInfomation(string? id);
    }
}
