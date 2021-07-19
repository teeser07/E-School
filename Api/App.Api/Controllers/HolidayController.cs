using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class HolidayController : BaseController
    {
        private readonly IHolidayService _holiday;

        public HolidayController(IHolidayService holiday)
        {
            _holiday = holiday;
        }

        [HttpPost("save-holiday")]
        public async Task<IActionResult> SaveHoliday([FromBody] Holiday holiday)
        {
            await this._holiday.SaveHoliday(holiday);
            return Ok();
        }


        [HttpDelete("delete-holiday")]
        public async Task<IActionResult> DeleteHoliday(int holiday_id)
        {
            await this._holiday.DeleteHoliday(holiday_id);
            return Ok();
        }

        [HttpGet("get-holiday")]
        public async Task<IActionResult> GetHoliday()
        {
            List<Holiday> holiday = await this._holiday.GetHoliday();
            return Ok(holiday);
        }

        [HttpPut("update-holiday")]
        public async Task<IActionResult> UpdateHoliday(int holiday_id, [FromBody] Holiday holiday)
        {
            await this._holiday.UpdateHoliday(holiday_id, holiday);
            return Ok();
        }

        [HttpGet("get-holiday-detail")]
        public async Task<IActionResult> GetHolidayDetail(int holiday_id)
        {
            Holiday holiday = await this._holiday.GetHolidayDetail(holiday_id);
            return Ok(holiday);
        }
    }
}
