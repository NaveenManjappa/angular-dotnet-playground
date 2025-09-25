using Expenses.API.Dtos;
using Expenses.API.Models;
using Microsoft.OpenApi.Services;

namespace Expenses.API.Data.Services
{
    public interface ITransactionsService
    {
        List<Transaction> GetAll();
        Transaction? GetById(int id);
        Transaction Add(PostTransactionDto transaction);
        Transaction? Update(int id,PutTransactionDto transaction);
        Transaction? Delete(int id);

    }
    public class TransactionsService : ITransactionsService
    {
        private readonly AppDbContext appDbContext;

        public TransactionsService(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public Transaction Add(PostTransactionDto transaction)
        {
            var newTransaction = new Transaction()
            {
                Amount = transaction.Amount,
                Type = transaction.Type,
                Category = transaction.Category,
                CreatedAt = transaction.CreatedAt,
                UpdatedAt = DateTime.UtcNow
            };
            appDbContext.Transactions.Add(newTransaction);
            appDbContext.SaveChanges();
            return newTransaction;
        }

        public Transaction? Delete(int id)
        {
            var transactionDb = appDbContext.Transactions.FirstOrDefault(t => t.Id == id);
            if (transactionDb != null)
            {
                appDbContext.Transactions.Remove(transactionDb);
                appDbContext.SaveChanges();
            }
            return transactionDb;
           
        }

        public List<Transaction> GetAll()
        {
            return appDbContext.Transactions.ToList();
        }

        public Transaction? GetById(int id)
        {
            var transaction = appDbContext.Transactions.SingleOrDefault(t => t.Id == id);
            return transaction;
        }

        public Transaction? Update(int id, PutTransactionDto transaction)
        {
            var transactionDb = appDbContext.Transactions.FirstOrDefault(t => t.Id == id);
            if (transactionDb != null)
            {

                transactionDb.Type = transaction.Type;
                transactionDb.Amount = transaction.Amount;
                transactionDb.Category = transaction.Category;
                transactionDb.UpdatedAt = DateTime.UtcNow;

                appDbContext.Transactions.Update(transactionDb);
                appDbContext.SaveChanges();
            }
            return transactionDb;
        }
    }
}
