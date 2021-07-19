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
    public class PeriodService : IPeriodService
    {
        private readonly IAppDbContext _context;

        public PeriodService(IAppDbContext context)
        {
            _context = context;
        }

        //Save-Period
        public async Task SavePeriod(Period period)
        {
            this._context.Period.Add(period);
            await this._context.SaveChangesAsync();
        }

        //Delete-Period
        public async Task DeletePeriod(int period_id)
        {
            Period period = await _context.Period.Where(w => w.Period_id == period_id).FirstOrDefaultAsync();
            _context.Entry(period).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }

        //Get-Period-All
        public async Task<List<Period>> GetPeriod()
        {
            List<Period> period = await _context.Period.ToListAsync();
            return period;
        }

        //Update-Period
        public async Task UpdatePeriod(int period_id, Period period)
        {
            var periods = _context.Period.FirstOrDefault(c => c.Period_id.Equals(period_id));
            periods.Order = period.Order;
            periods.Start_time = period.Start_time;
            periods.End_time = period.End_time;

            var isOrderModified = _context.Entry(periods).Property("Order").IsModified;
            var isStart_timeModified = _context.Entry(periods).Property("Start_time").IsModified;
            var isEnd_timeModified = _context.Entry(periods).Property("End_time").IsModified;

            await this._context.SaveChangesAsync();
        }

        //Get-Period-Detail
        public async Task<Period> GetPeriodDetail(int period_id)
        {
            Period period = await _context.Period.Where(w => w.Period_id == period_id).FirstOrDefaultAsync();
            return period;
        }
    }
}
