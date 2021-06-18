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

        private StringValues _profileId;
        public int ProfileId
        {
            get
            {
                _httpContextAccessor.HttpContext.Request.Headers.TryGetValue("profileId", out _profileId);
                return int.Parse(_profileId);
            }
        }

        private StringValues _userName;
        public string UserName
        {
            get
            {
                _httpContextAccessor.HttpContext.Request.Headers.TryGetValue("userName", out _userName);
                return _userName;
            }
        }

        private StringValues _email;
        public string Email
        {
            get
            {
                _httpContextAccessor.HttpContext.Request.Headers.TryGetValue("email", out _email);
                return _email;
            }
        }
    }
}
