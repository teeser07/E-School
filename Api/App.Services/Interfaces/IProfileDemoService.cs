using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IProfileDemoService
    {
        Task SaveProfile(ProfileDemo profile);
        Task UpdateProfile(ProfileDemo profile);
        Task<ProfileDemo> GetProfile(int profileId);
        Task<List<EducationalHistoryDemo>> GetEducationalHistory(int profileId);
        Task DeleteProfile(int profileId);
        Task DeleteEducationalHistory(int EducationalHistoryId);
    }
}
