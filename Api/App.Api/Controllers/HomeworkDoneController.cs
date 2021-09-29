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
        public async Task<IActionResult> SaveHomeworkDone(HomeworkDone homeworkdone)
        {
            await _homeworkdone.SaveHomeworkDone(homeworkdone);
            return Ok();
        }

    }
}

