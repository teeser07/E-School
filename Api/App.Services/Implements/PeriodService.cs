using App.Data;
using App.Data.Models;
using App.Services.Interfaces;
using App.Utility;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
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
        public async Task DeletePeriod(int periodId)
        {
            Period user = await _context.Period.Where(w => w.PeriodId == periodId).FirstOrDefaultAsync();
            if (user == null) throw new ApiException(HttpStatusCode.BadRequest, "คาบเรียนนี้ถูกลบไปแล้ว");
            _context.Period.Remove(user);
            if (user.PeriodId != null)
            {
                Period pr = await _context.Period.Where(w => w.PeriodId == user.PeriodId).FirstOrDefaultAsync();
                _context.Period.Remove(pr);
            }
            await this._context.SaveChangesAsync();
        }

        //Get-Period
        public async Task<IEnumerable<dynamic>> GetPeriod(string keyword)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"select    pr.period_id ""periodId"",
                                       pr.order ""order"",
                                       pr.start_time ""startTime"",
                                       pr.end_time ""endTime""
                            from       period pr");

            if (!string.IsNullOrEmpty(keyword))
                sql.AppendLine("where    concat(pr.order, pr.start_time,pr.end_time) ilike '%' || @keyword || '%'");

            sql.AppendLine("order by pr.order");
            var data = await _context.QueryAsync<dynamic>(sql.ToString(), new { keyword = keyword });
            return data;
        }

        //Update-Period
        public async Task UpdatePeriod(Period period)
        {
            Period pr = await _context.Period.Where(w => w.PeriodId == period.PeriodId).FirstOrDefaultAsync();
            if (pr == null) throw new ApiException(HttpStatusCode.BadRequest, "คาบเรียนนี้ไม่มีข้อมูลหรือถูกลบไปแล้ว");
            pr.Order = period.Order;
            pr.StartTime = period.StartTime;
            pr.EndTime = period.EndTime;
            pr.PeriodId = period.PeriodId;
            _context.Period.Attach(pr);
            _context.Entry(pr).State = EntityState.Modified;
            await this._context.SaveChangesAsync();
            return;
        }

    }
}
