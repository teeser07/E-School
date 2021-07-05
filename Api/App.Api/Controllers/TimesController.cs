using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class TimesController : BaseController
    {
        private readonly ITimesService _times;

        public TimesController(ITimesService times)
        {
            _times = times;
        }

        [HttpPost("save-times")]
        public async Task<IActionResult> SaveTimes([FromBody] Times times)
        {
            await this._times.SaveTimes(times);
            return Ok();
        }


        [HttpDelete("delete-times")]
        public async Task<IActionResult> DeleteTimes(int times_id)
        {
            await this._times.DeleteTimes(times_id);
            return Ok();
        }

        [HttpGet("get-times")]
        public async Task<IActionResult> GetTimes()
        {
            List<Times> times = await this._times.GetTimes();
            return Ok(times);
        }

    }
}
