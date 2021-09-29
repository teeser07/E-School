using App.Data.Models;
using App.Data.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IHomeworkService
    {
        Task SaveHomework(Homework homework);
        Task<GetHomeworkResponse> GetHomeworkforTeacher(int EmpProfileId, int MapClassRoomTeacherId);
        Task UpdateHomework(Homework homework);
        Task DeleteHomework(int HomeWorkId);
        Task<Homework> GetHomework(int HomeWorkId);
        Task<GetHomeworkResponse> GetHomeworkforStudent(int MapClassRoomTeacherId);
        Task<GetHomeworkResponse> Homeworks(int EmpProfileId);
    }
}