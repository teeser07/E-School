using App.Data.DTOs;
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

        Task Save(SaveStudentProfileRequest request);
        Task<IEnumerable<dynamic>> GetStudentProfile(string keyword);
        Task Delete(int userId);
        Task Update(SaveStudentProfileRequest request);
        Task<StudentProfile> GetProfile(string Student_code);

    }
}