using Expenses.API.Data;
using Expenses.API.Dtos;
using Expenses.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Expenses.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext appDbContext;

        public TransactionsController(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }        

        [HttpPost("Create")]
        public IActionResult CreateTransaction([FromBody]PostTransactionDto transaction)
        {
            var newTransaction = new Transaction()
            {
                Amount = transaction.Amount,
                Type = transaction.Type,
                Category = transaction.Category,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            appDbContext.Transactions.Add(newTransaction);
            appDbContext.SaveChanges();
            return Ok();
        }

        [HttpGet("All")]
        public IActionResult GetAll()
        {
            var allTransactions = appDbContext.Transactions.ToList();
            return Ok(allTransactions);
        }

        [HttpGet("Details/{id}")]
        public IActionResult Get(int id) { 
            var transaction = appDbContext.Transactions.SingleOrDefault(t => t.Id == id);
            if (transaction == null) { 
                return NotFound();
            }
            return Ok(transaction);

        }

        [HttpGet("Details")]
        public IActionResult GetNew(int id)
        {
            var transaction = appDbContext.Transactions.SingleOrDefault(t => t.Id == id);
            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);

        }
    }
}
