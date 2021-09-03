using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class HomeworkDetailController : BaseController
    {
        private readonly IHomeworkDetailService _homeworkdetail;

        public HomeworkDetailController(IHomeworkDetailService homeworkdetail)
        {
            _homeworkdetail = homeworkdetail;
        }

        [HttpPost("save-homework-detail")]
        public async Task<IActionResult> SaveHomeworkDetail([FromBody] HomeworkDetail homeworkDetail)
        {
            await this._homeworkdetail.SaveHomeworkDetail(homeworkDetail);
            return Ok();
        }

        [HttpGet("get-hw-detail")]
        public async Task<IActionResult> GetHomeworkDetail(int HomeworkId)
        {
            return Ok(await _homeworkdetail.GetHomeworkDetail(HomeworkId));
        }

        [HttpPut("update-hw-detail")]
        public async Task<IActionResult> UpdateHomeworkDetail([FromBody] HomeworkDetail homeworkDetail)
        {
            await this._homeworkdetail.UpdateHomeworkDetail(homeworkDetail);
            return Ok();
        }

        [HttpDelete("delete-hw-detail")]
        public async Task<IActionResult> DeleteHomeworkDetail([FromQuery] int HomeWorkDetailId)
        {
            await _homeworkdetail.DeleteHomeworkDetail(HomeWorkDetailId);
            return Ok();
        }

    }
}
