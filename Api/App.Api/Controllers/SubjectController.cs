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
        public async Task<IActionResult> DeleteSubject(int subject_id)
        {
            await this._subject.DeleteSubject(subject_id);
            return Ok();
        }

        [HttpGet("get-subject")]
        public async Task<IActionResult> GetSubject()
        {
            List<Subject> subject = await this._subject.GetSubject();
            return Ok(subject);
        }

        [HttpPut("update-subject")]
        public async Task<IActionResult> UpdateSubject(int subject_id, [FromBody]Subject subject)
        {
            await this._subject.UpdateSubject(subject_id, subject);
            return Ok();
        }


        [HttpGet("get-subject-detail")]
        public async Task<IActionResult> GetSubjectDetail(int subject_id)
        {
            Subject subject = await this._subject.GetSubjectDetail(subject_id);
            return Ok(subject);
        }

    }
}
