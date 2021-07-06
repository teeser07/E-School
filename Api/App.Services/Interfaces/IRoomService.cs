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
        Task<Room> GetRoomDetail(int room_id);
        Task SaveRoom(Room room);
        Task DeleteRoom(int room_id);
        Task<List<Room>> GetRoom();
        Task UpdateRoom(int room_id, Room room);
    }
}