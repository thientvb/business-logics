namespace BusinessLogicsAPI.Models
{
    public class PurchaseOrderDetail : BaseEntity
    {
        public int PurchaseOrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public Product Product { get; set; }
        public PurchaseOrder PurchaseOrder { get; set; }
    }
}
