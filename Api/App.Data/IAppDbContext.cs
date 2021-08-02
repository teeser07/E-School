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
        DbSet<MapClassRoomTeacher> MapClassRoomTeacher { get; set; }
        DbSet<Subject> Subject { get; set; }
        DbSet<Period> Period { get; set; }
        DbSet<Holiday> Holiday { get; set; }
        DbSet<EmpProfile> EmpProfile { get; set; }
        DbSet<StudentProfile> StudentProfile { get; set; }
        DbSet<TimeTable> TimeTable { get; set; }
    }
}
