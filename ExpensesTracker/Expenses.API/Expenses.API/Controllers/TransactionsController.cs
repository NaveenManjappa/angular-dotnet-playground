using Expenses.API.Data;
using Expenses.API.Data.Services;
using Expenses.API.Dtos;
using Expenses.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace Expenses.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    [Authorize]
    public class TransactionsController(ITransactionsService transactionService) : ControllerBase
    {
              

        [HttpPost("Create")]
        public IActionResult CreateTransaction([FromBody]PostTransactionDto payload)
        {
            var nameIdentifierClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(nameIdentifierClaim))            
                return BadRequest("Could not get the user id");            

            if (!int.TryParse(nameIdentifierClaim, out int userId))
                return BadRequest("Invalid user id");            

            var newTransaction=transactionService.Add(payload,userId);
            return newTransaction == null ? NotFound() : Ok(newTransaction);
            
        }

        [HttpGet("All")]
        public IActionResult GetAll()
        {
            var nameIdentifierClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(nameIdentifierClaim))
                return BadRequest("Could not get the user id");

            if (!int.TryParse(nameIdentifierClaim, out int userId))
                return BadRequest("Invalid user id");
            var allTransactions = transactionService.GetAll(userId);
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

        [HttpPut("Update/{id}")]
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
