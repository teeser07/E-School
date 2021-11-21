﻿using App.Data.Models;
using App.Data.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IHomeworkDoneService
    {
        Task SaveHomeworkDone(SaveHomeworkDoneRequest request);
        Task SaveHomeWork(HomeworkDone homeworkdone);
        Task<GetHomeworkResponse> GetHomeWork(int HomeworkId,int StudentId);
    }
}