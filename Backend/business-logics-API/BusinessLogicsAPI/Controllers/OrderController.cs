using BusinessLogicsAPI.Intefaces;
using BusinessLogicsAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BusinessLogicsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController(IOrderService _orderService) : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetOrders(int skip = 0, int take = 10)
        {
            // Get the user's ID
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            var orders = await _orderService.GetOrdersAsync(userId, skip, take);
            return Ok(orders);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateOrder([FromBody] PurchaseOrder order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _orderService.CreateOrderAsync(order);
            return Created();
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] PurchaseOrder order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _orderService.UpdateOrderAsync(order);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            await _orderService.DeleteOrderAsync(id);
            return NoContent();
        }
    }
}
