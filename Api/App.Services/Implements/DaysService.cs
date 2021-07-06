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

        //Save-Days
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

        //Delete-Days
        public async Task DeleteDays(int days_id)
        {
            Days days = await _context.Days.Where(w => w.Days_id == days_id).FirstOrDefaultAsync();
            _context.Entry(days).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }

        //Get-Days
        public async Task<List<Days>> GetDays()
        {
            List<Days> profile = await _context.Days.ToListAsync();
            return profile;
        }

        //Update-Days
        public async Task UpdateDays(int days_id, Days days)
        {
            var day = _context.Days.FirstOrDefault(c => c.Days_id.Equals(days_id));
            day.Day = days.Day;
            day.Datetime = days.Datetime;
            day.Note = days.Note;
            day.Year = days.Year;
            day.Term = days.Term;

            var isDayModified = _context.Entry(day).Property("Day").IsModified;
            var isDatetimeModified = _context.Entry(day).Property("Datetime").IsModified;
            var isNoteModified = _context.Entry(day).Property("Note").IsModified;
            var isYearModified = _context.Entry(day).Property("Year").IsModified;
            var isTermModified = _context.Entry(day).Property("Term").IsModified;

            await this._context.SaveChangesAsync();
        }

        //Get-Days-Detail
        public async Task<Days> GetDaysDetail(int days_id)
        {
            Days day = await _context.Days.Where(w => w.Days_id == days_id).FirstOrDefaultAsync();
            return day;
        }
    }
}
