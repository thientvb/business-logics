using BusinessLogicsAPI.Intefaces;
using BusinessLogicsAPI.Repositories;
using BusinessLogicsAPI.Services;

namespace BusinessLogicsAPI.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IProductService, ProductService>();
        }
    }
}
