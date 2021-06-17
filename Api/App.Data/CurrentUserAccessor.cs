using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data
{
    public class CurrentUserAccessor : ICurrentUserAccessor
    {
        //private readonly IHttpContextAccessor _httpContextAccessor;

        //public CurrentUserAccessor(IHttpContextAccessor httpContextAccessor)
        public CurrentUserAccessor()
        {
            //_httpContextAccessor = httpContextAccessor;
        }

        public int ProfileId => 0;
        public string UserName => string.Empty;
        public string Email => string.Empty;
    }
}
