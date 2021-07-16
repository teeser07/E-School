using App.Data;
using App.Data.DTOs;
using App.Data.Models;
using App.Services.Interfaces;
using App.Utility;
using App.Utility.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Implements
{
    public class AccountService : IAccountService
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserAccessor _user;
        private readonly AppSettings _appSettings;

        public AccountService(IAppDbContext context, ICurrentUserAccessor user, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _user = user;
            _appSettings = appSettings.Value;
        }

        public async Task<User> GetUser()
        {
            return await _context.User.FirstOrDefaultAsync(a => a.UserId == _user.UserId);
        }

        public async Task CreateEmpUser(string email, string empCode, string password, string role, int empProfileId)
        {
            if (_context.User.Any(a => a.EmpCode == empCode))
                throw new ApiException(HttpStatusCode.BadRequest, "รหัสพนักงานนี้มีอยู่แล้ว");
            if (_context.User.Any(a => a.Email == email))
                throw new ApiException(HttpStatusCode.BadRequest, "อีเมลนี้มีอยู่แล้ว");

            User user = new User();
            user.Email = email;
            user.EmpCode = empCode;
            user.SecurityStamp = Guid.NewGuid().ToString();
            user.PasswordHash = HashToMD5(password, user.SecurityStamp);
            user.Role = role;
            user.EmpProfileId = empProfileId;
            _context.User.Add(user);
            await this._context.SaveChangesAsync();
        }

        //public async Task Register(RegisterRequest request)
        //{
        //    if (_context.User.Any(a => a.Email == request.Email))
        //        throw new ApiException(HttpStatusCode.BadRequest, "Emal นี้มีผู้ใช้แล้ว");

        //    //if (_context.UserProfile.Any(a => a.UserName == request.UserName))
        //    //    throw new ApiException(HttpStatusCode.BadRequest, "Username นี้มีผู้ใช้แล้ว");

        //    User user = new User();
        //    user.Email = request.Email;
        //    user.SecurityStamp = Guid.NewGuid().ToString();
        //    user.PasswordHash = HashToMD5(request.Password, user.SecurityStamp);
        //    _context.User.Add(user);
        //    await this._context.SaveChangesAsync();
        //    return;
        //}

        private string HashToMD5(string input, string salt)
        {
            MD5 md5Hasher = MD5.Create();
            byte[] data = md5Hasher.ComputeHash(Encoding.Default.GetBytes(input + salt));
            StringBuilder sBuilder = new StringBuilder();

            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            return sBuilder.ToString();
        }

        private string HashToSHA256(string token)
        {
            SHA256 sha256 = SHA256.Create();
            byte[] hashValue = sha256.ComputeHash(Encoding.Default.GetBytes(token));
            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < hashValue.Length; i++)
            {
                sBuilder.Append(hashValue[i].ToString("x2"));
            }
            return sBuilder.ToString();
        }

        public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request)
        {
            User user = await _context.User.FirstOrDefaultAsync(x => x.Email == request.Email || x.EmpCode == request.Email || x.StudentCode == request.Email);

            if (user == null) return null;

            string hash = HashToMD5(request.Password, user.SecurityStamp);

            if (!user.PasswordHash.Equals(hash)) return null;

            DateTime expiresDate = DateTime.Now.AddMinutes(_appSettings.MinuteOfTokenExpires);
            string token = GenerateToken(user, expiresDate);
            string refreshToken = GenerateRefreshToken(ref user);

            _context.User.Attach(user);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return new AuthenticateResponse(
                user.UserId,
                user.Role,
                user.EmpCode,
                user.StudentCode,
                token,
                expiresDate,
                refreshToken);
        }

        private string GenerateToken(User user, DateTime expires)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = expires,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshToken(ref User userProfile)
        {
            byte[] randomBytes = new byte[256];
            var rngCrypto = new RNGCryptoServiceProvider();
            rngCrypto.GetBytes(randomBytes);
            string refreshToken = Convert.ToBase64String(randomBytes);
            string refreshTokenHash = HashToSHA256(refreshToken);
            DateTime createdDate = DateTime.Now;
            userProfile.RefreshTokenHash = refreshTokenHash;
            userProfile.RefreshTokenCreatedDate = createdDate;
            userProfile.RefreshTokenExpiresDate = createdDate.AddDays(_appSettings.DayOfRefreshTokenExpires);
            return refreshToken;
        }

        public async Task<AuthenticateResponse> RefreshToken(RefreshTokenRequest request)
        {
            if (request.RefreshToken == null) return null;
            string refreshTokenHash = HashToSHA256(request.RefreshToken);
            User user = await _context.User.FirstOrDefaultAsync(w => w.RefreshTokenHash == refreshTokenHash);

            // return null if no user found with token
            if (user == null) return null;

            // return null if token is no longer active
            if (user.RefreshTokenExpiresDate < DateTime.Now) return null;

            // generate new token
            DateTime expiresDate = DateTime.Now.AddMinutes(_appSettings.MinuteOfTokenExpires);
            string newToken = GenerateToken(user, expiresDate);

            // replace old refresh token with a new one and save
            string newRefreshToken = GenerateRefreshToken(ref user);
            _context.User.Attach(user);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return new AuthenticateResponse(
                user.UserId,
                user.Role,
                user.EmpCode,
                user.StudentCode,
                newToken, 
                expiresDate, 
                newRefreshToken);
        }
    }
}
