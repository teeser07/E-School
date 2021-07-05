using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class RoomController : BaseController
    {
        private readonly IRoomService _room;

        public RoomController(IRoomService room)
        {
            _room = room;
        }

        [HttpPost("save-room")]
        public async Task<IActionResult> SaveRoom([FromBody] Room room)
        {
            await this._room.SaveRoom(room);
            return Ok();
        }


        [HttpDelete("delete-room")]
        public async Task<IActionResult> DeleteRoom(int room_id)
        {
            await this._room.DeleteRoom(room_id);
            return Ok();
        }

        [HttpGet("get-room")]
        public async Task<IActionResult> GetRoom()
        {
            List<Room> room = await this._room.GetRoom();
            return Ok(room);
        }
    }
}
