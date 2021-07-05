using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface ITimesService
    {
        Task SaveTimes(Times times);
        Task DeleteTimes(int times_id);
        Task<List<Times>> GetTimes();
        Task UpdateTimes(int times_id, Times times);
    }
}