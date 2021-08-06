using App.Data.Models;
using App.Data.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface ITimeTableService
    {
        Task<GetTimetableResponse> GetTimetables(int? mapClassRoomTeacherId);
        Task DeleteTimetable(int timeTableId);
    }
}
