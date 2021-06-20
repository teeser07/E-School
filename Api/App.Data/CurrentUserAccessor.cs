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

        private StringValues _userProfileId;
        public int UserProfileId
        {
            get
            {
                _httpContextAccessor.HttpContext.Request.Headers.TryGetValue("userProfileId", out _userProfileId);
                return int.Parse(_userProfileId);
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
    }
}
