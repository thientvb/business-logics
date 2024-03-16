namespace BusinessLogicsAPI.DTOs
{
    public class TokenViewModel
    {
        public int StatusCode { get; set; } = 401;
        public string StatusMessage { get; set; } = string.Empty;
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
}
