using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.DTOs
{
    public class GetEmpProfileResponse
    {
        public string EmpCode { get; set; }
        public string Roles { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tel { get; set; }
        public string Status { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
