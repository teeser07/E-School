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
        Task SavePeriod(Period period);
        Task DeletePeriod(int periodId);
        Task<IEnumerable<dynamic>> GetPeriod(string keyword);
        Task UpdatePeriod(Period period);
    }
}