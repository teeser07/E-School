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
using App.Utility;
using System.Net;

namespace App.Services.Implements
{
    public class Student_profileService : IStudent_profileService
    {
        private readonly IAppDbContext _context;

        public Student_profileService(IAppDbContext context)
        {
            _context = context;
        }

   
        //Get-Student-All
        public async Task<List<Student_profile>> GetStudent()
        {
            List<Student_profile> times = await _context.Student_profile.ToListAsync();
            return times;
        }

        //Get-Student-Detail
        public async Task<Student_profile> GetStudentDetail(int student_profile_id)
        {
            Student_profile student = await _context.Student_profile.Where(w => w.Student_profile_id == student_profile_id).FirstOrDefaultAsync();
            return student;
        }


        //Save-Student
        public async Task SaveStudent(Student_profile Student)
        {
            if (_context.Student_profile.Any(a => a.Student_code == Student.Student_code))
                throw new ApiException(HttpStatusCode.BadRequest, "รหัสนักเรียนนี้มีผู้ใช้แล้ว");

            if (_context.Student_profile.Any(a => a.Studentid == Student.Studentid))
                throw new ApiException(HttpStatusCode.BadRequest, "รหัสประจำตัวนักเรียนซ้ำกัน");

            this._context.Student_profile.Add(Student);
            await this._context.SaveChangesAsync();
        }

        //Delete-Student
        public async Task DeleteStudent(int student_profile_id)
        {
            Student_profile student = await _context.Student_profile.Where(w => w.Student_profile_id == student_profile_id).FirstOrDefaultAsync();
            _context.Entry(student).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }

        //Update-Student
        public async Task UpdateStudent(int student_profile_id, Student_profile Student)
        {
            var students = _context.Student_profile.FirstOrDefault(c => c.Student_profile_id.Equals(student_profile_id));
            students.Student_code = Student.Student_code;
            students.First_name = Student.First_name;
            students.Last_name = Student.Last_name;
            students.Studentid = Student.Studentid;
            students.Tel = Student.Tel;
            students.Status = Student.Status;

            var isStudent_codeModified = _context.Entry(students).Property("Student_code").IsModified;
            var isFirst_nameModified = _context.Entry(students).Property("First_name").IsModified;
            var isLast_nameModified = _context.Entry(students).Property("Last_name").IsModified;
            var isStudentidModified = _context.Entry(students).Property("Studentid").IsModified;
            var isTelModified = _context.Entry(students).Property("Tel").IsModified;
            var isStatusModified = _context.Entry(students).Property("Status").IsModified;

            if (_context.Student_profile.Any(a => a.Student_code == Student.Student_code))
                throw new ApiException(HttpStatusCode.BadRequest, "รหัสนักเรียนนี้มีผู้ใช้แล้ว");

            if (_context.Student_profile.Any(a => a.Studentid == Student.Studentid))
                throw new ApiException(HttpStatusCode.BadRequest, "รหัสประจำตัวนักเรียนซ้ำกัน");

            await this._context.SaveChangesAsync();
        }


    }
}
