using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data
{
    public interface ICurrentUserAccessor
    {
        public int UserId { get; }
        public string Role { get; }
        public string EmpCode { get; }
        public string StudentCode { get; }
    }
}
