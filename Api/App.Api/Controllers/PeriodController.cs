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
        public async Task<IActionResult> DeletePeriod(int period_id)
        {
            await this._period.DeletePeriod(period_id);
            return Ok();
        }


        [HttpGet("get-period")]
        public async Task<IActionResult> GetPeriod()
        {
            List<Period> period = await this._period.GetPeriod();
            return Ok(period);
        }

        [HttpPut("update-period")]
        public async Task<IActionResult> UpdatePeriod(int period_id, [FromBody] Period period)
        {
            await this._period.UpdatePeriod(period_id, period);
            return Ok();
        }

        [HttpGet("get-period-detail")]
        public async Task<IActionResult> GetPeriodDetail(int period_id)
        {
            Period period = await this._period.GetPeriodDetail(period_id);
            return Ok(period);
        }
    }
}
