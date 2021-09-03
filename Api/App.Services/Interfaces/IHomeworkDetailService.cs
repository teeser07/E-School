using App.Data.Models;
using App.Data.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IHomeworkDetailService
    {
        Task SaveHomeworkDetail(HomeworkDetail homeworkDetail);
        Task<GetHomeworkDetailResponse> GetHomeworkDetail(int HomeworkId);
        Task UpdateHomeworkDetail(HomeworkDetail homeworkDetail);
        Task DeleteHomeworkDetail(int HomeWorkDetailId);
    }
}