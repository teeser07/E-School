using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class HomeworkController : BaseController
    {
        private readonly IHomeworkService _homework;

        public HomeworkController(IHomeworkService homework)
        {
            _homework = homework;
        }

        [HttpPost("save-homework")]
        public async Task<IActionResult> SaveHomework([FromBody] Homework homework)
        {
            await this._homework.SaveHomework(homework);
            return Ok();
        }

        [HttpGet("get-hw-teacher")]
        public async Task<IActionResult> GetHomeworkforTeacher(int EmpProfileId,int MapClassRoomTeacherId)
        {
            return Ok(await _homework.GetHomeworkforTeacher(EmpProfileId, MapClassRoomTeacherId));
        }

        [HttpPut("update-hw")]
        public async Task<IActionResult> UpdateHomework([FromBody] Homework homework)
        {
            await this._homework.UpdateHomework(homework);
            return Ok();
        }

        [HttpDelete("delete-hw")]
        public async Task<IActionResult> DeleteHomework([FromQuery] int HomeWorkId)
        {
            await _homework.DeleteHomework(HomeWorkId);
            return Ok();
        }

        [HttpGet("get-hw-title")]
        public async Task<IActionResult> GetHomework(int HomeWorkId)
        {
            Homework homework = await this._homework.GetHomework(HomeWorkId);
            return Ok(homework);
        }


    }
}
