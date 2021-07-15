using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IStudent_profileService
    {
        Task<List<Student_profile>> GetStudent();
        Task<Student_profile> GetStudentDetail(int student_profile_id);
        Task SaveStudent(Student_profile Student);
        Task DeleteStudent(int student_profile_id);
        Task UpdateStudent(int student_profile_id, Student_profile Student);
    }
}