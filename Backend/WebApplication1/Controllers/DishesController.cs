using System;
using System.Collections.Generic;
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
    [Route("api/[controller]")]
    [ApiController]
    public class DishesController : ControllerBase
    {
        private readonly DishesContext _context;

        public DishesController(DishesContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dish>>> GetDish()
        {
          if (_context.Dish == null)
          {
              return NotFound();
          }
            return await _context.Dish.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Dish>> GetDish(int id)
        {
          if (_context.Dish == null)
          {
              return NotFound();
          }
            var dish = await _context.Dish.FindAsync(id);

            if (dish == null)
            {
                return NotFound();
            }

            return dish;
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDish(int id, [FromBody] Dish dish)
        {
            if (id != dish.Id)
            {
                return BadRequest();
            }

            _context.Entry(dish).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DishExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Dish>> PostDish([FromBody] Dish dish)
        {
            if (_context.Dish == null)
            {
                return Problem("Entity set 'DishesContext.Dish' is null.");
            }
            _context.Dish.Add(dish);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDish", new { id = dish.Id }, dish);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDish(int id)
        {
            if (_context.Dish == null)
            {
                return NotFound();
            }
            var dish = await _context.Dish.FindAsync(id);
            if (dish == null)
            {
                return NotFound();
            }

            _context.Dish.Remove(dish);
            await _context.SaveChangesAsync();

            return NoContent();
        }  

        [HttpGet("GetTypeByTypeId")]
        public ActionResult<string> GetTypeByTypeId(int type_id)
        {
            SqlConnection conn = new SqlConnection("Server=DESKTOP-GF8REUK\\SQLEXPRESS;Database=Cafe;Trusted_Connection=true;Encrypt=False");

            string command = $"select top 1 t.name from type t inner join dish d on t.id = d.type_id where d.type_id = {type_id}";
            SqlCommand cmd = new SqlCommand(command, conn);
            cmd.CommandType = System.Data.CommandType.Text;
            conn.Open();
            var result = cmd.ExecuteScalar().ToString();
            conn.Close();
            return Ok(new { result });
        }

        [HttpGet("GetDishIngredient")]
        public ActionResult<string[]> GetDishIngredient(int dish_id)
        {
            using (SqlConnection conn = new SqlConnection("Server=DESKTOP-GF8REUK\\SQLEXPRESS;Database=Cafe;Trusted_Connection=true;Encrypt=False"))
            {
                string command = $"select i.name from ingredient i join recipe r on i.id = r.ingredient_id join dish d on r.dish_id = d.id where d.id = {dish_id}";
                SqlCommand cmd = new SqlCommand(command, conn);
                cmd.CommandType = System.Data.CommandType.Text;
                conn.Open();
                List<string> ingredients = new List<string>();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        string ingredient = reader.GetString(0);
                        ingredients.Add(ingredient);
                    }
                }
                return Ok(ingredients.ToArray());
            }
        }

        private bool DishExists(int id)
        {
            return (_context.Dish?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
