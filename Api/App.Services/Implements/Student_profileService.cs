using App.Data;
using App.Data.DTOs;
using App.Data.Models;
using App.Services.Interfaces;
using App.Utility;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Implements
{
    public class Student_profileService : IStudent_profileService
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserAccessor _user;
        private readonly IAccountService _account;
        public Student_profileService(IAppDbContext context, ICurrentUserAccessor user, IAccountService account)
        {
            _context = context;
            _user = user;
            _account = account;
        }

        public async Task Save(SaveStudentProfileRequest request)
        {
            if (_context.StudentProfile.Any(a => a.Student_code == request.StudentCode))
                throw new ApiException(HttpStatusCode.BadRequest, "รหัสนักเรียนมีอยู่แล้ว");

            if (_context.StudentProfile.Any(a => a.Studentid == request.Studentid))
                throw new ApiException(HttpStatusCode.BadRequest, "รหัสประจำตัวนักเรียนนี้มีอยู่แล้ว");

            StudentProfile stdProfile = new StudentProfile();
            stdProfile.Student_code = request.StudentCode;
            stdProfile.First_name = request.FirstName;
            stdProfile.Last_name = request.LastName;
            stdProfile.Studentid = request.Studentid;
            stdProfile.Tel = request.Tel;
            stdProfile.Status = request.Status;
            _context.StudentProfile.Add(stdProfile);
            await this._context.SaveChangesAsync();
            await _account.CreateStuUser( request.StudentCode, request.Password, stdProfile.Student_profile_id);
            return;
        }

        public async Task<IEnumerable<dynamic>> GetStudentProfile(string keyword)
        { 
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"select     u.email,
			                            u.student_code ""studentCode"",
                                        sp.first_name ""firstName"",
                                        sp.last_name ""lastName"",
                                        sp.tel,
                                        sp.studentid,
                                        u.""role"",
                                        sp.status, 
                                        u.user_id ""userId"",
                                        sp.student_profile_id ""studentProfileId""
                            from        ""user"" u
                            inner join  student_profile sp
                            on          sp.student_profile_id = u.student_profile_id");

            if (!string.IsNullOrEmpty(keyword))
                sql.AppendLine("where       concat(u.email, u.student_code, sp.first_name, sp.last_name, sp.tel,sp.studentid) ilike '%' || @keyword || '%'");

            sql.AppendLine("order by u.student_code");
            var data = await _context.QueryAsync<dynamic>(sql.ToString(), new { keyword = keyword });
            return data;
        }


        public async Task Delete(int userId)
        {
            User user = await _context.User.Where(w => w.UserId == userId).FirstOrDefaultAsync();
            if (user == null) throw new ApiException(HttpStatusCode.BadRequest, "นักเรียนคนนี้ถูกลบไปแล้ว");
            _context.User.Remove(user);
            if (user.StudentProfileId != null)
            {
                StudentProfile stdProfile = await _context.StudentProfile.Where(w => w.Student_profile_id == user.StudentProfileId).FirstOrDefaultAsync();
                _context.StudentProfile.Remove(stdProfile);
            }
            await this._context.SaveChangesAsync();
        }


        public async Task Update(SaveStudentProfileRequest request)
        {
            StudentProfile stdProfile = await _context.StudentProfile.Where(w => w.Student_profile_id == request.StudentProfileId).FirstOrDefaultAsync();
            if (stdProfile == null) throw new ApiException(HttpStatusCode.BadRequest, "นักเรียนคนนี้ไม่มีข้อมูลหรือถูกลบไปแล้ว");
            stdProfile.First_name = request.FirstName;
            stdProfile.Last_name = request.LastName;
            stdProfile.Tel = request.Tel;
            stdProfile.Status = request.Status;
            _context.StudentProfile.Attach(stdProfile);
            _context.Entry(stdProfile).State = EntityState.Modified;
            await this._context.SaveChangesAsync();
            await _account.UpdateStdUser(request.UserId, request.Password);
            return;
        }

    }
}
