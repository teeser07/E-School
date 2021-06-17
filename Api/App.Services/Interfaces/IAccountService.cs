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
        Task Login(LoginRequest request);
        Task Register(RegisterRequest request);
        Task ChangePassword(ChangePasswordRequest request);
    }
}
