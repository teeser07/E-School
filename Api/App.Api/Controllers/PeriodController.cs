using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class PeriodController : BaseController
    {
        private readonly IPeriodService _period;

        public PeriodController(IPeriodService period)
        {
            _period = period;
        }

        [HttpPost("save-period")]
        public async Task<IActionResult> SavePeriod([FromBody] Period period)
        {
            await this._period.SavePeriod(period);
            return Ok();
        }


        [HttpDelete("delete-period")]
        public async Task<IActionResult> DeletePeriod([FromQuery] int periodId)
        {
            await this._period.DeletePeriod(periodId);
            return Ok();
        }


        [HttpGet("get-period")]
        public async Task<IActionResult> GetPeriod([FromQuery] string keyword)
        {
            return Ok(await _period.GetPeriod(keyword));
        }

        [HttpPut("update-period")]
        public async Task<IActionResult> UpdatePeriod([FromBody] Period period)
        {
            await this._period.UpdatePeriod(period);
            return Ok();
        }

    }
}
