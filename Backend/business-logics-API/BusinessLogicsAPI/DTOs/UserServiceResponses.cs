namespace BusinessLogicsAPI.DTOs
{
    public class UserServiceResponses
    {
        public record class GeneralResponse(bool Flag, List<string> Message);
        public record class LoginResponse(TokenViewModel TokenViewModel, UserInfomation? User);
        public record class UserInfomationResponse(UserInfomation? User, string Message);
    }
}
