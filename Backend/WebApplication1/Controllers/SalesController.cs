using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebApplication1.DataContext;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly SalesContext _context;

        public SalesController(SalesContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSales()
        {
          if (_context.Sales == null)
          {
              return NotFound();
          }
            return await _context.Sales.ToListAsync();
        }   

        [HttpPost]
        public async Task<ActionResult<Sales>> PostSales(Sales sales)
        {
            SqlConnection conn = new SqlConnection("Server=DESKTOP-GF8REUK\\SQLEXPRESS;Database=Cafe;Trusted_Connection=true;Encrypt=False");

            string command = $"declare @dishId int = {sales.Dish_id}, @typeId int = {sales.Type_id}, @date datetime = getdate() exec addSale @dishId, @typeId, @date";
            SqlCommand cmd = new SqlCommand(command, conn);
            cmd.CommandType = CommandType.Text;
            conn.Open();
            cmd.ExecuteScalar();
            conn.Close();
            return CreatedAtAction("GetSales", new { id = sales.Id }, sales);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSales(int id)
        {
            if (_context.Sales == null)
            {
                return NotFound();
            }
            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("GetTotalRevenue")]
        public string GetTotalRevenue()
        {
            SqlConnection conn = new SqlConnection("Server=DESKTOP-GF8REUK\\SQLEXPRESS;Database=Cafe;Trusted_Connection=true;Encrypt=False");

            string command = $"declare @a int exec @a = totalRevenue select @a";
            SqlCommand cmd = new SqlCommand(command, conn);
            cmd.CommandType = CommandType.Text;
            conn.Open();
            var result = cmd.ExecuteScalar().ToString();
            conn.Close();
            return result;
        }      
    }
}
