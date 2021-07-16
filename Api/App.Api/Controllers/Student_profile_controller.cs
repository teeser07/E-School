using App.Data.Models;
using App.Services.Interfaces;
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

        

        [HttpGet("get-students")]
        public async Task<IActionResult> GetStudent()
        {
            List<Student_profile> student = await this._student.GetStudent();
            return Ok(student);
        }


        [HttpGet("get-student-detail")]
        public async Task<IActionResult> GetStudentDetail(int student_profile_id)
        {
            Student_profile subject = await this._student.GetStudentDetail(student_profile_id);
            return Ok(subject);
        }


        [HttpPost("save-student")]
        public async Task<IActionResult> SaveStudent( Student_profile Student)
        {
            await this._student.SaveStudent(Student);
            return Ok();
        }

        [HttpDelete("delete-student")]
        public async Task<IActionResult> DeleteStudent(int student_profile_id)
        {
            await this._student.DeleteStudent(student_profile_id);
            return Ok();
        }

        [HttpPut("update-student")]
        public async Task<IActionResult> UpdateStudent(int student_profile_id, [FromBody] Student_profile Student)
        {
            await this._student.UpdateStudent(student_profile_id, Student);
            return Ok();
        }
    }
}
