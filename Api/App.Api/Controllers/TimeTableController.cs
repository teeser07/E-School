using App.Data.DTOs;
using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class TimeTableController : BaseController
    {
        private readonly ITimeTableService _timetable;

        public TimeTableController(ITimeTableService timetable)
        {
            _timetable = timetable;
        }

        [HttpGet("timetable")]
        public async Task<IActionResult> GetTimetables(int? mapClassRoomTeacherId)
        {
            return Ok(await _timetable.GetTimetables(mapClassRoomTeacherId));
        }

        [HttpDelete("timetable")]
        public async Task<IActionResult> DeleteTimetable(int timeTableId)
        {
            await _timetable.DeleteTimetable(timeTableId);
            return Ok();
        }

        [HttpPost("save-timetable")]
        public async Task<IActionResult> SaveTimetable(TimeTable timeTable)
        {
            await _timetable.SaveTimetable(timeTable);
            return Ok();
        }

        [HttpPut("update-timetable")]
        public async Task<IActionResult> UpdateTimetable(TimeTable timeTable)
        {
            await this._timetable.UpdateTimetable(timeTable);
            return Ok();
        }

        [HttpGet("timetabledetail")]
        public async Task<IActionResult> GetTimetableDetail(string DayValue, int mapClassRoomTeacherId)
        {
            return Ok(await _timetable.GetTimetableDetail(DayValue, mapClassRoomTeacherId));
        }

        [HttpGet("timetableteacher")]
        public async Task<IActionResult> GetTimetableTeacher(string DayValue, int? SubjectId)
        {
            return Ok(await _timetable.GetTimetableTeacher(DayValue, SubjectId));
        }

    }
}
