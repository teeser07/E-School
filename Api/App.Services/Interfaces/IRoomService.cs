using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IRoomService
    {
        Task SaveRoom(Room room);
        Task DeleteRoom(int room_id);
        Task<List<Room>> GetRoom();
    }
}