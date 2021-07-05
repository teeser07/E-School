using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IDaysService
    {
        Task SaveDays(Days days);
        Task DeleteDays(int days_id);
        Task<List<Days>> GetDays();
        Task UpdateDays(int days_id, Days days);
    }
}
