using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace App.Data.Models
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Role { get; set; }
        public string EmpCode { get; set; }
        public string StudentCode { get; set; }
        public string Token { get; set; }
        public DateTime ExpireDate { get; set; }
        public string RefreshToken { get; set; }

        public AuthenticateResponse(int userId, string role, string empCode, string studentCode, string token, DateTime expireDate, string refreshToken)
        {
            Id = userId;
            Role = role;
            EmpCode = empCode;
            StudentCode = studentCode;
            Token = token;
            ExpireDate = expireDate;
            RefreshToken = refreshToken;
        }
    }
}
