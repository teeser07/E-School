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

        public async Task DeleteTimes(int times_id)
        {
            Times times = await _context.Times.Where(w => w.Times_id == times_id).FirstOrDefaultAsync();
            _context.Entry(times).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }

        public async Task<List<Times>> GetTimes()
        {
            List<Times> times = await _context.Times.ToListAsync();
            return times;
        }
    }
}
