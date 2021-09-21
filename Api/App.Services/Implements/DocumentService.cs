using App.Data;
using App.Data.DTOs;
using App.Data.Models;
using App.Services.Interfaces;
using App.Utility;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Data.Common;

namespace App.Services.Implements
{
    public class DocumentService : IDocumentService
    {
        private readonly IAppDbContext _context;

        public DocumentService(IAppDbContext context)
        {
            _context = context;
        }

        //Save-Document
        public async Task SaveDocument(Document document)
        {
            this._context.Document.Add(document);
            await this._context.SaveChangesAsync();
        }


        //Get-Document
        public async Task<DocumentRespone> GetDocument(int SubjectId)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"
            select		               d.id ""id"",
                                       d.title ""Title"",
                                       d.file ""File""
                           from document d
                           where       1=1");
            if (SubjectId == null || SubjectId == 0)
                sql.AppendLine(@"and subject_id is null");
            else
                sql.AppendLine(@"and subject_id = @id");

            sql.AppendLine(@"order by  d.title");
            var documentList = await _context.QueryAsync<dynamic>(sql.ToString(), new { id = SubjectId });
            return new DocumentRespone() { DocumentList = documentList };
        }


        //Delete-Document
        public async Task DeleteDocument(int Id)
        {
            var user = from ed in _context.Document
                         where ed.Id == Id
                         select new
                         {
                             Id = ed.Id
                         };
            if (user != null && user.Count() > 0)
            {
                Document D = await _context.Document.Where(w => w.Id == Id).FirstOrDefaultAsync();
                _context.Document.Remove(D);
            }
            
            await this._context.SaveChangesAsync();
        }

    }
}

