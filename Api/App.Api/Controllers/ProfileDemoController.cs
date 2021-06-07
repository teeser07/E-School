using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class ProfileDemoController : BaseController
    {
        private readonly IProfileDemoService _profileDemo;

        public ProfileDemoController(IProfileDemoService profileDemo)
        {
            _profileDemo = profileDemo;
        }

        [HttpPost("save-profile")]
        public async Task<IActionResult> SaveProfile(ProfileDemo profile)
        {
            await this._profileDemo.SaveProfile(profile);
            return Ok();
        }

        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateProfile(ProfileDemo profile)
        {
            await this._profileDemo.UpdateProfile(profile);
            return Ok();
        }

        [HttpGet("get-profile")]
        public async Task<IActionResult> GetProfile(int profileId)
        {
            ProfileDemo profile = await this._profileDemo.GetProfile(profileId);
            return Ok(profile);
        }

        [HttpGet("get-educational-history")]
        public async Task<IActionResult> GetEducationalHistory(int profileId)
        {
            List<EducationalHistoryDemo> eduHisList = await this._profileDemo.GetEducationalHistory(profileId);
            return Ok(eduHisList);
        }

        [HttpDelete("delete-profile")]
        public async Task<IActionResult> DeleteProfile(int profileId)
        {
            await this._profileDemo.DeleteProfile(profileId);
            return Ok();
        }

        [HttpDelete("delete-educational-history")]
        public async Task<IActionResult> DeleteEducationalHistory(int EducationalHistorId)
        {
            await this._profileDemo.DeleteEducationalHistory(EducationalHistorId);
            return Ok();
        }
    }
}
