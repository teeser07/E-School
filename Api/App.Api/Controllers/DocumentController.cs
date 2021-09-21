using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class DocumentController : BaseController
    {
        private readonly IDocumentService _document;

        public DocumentController(IDocumentService document)
        {
            _document = document;
        }

        [HttpPost("save-document")]
        public async Task<IActionResult> SaveDocument([FromBody] Document document)
        {
            await this._document.SaveDocument(document);
            return Ok();
        }

        [HttpGet("get-document")]
        public async Task<IActionResult> GetDocument([FromQuery] int SubjectId)
        {
            return Ok(await _document.GetDocument(SubjectId));
        }

        [HttpDelete("delete-document")]
        public async Task<IActionResult> DeleteDocument([FromQuery] int Id)
        {
            await _document.DeleteDocument(Id);
            return Ok();
        }

    }
}
