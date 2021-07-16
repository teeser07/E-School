using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace App.Data
{
    public class CurrentUserAccessor : ICurrentUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        private StringValues _userId;
        public int UserId
        {
            get
            {
                _httpContextAccessor.HttpContext.Request.Headers.TryGetValue("userId", out _userId);
                if (string.IsNullOrEmpty(_userId)) return 0;
                else return int.Parse(_userId);
            }
        }

        private StringValues _role;
        public string Role
        {
            get
            {
                _httpContextAccessor.HttpContext.Request.Headers.TryGetValue("role", out _role);
                return _role;
            }
        }

        private StringValues _empCode;
        public string EmpCode
        {
            get
            {
                _httpContextAccessor.HttpContext.Request.Headers.TryGetValue("empCode", out _empCode);
                return _empCode;
            }
        }

        private StringValues _studentCode;
        public string StudentCode
        {
            get
            {
                _httpContextAccessor.HttpContext.Request.Headers.TryGetValue("studentCode", out _studentCode);
                return _studentCode;
            }
        }
    }
}
