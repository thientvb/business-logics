using BusinessLogicsAPI.Models;

namespace BusinessLogicsAPI.Intefaces
{
    public interface IProductService
    {
        // Get all products
        Task<List<Product>> GetProductsAsync(string? searchText, int skip, int take);

        // Get a product by its ID
        Task<Product?> GetProductByIdAsync(int productId);

        // Add a new product
        Task AddProductAsync(Product product);

        // Update an existing product
        Task UpdateProductAsync(Product product);

        // Delete a product
        Task DeleteProductAsync(int productId);
    }
}
