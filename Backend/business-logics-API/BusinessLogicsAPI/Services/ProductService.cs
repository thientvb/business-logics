using BusinessLogicsAPI.Data;
using BusinessLogicsAPI.Intefaces;
using BusinessLogicsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogicsAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetProductsAsync(string? searchText, int skip, int take)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(searchText))
            {
                query = query.Where(p => 
                    p.Name.Contains(searchText, StringComparison.OrdinalIgnoreCase) ||
                    p.Category.Contains(searchText, StringComparison.OrdinalIgnoreCase) ||
                    p.Description.Contains(searchText, StringComparison.OrdinalIgnoreCase)
                );
            }

            query = query.Skip(skip).Take(take);

            return await query.ToListAsync();
        }

        public async Task<Product?> GetProductByIdAsync(int productId)
        {
            return await _context.Products.FindAsync(productId);
        }

        public async Task AddProductAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(Product product)
        {
            var existingProduct = await _context.Products.FindAsync(product.Id);

            if (existingProduct == null)
            {
                throw new InvalidOperationException("Product not found.");
            }

            existingProduct.Name = product.Name;
            existingProduct.Category = product.Category;
            existingProduct.Description = product.Description;
            existingProduct.Brand = product.Brand;
            existingProduct.Author = product.Author;
            existingProduct.Price = product.Price;
            existingProduct.Quantity = product.Quantity;
            existingProduct.Discount = product.Discount;
            existingProduct.Rating = product.Rating;
            existingProduct.NumberOfReviews = product.NumberOfReviews;
            existingProduct.UpdatedDate = DateTime.Now;

            _context.Products.Update(existingProduct);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}
