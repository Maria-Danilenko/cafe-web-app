using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.DataContext;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProvidersController : ControllerBase
    {
        private readonly ProvidersContext _context;

        public ProvidersController(ProvidersContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Provider>>> GetProvider()
        {
          if (_context.Provider == null)
          {
              return NotFound();
          }
            return await _context.Provider.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Provider>> GetProvider(int id)
        {
          if (_context.Provider == null)
          {
              return NotFound();
          }
            var provider = await _context.Provider.FindAsync(id);

            if (provider == null)
            {
                return NotFound();
            }

            return provider;
        }
            
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProvider(int id, Provider provider)
        {
            if (id != provider.Id)
            {
                return BadRequest();
            }

            var existingProvider = await _context.Provider.FindAsync(id);
            if (existingProvider == null)
            {
                return NotFound();
            }

            existingProvider.Name = provider.Name;
            existingProvider.Company_name = provider.Company_name;
            existingProvider.Ingredients_count = provider.Ingredients_count;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProviderExists(id))
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

        [HttpPost]
        public async Task<ActionResult<Provider>> PostProvider(Provider provider)
        {
          if (_context.Provider == null)
          {
              return Problem("Entity set 'ProvidersContext.Provider'  is null.");
          }
            _context.Provider.Add(provider);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProvider", new { id = provider.Id }, provider);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProvider(int id)
        {
            if (_context.Provider == null)
            {
                return NotFound();
            }
            var provider = await _context.Provider.FindAsync(id);
            if (provider == null)
            {
                return NotFound();
            }

            _context.Provider.Remove(provider);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProviderExists(int id)
        {
            return (_context.Provider?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
