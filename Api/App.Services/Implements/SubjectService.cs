using App.Data;
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
        public async Task DeleteSubject(int subjectId)
        {
            Subject user = await _context.Subject.Where(w => w.SubjectId == subjectId).FirstOrDefaultAsync();
            if (user == null) throw new ApiException(HttpStatusCode.BadRequest, "วิชานี้ถูกลบไปแล้ว");
            _context.Subject.Remove(user);
            if (user.SubjectId != null)
            {
                Subject Mcrt = await _context.Subject.Where(w => w.SubjectId == user.SubjectId).FirstOrDefaultAsync();
                _context.Subject.Remove(Mcrt);
            }
            await this._context.SaveChangesAsync();
        }

        //Get-Subject-All
        public async Task<IEnumerable<dynamic>> GetSubject(string keyword)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"select    sj.subject_id ""subjectId"",
                                       sj.subject_code ""subjectCode"",
                                       sj.subject_name ""subjectName"",
                                       emp.first_name ""firstName"",
                                       emp.last_name ""lastName""
                            from       subject sj
                            inner join  emp_profile emp
                            on          sj.subject_teacher_id = emp.emp_profile_id");
                            
            if (!string.IsNullOrEmpty(keyword))
                sql.AppendLine("where    concat(emp.first_name, emp.last_name,sj.subject_code,sj.subject_name) ilike '%' || @keyword || '%'");

            sql.AppendLine("order by sj.subject_code");
            var data = await _context.QueryAsync<dynamic>(sql.ToString(), new { keyword = keyword });
            return data;
        }

        //Update-Subject
        public async Task UpdateSubject(Subject subject)
        {
            Subject sj = await _context.Subject.Where(w => w.SubjectId == subject.SubjectId).FirstOrDefaultAsync();
            if (sj == null) throw new ApiException(HttpStatusCode.BadRequest, "วิชานี้ไม่มีข้อมูลหรือถูกลบไปแล้ว");
            sj.SubjectCode = subject.SubjectCode;
            sj.SubjectName = subject.SubjectName;
            sj.SubjectTeacherId = subject.SubjectTeacherId;
            _context.Subject.Attach(sj);
            _context.Entry(sj).State = EntityState.Modified;
            await this._context.SaveChangesAsync();
            return;
        }


        public async Task<IEnumerable<dynamic>> GetEmpProfile(string key)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"select     u.email,
			                            u.emp_code ""empCode"",
                                        ep.first_name ""firstName"",
                                        ep.last_name ""lastName"",
                                        ep.tel,
                                        u.""role"",
                                        ep.status, 
                                        u.user_id ""userId"",
                                        ep.emp_profile_id ""empProfileId""
                            from        ""user"" u
                            inner join  emp_profile ep
                            on          ep.emp_profile_id = u.emp_profile_id");

            if (!string.IsNullOrEmpty(key))
                sql.AppendLine("where  u.role='T' and (ep.status = 'a' or ep.status = 'V')");

            sql.AppendLine("order by u.emp_code");
            var data = await _context.QueryAsync<dynamic>(sql.ToString(), new { key = key });
            return data;
        }

        public async Task<Subject> GetSubjects(int SubjectTeacherId)
        {
            Subject ss = await _context.Subject.Where(w => w.SubjectTeacherId == SubjectTeacherId).FirstOrDefaultAsync();
            return ss;
        }

    }
}
