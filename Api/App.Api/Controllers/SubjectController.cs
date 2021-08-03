using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class SubjectController : BaseController
    {
        private readonly ISubjectService _subject;

        public SubjectController(ISubjectService subject)
        {
            _subject = subject;
        }

        [HttpPost("save-subject")]
        public async Task<IActionResult> SaveSubject([FromBody] Subject subject)
        {
            await this._subject.SaveSubject(subject);
            return Ok();
        }


        [HttpDelete("delete-subject")]
        public async Task<IActionResult> DeleteSubject([FromQuery] int subjectId)
        {
            await _subject.DeleteSubject(subjectId);
            return Ok();
        }

        [HttpGet("get-subject")]
        public async Task<IActionResult> GetSubject([FromQuery] string keyword)
        {
            return Ok(await _subject.GetSubject(keyword));
        }

        [HttpPut("update-subject")]
        public async Task<IActionResult> UpdateSubject([FromBody] Subject subject)
        {
            await this._subject.UpdateSubject(subject);
            return Ok();
        }

        [HttpGet("get-emp")]
        public async Task<IActionResult> GetEmp([FromQuery] string key)
        {
            return Ok(await _subject.GetEmpProfile(key));
        }


    }
}
