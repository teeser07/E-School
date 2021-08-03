using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.DTOs
{
    public class SaveStudentRequest
    {
        public List<int> students { get; set; }
        public int MapClassRoomTeacherId { get; set; }
    }
}
