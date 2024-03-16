using BusinessLogicsAPI.Models;

namespace BusinessLogicsAPI.Intefaces
{
    public interface IOrderService
    {
        Task<List<PurchaseOrder>> GetOrdersAsync(string userId, int skip, int take);
        Task<PurchaseOrder?> GetOrderByIdAsync(int orderId);
        Task CreateOrderAsync(PurchaseOrder order);
        Task UpdateOrderAsync(PurchaseOrder order);
        Task DeleteOrderAsync(int orderId);
    }
}
