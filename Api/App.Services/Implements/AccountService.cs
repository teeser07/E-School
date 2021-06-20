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

        public async Task<UserProfile> GetUser()
        {
            return await _context.UserProfile.FirstOrDefaultAsync(a => a.UserProfileId == _user.UserProfileId);
        }

        public async Task Register(RegisterRequest request)
        {
            if (_context.UserProfile.Any(a => a.Email == request.Email))
                throw new ApiException(HttpStatusCode.BadRequest, "Emal นี้มีผู้ใช้แล้ว");

            if (_context.UserProfile.Any(a => a.UserName == request.UserName))
                throw new ApiException(HttpStatusCode.BadRequest, "Username นี้มีผู้ใช้แล้ว");

            UserProfile user = new UserProfile();
            user.Email = request.Email;
            user.SecurityStamp = Guid.NewGuid().ToString();
            user.PasswordHash = HashToMD5(request.Password, user.SecurityStamp);
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.UserName = request.UserName;
            _context.UserProfile.Add(user);
            await this._context.SaveChangesAsync();
            return;
        }

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

        public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request)
        {
            UserProfile userProfile = await _context.UserProfile.FirstOrDefaultAsync(x => x.UserName == request.Username || x.Email == request.Username);

            if (userProfile == null) return null;

            string hash = HashToMD5(request.Password, userProfile.SecurityStamp);

            if (!userProfile.PasswordHash.Equals(hash)) return null;

            DateTime expiresDate = DateTime.Now.AddMinutes(_appSettings.MinuteOfTokenExpires);
            string token = GenerateToken(userProfile, expiresDate);
            string refreshToken = GenerateRefreshToken(ref userProfile, token);
           
            _context.UserProfile.Attach(userProfile);
            _context.Entry(userProfile).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return new AuthenticateResponse(userProfile, token, expiresDate, refreshToken);
        }

        private string GenerateToken(UserProfile user, DateTime expires)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserProfileId.ToString())
                }),
                Expires = expires,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshToken(ref UserProfile userProfile, string token)
        {
            using (var rngCryptoServiceProvider = new RNGCryptoServiceProvider())
            {
                token = string.Format("{0}{1}{2}", Guid.NewGuid().ToString(), token, Guid.NewGuid().ToString());
                byte[] asscii = Encoding.ASCII.GetBytes(token);
                rngCryptoServiceProvider.GetBytes(asscii);
                DateTime createdDate = DateTime.Now;
                userProfile.RefreshToken = Convert.ToBase64String(asscii);
                userProfile.RefreshTokenCreatedDate = createdDate;
                userProfile.RefreshTokenExpiresDate = createdDate.AddDays(_appSettings.DayOfRefreshTokenExpires);
                return userProfile.RefreshToken;
            }
        }

        public async Task<AuthenticateResponse> RefreshToken(RefreshTokenRequest request)
        {
            UserProfile userProfile = await _context.UserProfile.FirstOrDefaultAsync(w => w.RefreshToken == request.Token);

            // return null if no user found with token
            if (userProfile == null) return null;

            // return null if token is no longer active
            if (userProfile.RefreshTokenExpiresDate < DateTime.Now) return null;

            // generate new token
            DateTime expiresDate = DateTime.Now.AddMinutes(_appSettings.MinuteOfTokenExpires);
            string newToken = GenerateToken(userProfile, expiresDate);

            // replace old refresh token with a new one and save
            string newRefreshToken = GenerateRefreshToken(ref userProfile, newToken);
            _context.UserProfile.Attach(userProfile);
            _context.Entry(userProfile).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return new AuthenticateResponse(userProfile, newToken, expiresDate, newRefreshToken);
        }
    }
}
