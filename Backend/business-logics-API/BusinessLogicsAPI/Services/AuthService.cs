using BusinessLogicsAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using BusinessLogicsAPI.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BusinessLogicsAPI.Intefaces;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BusinessLogicsAPI.Repositories
{
    public class AuthService(
        UserManager<AppUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IConfiguration configuration
        ) : IAuthService
    {
        public async Task<UserServiceResponses.GeneralResponse> RegisterAccount(UserDTO userDTO)
        {
            if (userDTO is null)
            {
                return new UserServiceResponses.GeneralResponse(false, ["User model is null."]);
            }

            AppUser newUser = new()
            {
                Name = userDTO.Name,
                UserName = userDTO.Email,
                Email = userDTO.Email,
                Address = userDTO.Address,
                PhoneNumber = userDTO.PhoneNumber,
                PasswordHash = userDTO.Password
            };
            AppUser? user = await userManager.FindByEmailAsync(userDTO.Email);
            if (user is not null)
            {
                return new UserServiceResponses.GeneralResponse(false, ["User registered already."]);
            }

            var createUser = await userManager.CreateAsync(newUser, userDTO.Password);
            if (!createUser.Succeeded)
            {
                if (createUser.Errors.Any())
                {
                    List<string> listError = new();
                    foreach (var error in createUser.Errors)
                    {
                        listError.Add(error.Description);
                    }

                    return new UserServiceResponses.GeneralResponse(false, listError);
                }
                else
                {
                    return new UserServiceResponses.GeneralResponse(false, ["Please try again."]);
                }
            }

            await roleManager.CreateAsync(new IdentityRole() { Name = "User" });
            await userManager.AddToRoleAsync(newUser, "User");
            return new UserServiceResponses.GeneralResponse(true, ["Account created."]);
        }

        public async Task<UserServiceResponses.LoginResponse> Login(LoginDTO login)
        {
            if (login is null)
            {
                return new UserServiceResponses.LoginResponse(new() { StatusMessage = "User model is null!" }, null);
            }

            AppUser? getUser = await userManager.FindByEmailAsync(login.Email);
            if (getUser is null)
            {
                return new UserServiceResponses.LoginResponse(new() { StatusMessage = "User not found!"}, null);
            }

            bool checkUserPasswords = await userManager.CheckPasswordAsync(getUser, login.Password);
            if (!checkUserPasswords)
            {
                return new UserServiceResponses.LoginResponse(new() { StatusMessage = "Your email or password is incorrect!" }, null);
            }

            var getUserRole = await userManager.GetRolesAsync(getUser);
            var userSession = new UserSession(getUser.Id, getUser.Name, getUser.Email!, getUserRole.First());
            string accessToken = GenerateToken(userSession);
            string refreshToken = "";
            UserInfomation userInfo = new()
            {
                Address = getUser.Address,
                Email = getUser.Email!,
                Name = getUser.Name,
                PhoneNumber = getUser.PhoneNumber!
            };
            return new UserServiceResponses.LoginResponse(new() { AccessToken = accessToken, RefreshToken = refreshToken, StatusCode = 200, StatusMessage = "Login successful!" }, userInfo);
        }

        private string GenerateToken(UserSession userSession)
        {
            SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(configuration["JWT:Key"]!));
            SigningCredentials credentials = new(securityKey, SecurityAlgorithms.HmacSha256);
            Claim[] userClaims =
            [
                new Claim(ClaimTypes.NameIdentifier, userSession.Id),
                new Claim(ClaimTypes.Name, userSession.Name),
                new Claim(ClaimTypes.Email, userSession.Email),
                new Claim(ClaimTypes.Role, userSession.Role)
            ];

            JwtSecurityToken token = new(
                issuer: configuration["JWT:Issuer"],
                audience: configuration["JWT:Audience"],
                claims: userClaims,
                expires: DateTime.Now.AddDays(1), // Access token is valid for 1 day
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
