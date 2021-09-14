using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class OnlineClassroomController : BaseController
    {
        private readonly IOnlineClassroomService _onlineClassroom;

        public OnlineClassroomController(IOnlineClassroomService onlineClassroom)
        {
            _onlineClassroom = onlineClassroom;
        }

        [HttpPost("save-homework")]
        public async Task<IActionResult> SaveOnlineClassroom([FromBody] OnlineClassroom onlineclassroom)
        {
            await this._onlineClassroom.SaveOnlineClassroom(onlineclassroom);
            return Ok();
        }

        [HttpGet("get-link")]
        public async Task<IActionResult> GetLink(int MapClassRoomTeacherId)
        {
            return Ok(await _onlineClassroom.GetLink(MapClassRoomTeacherId));
        }

        [HttpPut("update-link")]
        public async Task<IActionResult> UpdateLink([FromBody] OnlineClassroom onlineclassroom)
        {
            await this._onlineClassroom.UpdateLink(onlineclassroom);
            return Ok();
        }

        [HttpDelete("delete-link")]
        public async Task<IActionResult> DeleteLink([FromQuery] int OnlineClassroomId)
        {
            await _onlineClassroom.DeleteLink(OnlineClassroomId);
            return Ok();
        }

    }
}
