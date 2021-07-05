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

        public async Task SaveSubject(Subject subject)
        {
            Subject user = new Subject();
            user.Code_subject = subject.Code_subject;
            user.Credit = subject.Credit;
            user.Subject_title = subject.Subject_title;
            _context.Subject.Add(user);
            await this._context.SaveChangesAsync();
            return;
        }

        public async Task DeleteSubject(int subject_id)
        {
            Subject subject = await _context.Subject.Where(w => w.Subject_id == subject_id).FirstOrDefaultAsync();
            _context.Entry(subject).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }

        public async Task<List<Subject>> GetSubject()
        {
            List<Subject> profile = await _context.Subject.ToListAsync();
            return profile;
        }
    }
}
