using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.DTOs
{
    public class GetStudentResponse
    {
        public IEnumerable<dynamic> StudentList { get; set; }
        public IEnumerable<dynamic> StudentSelected { get; set; }
    }
}
