using App.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Data;
using System.Threading.Tasks;

namespace App.Data
{
    public partial class AppDbContext : DbContext, IAppDbContext
    {
        private IDbContextTransaction _currentTransaction;

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            if (_currentTransaction != null) return null;

            _currentTransaction = await Database.BeginTransactionAsync(IsolationLevel.ReadCommitted);

            return _currentTransaction;
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync(IsolationLevel level)
        {
            if (_currentTransaction != null) return null;

            _currentTransaction = await Database.BeginTransactionAsync(level);

            return _currentTransaction;
        }

        public async Task<int> SaveChangesAsync()
        {
            this.SetAudit();
            return await base.SaveChangesAsync();
        }

        private void SetAudit()
        {
            
        }

        public DbSet<ProfileDemo> ProfileDemo { get; set; }
        public DbSet<EducationalHistoryDemo> EducationalHistoryDemo { get; set; }
    }
}
