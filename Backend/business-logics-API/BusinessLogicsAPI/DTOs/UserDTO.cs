using System.ComponentModel.DataAnnotations;

namespace BusinessLogicsAPI.DTOs
{
    public class UserDTO
    {
        public string? Id { get; set; }
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = null!;
        public string Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;
        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; } = null!;
    }
}
