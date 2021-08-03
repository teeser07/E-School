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

        [HttpPost("save-tb")]
        public async Task<IActionResult> Post([FromBody] TimeTable timetable)
        {
            await _timetable.Save(timetable);
            return Ok();
        }

        [HttpGet("get-tb")]
        public async Task<IActionResult> GetTimetable([FromQuery] string keyword)
        {
            return Ok(await _timetable.GetTimetable(keyword));
        }

        [HttpDelete("delete-tb")]
        public async Task<IActionResult> DeleteTimetable([FromQuery] int TimeTableId)
        {
            await _timetable.DeleteTimetable(TimeTableId);
            return Ok();
        }

        [HttpPut("update-tb")]
        public async Task<IActionResult> UpdateTimetable([FromBody] TimeTable timetable)
        {
            await this._timetable.UpdateTimetable(timetable);
            return Ok();
        }


    }
}
