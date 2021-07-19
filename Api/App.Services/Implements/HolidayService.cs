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
    public class HolidayService : IHolidayService
    {
        private readonly IAppDbContext _context;

        public HolidayService(IAppDbContext context)
        {
            _context = context;
        }

        //Save-Holiday
        public async Task SaveHoliday(Holiday holiday)
        {
            this._context.Holiday.Add(holiday);
            await this._context.SaveChangesAsync();
        }

        //Delete-Holiday
        public async Task DeleteHoliday(int holiday_id)
        {
            Holiday holiday = await _context.Holiday.Where(w => w.Holiday_id == holiday_id).FirstOrDefaultAsync();
            _context.Entry(holiday).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }

        //Get-Holiday
        public async Task<List<Holiday>> GetHoliday()
        {
            List<Holiday> holiday = await _context.Holiday.ToListAsync();
            return holiday;
        }

        //Update-Holiday
        public async Task UpdateHoliday(int holiday_id, Holiday holiday)
        {
            var hd = _context.Holiday.FirstOrDefault(c => c.Holiday_id.Equals(holiday_id));
            hd.Date = holiday.Date;
            hd.Note = holiday.Note;

            var isDateModified = _context.Entry(hd).Property("Date").IsModified;
            var isNoteModified = _context.Entry(hd).Property("Note").IsModified;

            await this._context.SaveChangesAsync();
        }

        //Get-Holiday-Detail
        public async Task<Holiday> GetHolidayDetail(int holiday_id)
        {
            Holiday holiday = await _context.Holiday.Where(w => w.Holiday_id == holiday_id).FirstOrDefaultAsync();
            return holiday;
        }
    }
}
