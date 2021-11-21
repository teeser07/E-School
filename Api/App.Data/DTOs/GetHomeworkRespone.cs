using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.DTOs
{
    public class GetHomeworkResponse
    {
        public IEnumerable<dynamic> HomeworkList { get; set; }
        public IEnumerable<dynamic> SubjectList { get; set; }
        public IEnumerable<dynamic> HomeworkDoneList { get; set; }
    }
}
