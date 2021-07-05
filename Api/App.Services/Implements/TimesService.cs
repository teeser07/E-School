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
    public class TimesService : ITimesService
    {
        private readonly IAppDbContext _context;

        public TimesService(IAppDbContext context)
        {
            _context = context;
        }

        //Save-Times
        public async Task SaveTimes(Times times)
        {
            Times user = new Times();
            user.Orders = times.Orders;
            user.Duration = times.Duration;
            user.Longterm = times.Longterm;
            _context.Times.Add(user);
            await this._context.SaveChangesAsync();
            return;
        }

        //Delete-Times
        public async Task DeleteTimes(int times_id)
        {
            Times times = await _context.Times.Where(w => w.Times_id == times_id).FirstOrDefaultAsync();
            _context.Entry(times).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }

        //Get-Times-All
        public async Task<List<Times>> GetTimes()
        {
            List<Times> times = await _context.Times.ToListAsync();
            return times;
        }

        //Update-Times
        public async Task UpdateTimes(int times_id, Times times)
        {
            var time = _context.Times.FirstOrDefault(c => c.Times_id.Equals(times_id));
            time.Orders = times.Orders;
            time.Duration = times.Duration;
            time.Longterm = times.Longterm;

            var isOrdersModified = _context.Entry(time).Property("Orders").IsModified;
            var isDurationModified = _context.Entry(time).Property("Duration").IsModified;
            var isLongtermModified = _context.Entry(time).Property("Longterm").IsModified;

            await this._context.SaveChangesAsync();
        }
    }
}
