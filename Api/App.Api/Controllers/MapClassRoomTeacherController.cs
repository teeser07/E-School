using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class MapClassRoomTeacherController : BaseController
    {
        private readonly IMapClassRoomTeacherService _MapClassRoomTeacher;

        public MapClassRoomTeacherController(IMapClassRoomTeacherService mapClassRoomTeacher)
        {
            _MapClassRoomTeacher = mapClassRoomTeacher;
        }

        [HttpPost("save-mcrt")]
        public async Task<IActionResult> Post([FromBody] MapClassRoomTeacher mapclassroomteacher)
        {
            await _MapClassRoomTeacher.Save(mapclassroomteacher);
            return Ok();
        }

        [HttpGet("get-mcrt")]
        public async Task<IActionResult> Get([FromQuery] string keyword)
        {
            return Ok(await _MapClassRoomTeacher.GetMapClassRoomTeacher(keyword));
        }

        [HttpDelete("delete-mcrt")]
        public async Task<IActionResult> Delete([FromQuery] int mapclassroomteacherid)
        {
            await _MapClassRoomTeacher.Delete(mapclassroomteacherid);
            return Ok();
        }

        [HttpPut("update-mcrt")]
        public async Task<IActionResult> Put([FromBody] MapClassRoomTeacher mapclassroomteacher)
        {
            await _MapClassRoomTeacher.Update(mapclassroomteacher);
            return Ok();
        }


    }
}
