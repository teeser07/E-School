using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class DaysController : BaseController
    {
        private readonly IDaysService _days;

        public DaysController(IDaysService days)
        {
            _days = days;
        }

        [HttpPost("save-days")]
        public async Task<IActionResult> SaveDays([FromBody] Days days)
        {
            await this._days.SaveDays(days);
            return Ok();
        }


        [HttpDelete("delete-days")]
        public async Task<IActionResult> DeleteDays(int days_id)
        {
            await this._days.DeleteDays(days_id);
            return Ok();
        }

        [HttpGet("get-days")]
        public async Task<IActionResult> GetDays()
        {
            List<Days> days = await this._days.GetDays();
            return Ok(days);
        }

        [HttpPut("update-days")]
        public async Task<IActionResult> UpdateDays(int days_id, [FromBody]Days days)
        {
            await this._days.UpdateDays(days_id, days);
            return Ok();
        }

        [HttpGet("get-days-detail")]
        public async Task<IActionResult> GetDaysDetail(int days_id)
        {
            Days day = await this._days.GetDaysDetail(days_id);
            return Ok(day);
        }
    }
}
