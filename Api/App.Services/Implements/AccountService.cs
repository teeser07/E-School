using App.Data;
using App.Data.Models;
using App.Services.Interfaces;
using App.Utility;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Implements
{
    public class AccountService : IAccountService
    {
        private readonly IAppDbContext _context;

        public AccountService(IAppDbContext context)
        {
            _context = context;
        }

        public async Task ChangePassword(ChangePasswordRequest request)
        {
            throw new NotImplementedException();
        }

        public async Task<Profile> Signin(SigninRequest request)
        {
            Profile profile = await _context.Profile.Where(a => a.Email == request.Email).FirstOrDefaultAsync();

            if (profile == null)
                throw new ApiException(HttpStatusCode.BadRequest, "ไม่พบ Email นี้ในระบบ");

            if (profile.PasswordHash != HashToMD5(request.Password))
                throw new ApiException(HttpStatusCode.BadRequest, "รหัสผ่านไม่ถูกต้อง");

            return profile;
        }

        public async Task Signup(SignupRequest request)
        {
            if (_context.Profile.Any(a => a.Email == request.Email))
                throw new ApiException(HttpStatusCode.BadRequest, "Emal นี้มีผู้ใช้แล้ว");

            if (_context.Profile.Any(a => a.UserName == request.UserName))
                throw new ApiException(HttpStatusCode.BadRequest, "Username นี้มีผู้ใช้แล้ว");

            Profile profile = new Profile();
            profile.Email = request.Email;
            profile.PasswordHash = HashToMD5(request.Password);
            profile.FirstName = request.FirstName;
            profile.LastName = request.LastName;
            profile.UserName = request.UserName;
            this._context.Profile.Add(profile);
            await this._context.SaveChangesAsync();
        }

        private string HashToMD5(string input)
        {
            MD5 md5Hasher = MD5.Create();
            byte[] data = md5Hasher.ComputeHash(Encoding.Default.GetBytes(input));
            StringBuilder sBuilder = new StringBuilder();

            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            return sBuilder.ToString();
        }
    }
}
