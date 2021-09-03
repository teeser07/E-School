using App.Data.DTOs;
using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IMapClassRoomTeacherService
    {
        Task Save(MapClassRoomTeacher mapclassroomteacher);
        Task<IEnumerable<dynamic>> GetMapClassRoomTeacher(string keyword);
        Task Delete(int mapclassroomteacherId);
        Task Update(MapClassRoomTeacher mapclassroomteacher);
        Task<IEnumerable<dynamic>> GetEmpProfile(string key);
        Task<GetStudentResponse> GetStudent(int? mapClassRoomTeacherId);
        Task SaveStudent(SaveStudentRequest request);
        Task DeleteStudent(int id);
        Task<MapClassRoomTeacher> GetMCRT(int MapClassRoomTeacherId);
        Task<GetClassRoomRespone> GetRoom(int SubjectId);
        

    }
}