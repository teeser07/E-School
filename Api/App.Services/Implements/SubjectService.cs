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
            this._context.Subject.Add(subject);
            await this._context.SaveChangesAsync();
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
            subjects.Subject_code = subject.Subject_code;
            subjects.Subject_name = subject.Subject_name;
            subjects.Subject_teacher = subject.Subject_teacher;

            var isSubject_codeModified = _context.Entry(subjects).Property("Subject_code").IsModified;
            var isSubject_nameModified = _context.Entry(subjects).Property("Subject_name").IsModified;
            var isSubject_teacherModified = _context.Entry(subjects).Property("Subject_teacher").IsModified;

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
