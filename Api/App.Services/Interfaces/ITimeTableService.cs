using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface ITimeTableService
    {
        Task Save(TimeTable timetable);
        Task DeleteTimetable(int TimeTableId);
        Task<IEnumerable<dynamic>> GetTimetable(string keyword);
        Task UpdateTimetable(TimeTable timetable);
    }
}
