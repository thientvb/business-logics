using BusinessLogicsAPI.Data;
using BusinessLogicsAPI.Intefaces;
using BusinessLogicsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogicsAPI.Services
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<PurchaseOrder>> GetOrdersAsync(string userId, int skip, int take)
        {
            return await _context.PurchaseOrders
                .Include(o => o.User)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .Skip(skip).Take(take)
                .ToListAsync();
        }

        public async Task<PurchaseOrder?> GetOrderByIdAsync(int orderId)
        {
            return await _context.PurchaseOrders
                .Include(o => o.User)
                .Include(o => o.PurchaseOrderDetails)
                .ThenInclude(d => d.Product)
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        public async Task CreateOrderAsync(PurchaseOrder order)
        {
            _context.PurchaseOrders.Add(order);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrderAsync(PurchaseOrder order)
        {
            _context.PurchaseOrders.Update(order);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrderAsync(int id)
        {
            var order = await _context.PurchaseOrders
                .Include(o => o.PurchaseOrderDetails)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                throw new Exception("Order not found.");
            }

            _context.PurchaseOrderDetails.RemoveRange(order.PurchaseOrderDetails);

            _context.PurchaseOrders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }
}
