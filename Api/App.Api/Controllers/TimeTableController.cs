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


    }
}
