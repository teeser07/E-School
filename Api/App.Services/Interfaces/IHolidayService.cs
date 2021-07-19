using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IHolidayService
    {
        Task<Holiday> GetHolidayDetail(int holiday_id);
        Task SaveHoliday(Holiday holiday);
        Task DeleteHoliday(int holiday_id);
        Task<List<Holiday>> GetHoliday();
        Task UpdateHoliday(int holiday_id, Holiday holiday);
    }
}
