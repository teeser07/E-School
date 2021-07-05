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

        public async Task DeleteRoom(int room_id)
        {
            Room room = await _context.Room.Where(w => w.Room_id == room_id).FirstOrDefaultAsync();
            _context.Entry(room).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }

        public async Task<List<Room>> GetRoom()
        {
            List<Room> profile = await _context.Room.ToListAsync();
            return profile;
        }
    }
}
