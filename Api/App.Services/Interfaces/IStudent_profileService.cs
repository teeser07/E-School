using App.Data.DTOs;
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
    
    }
}