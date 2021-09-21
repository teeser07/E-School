using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.DTOs
{
    public class SaveHomeworkDoneRequest
    {
        public List<int> HomeworkDone { get; set; }
        public int MapClassRoomTeacherId { get; set; }
        public int StudentId { get; set; }
        public int HomeworkDetailId { get; set; }
        public string Status { get; set; }
        public string Answer { get; set; }
    }
}
