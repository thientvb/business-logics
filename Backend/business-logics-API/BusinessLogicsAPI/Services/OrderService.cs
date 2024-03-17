using BusinessLogicsAPI.Data;
using BusinessLogicsAPI.Exceptions;
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
                .Include(o => o.PurchaseOrderDetails)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .Skip(skip).Take(take)
                .ToListAsync();
        }

        public async Task<PurchaseOrder?> GetOrderByIdAsync(int orderId)
        {
            return await _context.PurchaseOrders
                .Include(o => o.PurchaseOrderDetails)
                .ThenInclude(d => d.Product)
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        public async Task CreateOrderAsync(PurchaseOrder order)
        {
            // Validate order product details
            foreach (var item in order.PurchaseOrderDetails)
            {
                var product = await _context.Products.FindAsync(item.ProductId);

                if (product == null)
                {
                    throw new NotFoundException($"Product with ID {item.ProductId} not found.");
                }

                if (item.Quantity > product.Quantity)
                {
                    throw new BusinessException($"Requested quantity for product '{product.Name}' exceeds available quantity.");
                }
            }

            _context.PurchaseOrders.Add(order);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrderAsync(PurchaseOrder order)
        {
            // Validate order product details
            foreach (var item in order.PurchaseOrderDetails)
            {
                var product = await _context.Products.FindAsync(item.ProductId);

                if (product == null)
                {
                    throw new NotFoundException($"Product with ID {item.ProductId} not found.");
                }

                if (item.Quantity > product.Quantity)
                {
                    throw new BusinessException($"Requested quantity for product '{product.Name}' exceeds available quantity.");
                }
            }
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
                throw new NotFoundException("Order not found.");
            }

            _context.PurchaseOrderDetails.RemoveRange(order.PurchaseOrderDetails);

            _context.PurchaseOrders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }
}
