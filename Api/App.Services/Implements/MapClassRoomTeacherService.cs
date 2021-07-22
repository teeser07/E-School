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
    public class MapClassRoomTeacherService : IMapClassRoomTeacherService
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserAccessor _user;
        private readonly IAccountService _account;

        public MapClassRoomTeacherService(IAppDbContext context,ICurrentUserAccessor user, IAccountService account)
        {
            _context = context;
            _user = user;
            _account = account;
        }

        public async Task Save(MapClassRoomTeacher mapclassroomteacher)
        {
            this._context.MapClassRoomTeacher.Add(mapclassroomteacher);
            await this._context.SaveChangesAsync();
        }

        public async Task<IEnumerable<dynamic>> GetMapClassRoomTeacher(string keyword)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"select     mcrt.map_class_room_teacher_name ""mapClassRoomTeacherName"",
                                        mcrt.education_level ""educationLevel"",
                                        mcrt.class,
			                            mcrt.room,
                                        emp.first_name ""firstName"",
                                        emp.last_name ""lastName"",
                                        emp.emp_profile_id ""empProfileId"",
                                        emp2.first_name ""firstName2"",
                                        emp2.last_name ""lastName2"",
                                        emp2.emp_profile_id ""empProfileId2"",
                                        mcrt.map_class_room_teacher_id ""mapclassroomteacherId""
                            from        map_class_room_teacher mcrt
                            inner join  emp_profile emp
                            on          mcrt.emp_profile_id_first = emp.emp_profile_id 
                            left join   emp_profile emp2
                            on          mcrt.emp_profile_id_second = emp2.emp_profile_id");

            if (!string.IsNullOrEmpty(keyword))
                sql.AppendLine("where       concat(mcrt.class, mcrt.room, mcrt.map_class_room_teacher_name, emp.first_name, emp.last_name) ilike '%' || @keyword || '%'");

            sql.AppendLine("order by mcrt.map_class_room_teacher_name");
            var data = await _context.QueryAsync<dynamic>(sql.ToString(), new { keyword = keyword });
            return data;

        }

        public async Task Delete(int mapclassroomteacherId)
        {
            MapClassRoomTeacher user = await _context.MapClassRoomTeacher.Where(w => w.MapClassRoomTeacherId == mapclassroomteacherId).FirstOrDefaultAsync();
            if (user == null) throw new ApiException(HttpStatusCode.BadRequest, "ห้องเรียนนี้ถูกลบไปแล้ว");
            _context.MapClassRoomTeacher.Remove(user);
            if (user.MapClassRoomTeacherId != null)
            {
                MapClassRoomTeacher Mcrt = await _context.MapClassRoomTeacher.Where(w => w.MapClassRoomTeacherId == user.MapClassRoomTeacherId).FirstOrDefaultAsync();
                _context.MapClassRoomTeacher.Remove(Mcrt);
            }
            await this._context.SaveChangesAsync();
        }

        public async Task Update(MapClassRoomTeacher mapclassroomteacher)
        {
            MapClassRoomTeacher mcrt = await _context.MapClassRoomTeacher.Where(w => w.MapClassRoomTeacherId == mapclassroomteacher.MapClassRoomTeacherId).FirstOrDefaultAsync();
            if (mcrt == null) throw new ApiException(HttpStatusCode.BadRequest, "ห้องเรียนนี้ไม่มีข้อมูลหรือถูกลบไปแล้ว");
            mcrt.MapClassRoomTeacherName = mapclassroomteacher.MapClassRoomTeacherName;
            mcrt.EducationLevel = mapclassroomteacher.EducationLevel;
            mcrt.Class = mapclassroomteacher.Class;
            mcrt.Room = mapclassroomteacher.Room;
            mcrt.EmpProfileIdFirst = mapclassroomteacher.EmpProfileIdFirst;
            mcrt.EmpProfileIdSecond = mapclassroomteacher.EmpProfileIdSecond;
            _context.MapClassRoomTeacher.Attach(mcrt);
            _context.Entry(mcrt).State = EntityState.Modified;
            await this._context.SaveChangesAsync();
            return;
        }


        public async Task<IEnumerable<dynamic>> GetEmpProfile(string key)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"select     u.email,
			                            u.emp_code ""empCode"",
                                        ep.first_name ""firstName"",
                                        ep.last_name ""lastName"",
                                        ep.tel,
                                        u.""role"",
                                        ep.status, 
                                        u.user_id ""userId"",
                                        ep.emp_profile_id ""empProfileId""
                            from        ""user"" u
                            inner join  emp_profile ep
                            on          ep.emp_profile_id = u.emp_profile_id");

            if (!string.IsNullOrEmpty(key))
                sql.AppendLine("where  u.role='T' and (ep.status = 'a' or ep.status = 'V')");

            sql.AppendLine("order by u.emp_code");
            var data = await _context.QueryAsync<dynamic>(sql.ToString(), new { key = key });
            return data;
        }
    }




    
}
