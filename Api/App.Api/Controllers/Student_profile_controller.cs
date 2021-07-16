using App.Data.DTOs;
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
    public class Student_profile_controller : BaseController
    {
        private readonly IStudent_profileService _student;

        public Student_profile_controller(IStudent_profileService student)
        {
            _student = student;
        }

        [HttpPost("save-std")]
        public async Task<IActionResult> Post([FromBody] SaveStudentProfileRequest request)
        {
            await _student.Save(request);
            return Ok();
        }


    }
}
