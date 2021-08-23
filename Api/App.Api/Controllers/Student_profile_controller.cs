using App.Data.DTOs;
using App.Data.Models;
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

        [HttpGet("get-student-profile")]
        public async Task<IActionResult> Get([FromQuery] string keyword)
        {
            return Ok(await _student.GetStudentProfile(keyword));
        }


        [HttpDelete("delete-student")]
        public async Task<IActionResult> Delete([FromQuery] int userId)
        {
            await _student.Delete(userId);
            return Ok();
        }

        [HttpPut("update-student")]
        public async Task<IActionResult> Put([FromBody] SaveStudentProfileRequest request)
        {
            await _student.Update(request);
            return Ok();
        }

        [HttpGet("get-profile")]
        public async Task<IActionResult> GetProfile(string Student_code)
        {
            StudentProfile profile = await this._student.GetProfile(Student_code);
            return Ok(profile);
        }
    }
}
