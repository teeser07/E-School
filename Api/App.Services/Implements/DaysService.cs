using App.Data;
using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Implements
{
    public class DaysService : IDaysService
    {
        private readonly IAppDbContext _context;

        public DaysService(IAppDbContext context)
        {
            _context = context;
        }

        public async Task SaveDays(Days days)
        {
            Days user = new Days();
            user.Day = days.Day;
            user.Datetime = days.Datetime;
            user.Note = days.Note;
            user.Year = days.Year;
            user.Term = days.Term;
            _context.Days.Add(user);
            await this._context.SaveChangesAsync();
            return;
        }

        public async Task DeleteDays(int days_id)
        {
            Days days = await _context.Days.Where(w => w.Days_id == days_id).FirstOrDefaultAsync();
            _context.Entry(days).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }

        public async Task<List<Days>> GetDays()
        {
            List<Days> profile = await _context.Days.ToListAsync();
            return profile;
        }
    }
}
