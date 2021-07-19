﻿using App.Data.DTOs;
using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IAccountService
    {
        Task<User> GetUser();
        Task<AuthenticateResponse> Authenticate(AuthenticateRequest request);
        //Task Register(RegisterRequest request);
        Task<AuthenticateResponse> RefreshToken(RefreshTokenRequest request);
        Task CreateEmpUser(string email, string empCode, string password, string role, int empProfileId);
        Task UpdateEmpUser(int? userId, string password, string role);
        Task CreateStuUser(string studentCode, string password, int Student_profile_id);
        Task UpdateStdUser(int? userId, string password);
    }
}
