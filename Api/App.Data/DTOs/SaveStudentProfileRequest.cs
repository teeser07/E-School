using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.DTOs
{
    public class SaveStudentProfileRequest
    {
        public string StudentCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tel { get; set; }
        public string Status { get; set; }
        public string Password { get; set; }
        public int? UserId { get; set; }
        public int? StudentProfileId { get; set; }
    }
}
