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
        readonly ICurrentUserAccessor _currentUser;

        public AppDbContext(DbContextOptions<AppDbContext> options, ICurrentUserAccessor currentUser) : base(options)
        {
            _currentUser = currentUser;
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
            foreach (var entry in ChangeTracker.Entries<BaseModel>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedDate = DateTime.Now;
                        //entry.Entity.CreatedBy = string.IsNullOrWhiteSpace(_currentUser.UserName) ? "Api" : _currentUser.UserName;
                        entry.Entity.CreatedBy = "Api";
                        entry.Entity.UpdatedDate = DateTime.Now;
                        //entry.Entity.UpdatedBy = string.IsNullOrWhiteSpace(_currentUser.UserName) ? "Api" : _currentUser.UserName;
                        entry.Entity.UpdatedBy = "Api";
                        break;
                    case EntityState.Modified:
                        entry.Entity.UpdatedDate = DateTime.Now;
                        //entry.Entity.UpdatedBy = string.IsNullOrWhiteSpace(_currentUser.UserName) ? "Api" : _currentUser.UserName;
                        entry.Entity.UpdatedBy = "Api";
                        break;
                }
            }
        }
        public DbSet<ProfileDemo> ProfileDemo { get; set; }
        public DbSet<EducationalHistoryDemo> EducationalHistoryDemo { get; set; }
        public DbSet<Profile> Profile { get; set; }
    }
}
