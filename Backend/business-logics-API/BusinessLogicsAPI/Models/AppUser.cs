using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicsAPI.Models
{
    public class AppUser : IdentityUser
    {
        [StringLength(200)]
        [MaxLength(200)]
        public string Name { get; set; } = null!;
        public string Address {  get; set; } = string.Empty;
    }
}
