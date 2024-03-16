namespace BusinessLogicsAPI.Models
{
    public class PurchaseOrder : BaseEntity
    {
        public string UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public AppUser User { get; set; }
        public ICollection<PurchaseOrderDetail> PurchaseOrderDetails { get; set; }
    }
}
