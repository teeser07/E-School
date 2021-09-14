using App.Data.DTOs;
using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IOnlineClassroomService
    {

        Task SaveOnlineClassroom(OnlineClassroom onlineclassroom);
        Task<GetOnlineLinkResponse> GetLink(int MapClassRoomTeacherId);
        Task UpdateLink(OnlineClassroom onlineclassroom);
        Task DeleteLink(int OnlineClassroomId);
    }
}
