using App.Data;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Extensions
{
    public class TransactionHandilingMiddleware
    {
        private readonly RequestDelegate _next;

        public TransactionHandilingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IAppDbContext _context)
        {
            if (context.Request.Path.Value.Contains("api"))
            {
                using (var transaction = await _context.BeginTransactionAsync())
                {
                    try
                    {
                        await _next(context);
                        await _context.CommitTransactionAsync(transaction);
                    }
                    catch
                    {
                        _context.RollbackTransaction();
                        throw;
                    }
                }
            }
            else
            {
                await _next(context);
            }
        }
    }
}
