using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.DTOs
{
    public class GetTimetableResponse
    {
        public IEnumerable<dynamic> TimetableList { get; set; }
    }
}
