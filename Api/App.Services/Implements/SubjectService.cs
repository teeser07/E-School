using App.Data;
using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Implements
{
    public class SubjectService : ISubjectService
    {
        private readonly IAppDbContext _context;

        public SubjectService(IAppDbContext context)
        {
            _context = context;
        }

        //Save-Subject
        public async Task SaveSubject(Subject subject)
        {
            Subject user = new Subject();
            user.Codesubject = subject.Codesubject;
            user.Credit = subject.Credit;
            user.Subjecttitle = subject.Subjecttitle;
            _context.Subject.Add(user);
            await this._context.SaveChangesAsync();
            return;
        }

        //Delete-Subject
        public async Task DeleteSubject(int subjectid)
        {
            Subject subject = await _context.Subject.Where(w => w.Subject_id == subjectid).FirstOrDefaultAsync();
            _context.Entry(subject).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }

        //Get-Subject-All
        public async Task<List<Subject>> GetSubject()
        {
            List<Subject> profile = await _context.Subject.ToListAsync();
            return profile;
        }

        //Update-Subject
        public async Task UpdateSubject(int subjectid, Subject subject)
        {
            var subjects = _context.Subject.FirstOrDefault(c => c.Subject_id.Equals(subjectid));
            subjects.Codesubject = subject.Codesubject;
            subjects.Credit = subject.Credit;
            subjects.Subjecttitle = subject.Subjecttitle;

            var isCodesubjectModified = _context.Entry(subjects).Property("Codesubject").IsModified;
            var isCreditModified = _context.Entry(subjects).Property("Credit").IsModified;
            var isSubjecttitleModified = _context.Entry(subjects).Property("Subjecttitle").IsModified;

            await this._context.SaveChangesAsync();
        }

        //Get-subject-Detail
        public async Task<Subject> GetSubjectDetail(int subject_id)
        {
            Subject subject = await _context.Subject.Where(w => w.Subject_id == subject_id).FirstOrDefaultAsync();
            return subject;
        }
    }
}
