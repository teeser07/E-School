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
    public class HomeworkService : IHomeworkService
    {
        private readonly IAppDbContext _context;

        public HomeworkService(IAppDbContext context)
        {
            _context = context;
        }

        //Save-Homework
        public async Task SaveHomework(Homework homework)
        {
            this._context.Homework.Add(homework);
            await this._context.SaveChangesAsync();
        }

        //Get-Homework-Teacher
        public async Task<GetHomeworkResponse> GetHomeworkforTeacher(int EmpProfileId,int MapClassRoomTeacherId)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"
            select		                hw.home_work_id ""homeWorkId"",
                                        hw.lesson ""lesson"",
                                        hw.orders ""orders"",
                                        hw.contents ""contents""
                           from homework hw
                           where       1=1");
            if (EmpProfileId == null || EmpProfileId == 0)
                sql.AppendLine(@"and emp_profile_id is null");
            if (MapClassRoomTeacherId == null || MapClassRoomTeacherId == 0)
                sql.AppendLine(@"and map_class_room_teacher_id is null");
            else
                sql.AppendLine(@"and emp_profile_id = @ids");
            sql.AppendLine(@"and map_class_room_teacher_id = @id");
            sql.AppendLine(@"order by  hw.lesson,hw.orders ");
            var homeworklist = await _context.QueryAsync<dynamic>(sql.ToString(), new { id= MapClassRoomTeacherId , ids= EmpProfileId });
            return new GetHomeworkResponse() { HomeworkList = homeworklist };
        }

        //Update-homework
        public async Task UpdateHomework(Homework homework)
        {
            Homework hw = await _context.Homework.Where(w => w.HomeWorkId == homework.HomeWorkId).FirstOrDefaultAsync();
            if (hw == null) throw new ApiException(HttpStatusCode.BadRequest, "การบ้านนี้ไม่มีข้อมูลหรือถูกลบไปแล้ว");
            hw.HomeWorkId = homework.HomeWorkId;
            hw.Lesson = homework.Lesson;
            hw.Orders = homework.Orders;
            hw.Contents = homework.Contents;
            _context.Homework.Attach(hw);
            _context.Entry(hw).State = EntityState.Modified;
            await this._context.SaveChangesAsync();
            return;
        }


        //Delete-Homework
        public async Task DeleteHomework(int HomeWorkId)
        {
            Homework user = await _context.Homework.Where(w => w.HomeWorkId == HomeWorkId).FirstOrDefaultAsync();
            if (user == null) throw new ApiException(HttpStatusCode.BadRequest, "วิชานี้ถูกลบไปแล้ว");
            _context.Homework.Remove(user);
            if (user.HomeWorkId != null)
            {
                Homework hw = await _context.Homework.Where(w => w.HomeWorkId == user.HomeWorkId).FirstOrDefaultAsync();
                _context.Homework.Remove(hw);
            }
            await this._context.SaveChangesAsync();
        }


        public async Task<Homework> GetHomework(int HomeWorkId)
        {
            Homework hw = await _context.Homework.Where(w => w.HomeWorkId == HomeWorkId).FirstOrDefaultAsync();
            return hw;
        }

        public async Task<GetHomeworkResponse> GetHomeworkforStudent(int MapClassRoomTeacherId)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"
            select		                hw.home_work_id ""homeWorkId"",
                                        hw.lesson ""lesson"",
                                        hw.orders ""orders"",
                                        hw.contents ""contents""
                           from homework hw
                           where       1=1");
            if (MapClassRoomTeacherId == null || MapClassRoomTeacherId == 0)
                sql.AppendLine(@"and map_class_room_teacher_id is null");
            
            else
                sql.AppendLine(@"and map_class_room_teacher_id = @id");
            sql.AppendLine(@"order by  ");
            var homeworklist = await _context.QueryAsync<dynamic>(sql.ToString(), new { id = MapClassRoomTeacherId});
            return new GetHomeworkResponse() { HomeworkList = homeworklist };
        }



        public async Task<GetHomeworkResponse> Homeworks(int EmpProfileId)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"
            select		                hw.home_work_id ""homeWorkId"",
                                        hw.lesson ""lesson"",
                                        hw.orders ""orders"",
                                        hw.contents ""contents"",
                                        mcrt.map_class_room_teacher_id ""id"",
                                        mcrt.map_class_room_teacher_name ""classRoom""
                           from homework hw
                           inner join  map_class_room_teacher mcrt
                           on          hw.map_class_room_teacher_id = mcrt.map_class_room_teacher_id");
            if (EmpProfileId == null || EmpProfileId == 0)
                sql.AppendLine(@"and emp_profile_id is null");
            else
                sql.AppendLine(@"and emp_profile_id = @ids");
            sql.AppendLine(@"order by  mcrt.map_class_room_teacher_name,hw.lesson,hw.orders ");
            var homeworklist = await _context.QueryAsync<dynamic>(sql.ToString(), new { ids = EmpProfileId });
            return new GetHomeworkResponse() { HomeworkList = homeworklist };
        }
    }
}

