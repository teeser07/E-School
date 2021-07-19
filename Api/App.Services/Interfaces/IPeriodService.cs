using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IPeriodService
    {
        Task<Period> GetPeriodDetail(int period_id);
        Task SavePeriod(Period period);
        Task DeletePeriod(int period_id);
        Task<List<Period>> GetPeriod();
        Task UpdatePeriod(int period_id, Period period);
    }
}