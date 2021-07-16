using App.Data;
using App.Data.DTOs;
using App.Data.Models;
using App.Services.Interfaces;
using App.Utility;
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
            await _account.CreateStuUser( request.StudentCode, request.Password, request.Role, stdProfile.Student_profile_id);
            return;
        }



    }
}
