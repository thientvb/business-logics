namespace BusinessLogicsAPI.Models
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal Discount { get; set; }
        public double? Rating { get; set; }
        public int NumberOfReviews { get; set; }
    }
}
