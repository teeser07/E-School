using App.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data
{
    public interface IAppDbContext
    {
        Task<IDbContextTransaction> BeginTransactionAsync();
        Task<IDbContextTransaction> BeginTransactionAsync(IsolationLevel level);
        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
        Task<int> SaveChangesAsync();
        DbSet<ProfileDemo> ProfileDemo { get; set; }
        DbSet<EducationalHistoryDemo> EducationalHistoryDemo { get; set; }
        DbSet<UserProfile> UserProfile { get; set; }
    }
}
