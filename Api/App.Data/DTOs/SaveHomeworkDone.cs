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
        public List<HomeworkDone> HomeworkDoneList { get; set; }
    }
}
