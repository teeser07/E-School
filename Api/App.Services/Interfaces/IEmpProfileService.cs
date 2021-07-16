using App.Data.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IEmpProfileService
    {
        Task Save(SaveEmpProfileRequest request);
        Task<IEnumerable<dynamic>> GetEmpProfile(string keyword);
        Task Delete(int userId);
        Task Update(SaveEmpProfileRequest request);
    }
}
