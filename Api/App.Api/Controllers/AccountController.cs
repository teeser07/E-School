using App.Data.DTOs;
using App.Data.Models;
using App.Services.Interfaces;
using App.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IAccountService _account;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AccountController(IAccountService account, IHttpContextAccessor httpContextAccessor)
        {
            _account = account;
            _httpContextAccessor = httpContextAccessor;
        }

        //[AllowAnonymous]
        //[HttpPost("register")]
        //public async Task<IActionResult> Register(RegisterRequest request)
        //{
        //    await this._account.Register(request);
        //    return Ok();
        //}

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Signin([FromBody] AuthenticateRequest request)
        {
            AuthenticateResponse response = await _account.Authenticate(request);
            if (response == null) throw new ApiException(HttpStatusCode.BadRequest, "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var response = await _account.RefreshToken(request);
            if (response == null) throw new ApiException(HttpStatusCode.Unauthorized, "คุณไม่มีสิทธิ์เข้าถึงเนื้อหา");
            return Ok(response);
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUser()
        {
            return Ok(await _account.GetUser());
        }
    }
}
