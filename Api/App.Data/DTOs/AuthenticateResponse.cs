﻿using System;
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
        public string UserName { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public DateTime ExpireDate { get; set; }
        public string RefreshToken { get; set; }

        public AuthenticateResponse(User user, string token, DateTime expireDate, string refreshToken)
        {
            Id = user.UserId;
            //UserName = user.UserName;
            Role = user.Role;
            Token = token;
            ExpireDate = expireDate;
            RefreshToken = refreshToken;
        }
    }
}
