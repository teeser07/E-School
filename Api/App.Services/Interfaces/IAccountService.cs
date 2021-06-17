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
        Task<Profile> Signin(SigninRequest request);
        Task Signup(SignupRequest request);
        Task ChangePassword(ChangePasswordRequest request);
    }
}
