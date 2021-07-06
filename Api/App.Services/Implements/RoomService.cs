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

namespace App.Services.Implements
{
    public class RoomService : IRoomService
    {
        private readonly IAppDbContext _context;

        public RoomService(IAppDbContext context)
        {
            _context = context;
        }

        //Save-Room
        public async Task SaveRoom(Room room)
        {
            Room user = new Room();
            user.Clas = room.Clas;
            user.Classroom = room.Classroom;
            user.Maxstd = room.Maxstd;
            _context.Room.Add(user);
            await this._context.SaveChangesAsync();
            return;
        }

        //Delete-Room
        public async Task DeleteRoom(int room_id)
        {
            Room room = await _context.Room.Where(w => w.Room_id == room_id).FirstOrDefaultAsync();
            _context.Entry(room).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }

        //Get-Room
        public async Task<List<Room>> GetRoom()
        {
            List<Room> profile = await _context.Room.ToListAsync();
            return profile;
        }

        //Update-Subject
        public async Task UpdateRoom(int room_id, Room room)
        {
            var rooms = _context.Room.FirstOrDefault(c => c.Room_id.Equals(room_id));
            rooms.Clas = room.Clas;
            rooms.Classroom = room.Classroom;
            rooms.Maxstd = room.Maxstd;

            var isCodesubjectModified = _context.Entry(rooms).Property("Clas").IsModified;
            var isCreditModified = _context.Entry(rooms).Property("Classroom").IsModified;
            var isSubjecttitleModified = _context.Entry(rooms).Property("Maxstd").IsModified;

            await this._context.SaveChangesAsync();
        }

        //Get-Room-Detail
        public async Task<Room> GetRoomDetail(int room_id)
        {
            Room rooms = await _context.Room.Where(w => w.Room_id == room_id).FirstOrDefaultAsync();
            return rooms;
        }
    }
}
