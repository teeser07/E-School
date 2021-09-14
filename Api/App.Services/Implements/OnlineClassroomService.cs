using App.Data;
using App.Data.DTOs;
using App.Data.Models;
using App.Services.Interfaces;
using App.Utility;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Implements
{
    public class OnlineClassroomService : IOnlineClassroomService
    {
        private readonly IAppDbContext _context;

        public OnlineClassroomService(IAppDbContext context)
        {
            _context = context;
        }


        //Save-Online-Classroom
        public async Task SaveOnlineClassroom(OnlineClassroom onlineclassroom)
        {
            this._context.OnlineClassroom.Add(onlineclassroom);
            await this._context.SaveChangesAsync();
        }

        //Get-online-classroom 
        public async Task<GetOnlineLinkResponse> GetLink(int MapClassRoomTeacherId)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"
            select		                oc.online_classroom_id ""onlineClassroomId"",
                                        oc.online_classroom_link ""onlineClassroomLink""
                           from online_classroom oc
                           where       1=1");
            if (MapClassRoomTeacherId == null || MapClassRoomTeacherId == 0)
                sql.AppendLine(@"and map_class_room_teacher_id is null");
            else
                sql.AppendLine(@"and map_class_room_teacher_id = @ids");
            sql.AppendLine(@"order by  oc.online_classroom_id");
            var onlinelink = await _context.QueryAsync<dynamic>(sql.ToString(), new { ids = MapClassRoomTeacherId});
            return new GetOnlineLinkResponse() { OnlineLinkList = onlinelink };
        }

        //Update-Link
        public async Task UpdateLink(OnlineClassroom onlineclassroom)
        {
            OnlineClassroom oc = await _context.OnlineClassroom.Where(w => w.OnlineClassroomId == onlineclassroom.OnlineClassroomId).FirstOrDefaultAsync();
            if (oc == null) throw new ApiException(HttpStatusCode.BadRequest, "วิชานี้ไม่มีข้อมูลหรือถูกลบไปแล้ว");
            oc.OnlineClassroomLink = onlineclassroom.OnlineClassroomLink;
            _context.OnlineClassroom.Attach(oc);
            _context.Entry(oc).State = EntityState.Modified;
            await this._context.SaveChangesAsync();
            return;
        }

        //Delete-Link
        public async Task DeleteLink(int OnlineClassroomId)
        {
            OnlineClassroom user = await _context.OnlineClassroom.Where(w => w.OnlineClassroomId == OnlineClassroomId).FirstOrDefaultAsync();
            if (user == null) throw new ApiException(HttpStatusCode.BadRequest, "ลิ้งค์นี้ถูกลบไปแล้ว");
            _context.OnlineClassroom.Remove(user);
            if (user.OnlineClassroomId != null)
            {
                OnlineClassroom oc = await _context.OnlineClassroom.Where(w => w.OnlineClassroomId == user.OnlineClassroomId).FirstOrDefaultAsync();
                _context.OnlineClassroom.Remove(oc);
            }
            await this._context.SaveChangesAsync();
        }

    }
}

