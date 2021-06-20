using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data
{
    public interface ICurrentUserAccessor
    {
        public int UserProfileId { get; }
        public string UserName { get; }
    }
}
