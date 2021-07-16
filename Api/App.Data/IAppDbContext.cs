using App.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Data
{
    public interface IAppDbContext
    {
        Task<IEnumerable<T>> QueryAsync<T>(string sql, object param = null, CancellationToken token = default, bool isStore = false);
        Task<IDbContextTransaction> BeginTransactionAsync();
        bool HasActiveTransaction { get; }
        Task CommitTransactionAsync(IDbContextTransaction transaction);
        void RollbackTransaction();
        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
        Task<int> SaveChangesAsync();
        DbSet<ProfileDemo> ProfileDemo { get; set; }
        DbSet<EducationalHistoryDemo> EducationalHistoryDemo { get; set; }
        DbSet<User> User { get; set; }
        DbSet<Room> Room { get; set; }
        DbSet<Subject> Subject { get; set; }
        DbSet<Times> Times { get; set; }
        DbSet<Days> Days { get; set; }
        DbSet<EmpProfile> EmpProfile { get; set; }
        DbSet<Student_profile> Student_profile { get; set; }
    }
}
