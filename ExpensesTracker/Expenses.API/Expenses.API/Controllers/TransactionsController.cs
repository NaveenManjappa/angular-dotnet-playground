using Expenses.API.Data;
using Expenses.API.Data.Services;
using Expenses.API.Dtos;
using Expenses.API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Expenses.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class TransactionsController(ITransactionsService transactionService) : ControllerBase
    {
              

        [HttpPost("Create")]
        public IActionResult CreateTransaction([FromBody]PostTransactionDto transaction)
        {
           var newTransaction=transactionService.Add(transaction);
            return newTransaction == null ? NotFound() : Ok(newTransaction);
            
        }

        [HttpGet("All")]
        public IActionResult GetAll()
        {
            var allTransactions = transactionService.GetAll();
            return Ok(allTransactions);
        }

        [HttpGet("Details/{id}")]
        public IActionResult Get(int id) { 
            var transaction =transactionService.GetById(id);
            if (transaction == null) 
                return NotFound();
            
            return Ok(transaction);

        }

        [HttpGet("Details")]
        public IActionResult GetNew(int id)
        {
            var transaction = transactionService.GetById(id);
            return transaction == null ? NotFound() : Ok(transaction);

        }

        [HttpPut("{id}")]
        public IActionResult UpdateTransaction(int id,[FromBody]PutTransactionDto transaction)
        {
            var transactionDb = transactionService.Update(id,transaction);
            return transactionDb == null ? NotFound() : Ok(transactionDb);

        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteTransaction(int id)
        { 
            var transactionDb= transactionService.Delete(id);
            return transactionDb == null ? NotFound() : Ok(transactionDb);
        }
    }
}
