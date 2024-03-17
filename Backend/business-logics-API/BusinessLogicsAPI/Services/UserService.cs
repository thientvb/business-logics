using BusinessLogicsAPI.Models;
using Microsoft.AspNetCore.Identity;
using BusinessLogicsAPI.DTOs;
using BusinessLogicsAPI.Intefaces;

namespace BusinessLogicsAPI.Repositories
{
    public class UserService(
        UserManager<AppUser> userManager
        ) : IUserService
    {
        public async Task<UserServiceResponses.UserInfomationResponse> GetUserInfomation(string? id)
        {
            if (id is null)
            {
                return new UserServiceResponses.UserInfomationResponse(null, "Invalid id user.");
            }

            var user = await userManager.FindByIdAsync(id);
            if (user is null)
            {
                return new UserServiceResponses.UserInfomationResponse(null, "User not found.");
            }
            UserInfomation userInfo = new()
            {
                Id = id,
                Address = user.Address,
                Email = user.Email!,
                Name = user.Name,
                PhoneNumber = user.PhoneNumber!
            };
            return new UserServiceResponses.UserInfomationResponse(userInfo, "");
        }
    }
}
