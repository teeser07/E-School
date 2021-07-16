using App.Data.DTOs;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class EmpProfileController : BaseController
    {
        private readonly IEmpProfileService _empProfile;

        public EmpProfileController(IEmpProfileService empProfile)
        {
            _empProfile = empProfile;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SaveEmpProfileRequest request)
        {
            await _empProfile.Save(request);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string keyword)
        {
            return Ok(await _empProfile.GetEmpProfile(keyword));
        }
    }
}
