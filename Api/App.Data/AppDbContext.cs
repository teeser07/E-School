using App.Data.Models;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace App.Data
{
    public partial class AppDbContext : DbContext, IAppDbContext
    {
        private IDbContextTransaction _currentTransaction;
        readonly ICurrentUserAccessor _user;
        public bool HasActiveTransaction => _currentTransaction != null;
        public DbSet<ProfileDemo> ProfileDemo { get; set; }
        public DbSet<EducationalHistoryDemo> EducationalHistoryDemo { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Room> Room { get; set; }
        public DbSet<Subject> Subject { get; set; }
        public DbSet<Period> Period { get; set; }
        public DbSet<Holiday> Holiday { get; set; }
        public DbSet<EmpProfile> EmpProfile { get; set; }
        public DbSet<StudentProfile> StudentProfile { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options, ICurrentUserAccessor user) : base(options)
        {
            _user = user;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            if (_currentTransaction != null) return null;
            _currentTransaction = await Database.BeginTransactionAsync(IsolationLevel.ReadCommitted).ConfigureAwait(false);
            return _currentTransaction;
        }

        public async Task CommitTransactionAsync(IDbContextTransaction transaction)
        {
            if (transaction == null) throw new ArgumentNullException(nameof(transaction));
            if (transaction != _currentTransaction) throw new InvalidOperationException($"Transaction {transaction.TransactionId} is not current");

            try
            {
                await base.SaveChangesAsync().ConfigureAwait(false);
                transaction.Commit();
            }
            catch
            {
                RollbackTransaction();
                throw;
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }

        public void RollbackTransaction()
        {
            try
            {
                _currentTransaction?.Rollback();
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }

        public Task<IEnumerable<T>> QueryAsync<T>(string sql, object param = null, CancellationToken token = default, bool isStore = false)
        {
            return this.Database.GetDbConnection().QueryAsync<T>(new CommandDefinition(sql, param, this._currentTransaction?.GetDbTransaction(), cancellationToken: token, commandType: isStore ? CommandType.StoredProcedure : CommandType.Text));
        }

        public async Task<int> SaveChangesAsync()
        {
            await SetAudit();
            return await base.SaveChangesAsync();
        }

        private async Task SetAudit()
       {
            string name = string.Empty;

            if (_user.EmpCode != null)
            {
                if (_user.Role == "S")
                {

                }
                else
                {
                    EmpProfile empProfile = await EmpProfile.Where(w => w.EmpCode == _user.EmpCode).FirstOrDefaultAsync();
                    name = empProfile.FirstName + " " + empProfile.LastName;
                }
            }

            foreach (var entry in ChangeTracker.Entries<BaseModel>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedDate = DateTime.Now;
                        entry.Entity.CreatedBy = string.IsNullOrEmpty(name) ? "Api" : name;
                        entry.Entity.UpdatedDate = DateTime.Now;
                        entry.Entity.UpdatedBy = string.IsNullOrEmpty(name) ? "Api" : name;
                        break;
                    case EntityState.Modified:
                        entry.Entity.UpdatedDate = DateTime.Now;
                        entry.Entity.UpdatedBy = string.IsNullOrEmpty(name) ? "Api" : name;
                        break;
                }
            }
        }
    }
}
