using App.Data.Models;
using App.Data.DTOs;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class HomeworkDoneController : BaseController
    {
        private readonly IHomeworkDoneService _homeworkdone;

        public HomeworkDoneController(IHomeworkDoneService homeworkdone)
        {
            _homeworkdone = homeworkdone;
        }

        [HttpPost("save-homeworkdone")]
        public async Task<IActionResult> SaveHomeworkDone(SaveHomeworkDoneRequest request)
        {
            await _homeworkdone.SaveHomeworkDone(request);
            return Ok();
        }

        [HttpPost("save-homework")]
        public async Task<IActionResult> SaveHomeWork(HomeworkDone homeworkdone)
        {
            await _homeworkdone.SaveHomeWork(homeworkdone);
            return Ok();
        }

        [HttpGet("get-homework-done")]
        public async Task<IActionResult> GetHomeWork(int homeworkId, int studentId)
        {
            return Ok(await _homeworkdone.GetHomeWork(homeworkId, studentId));
        }




    }
}

