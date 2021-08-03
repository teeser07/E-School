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
    public class TimeTableService : ITimeTableService
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserAccessor _user;
        private readonly IAccountService _account;

        public TimeTableService(IAppDbContext context, ICurrentUserAccessor user, IAccountService account)
        {
            _context = context;
            _user = user;
            _account = account;
        }

        public async Task Save(TimeTable timetable)
        {
            this._context.TimeTable.Add(timetable);
            await this._context.SaveChangesAsync();
        }


        public async Task<IEnumerable<dynamic>> GetTimetable(string keyword)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"select     tb.time_table_id ""timeTableId"",
                                        sj.subject_code ""subjectCode"",
                                        sj.subject_name ""subjectName"",
                                        tb.number ""number"",
                                        emp.first_name ""firstName"",
                                        emp.last_name ""lastName"",
                                        pr.start_time ""startTime"",
                                        pr.end_time ""endTime"",
                                        mcrt.map_class_room_teacher_name ""mapClassroomTeacherName"",
                                        d.day_desc ""day""
                            from        time_table tb
                            left join   subject sj
                            on          tb.subject_id = sj.subject_id 
                            left join   period pr
                            on          tb.period_id = pr.period_id
                            left join   map_class_room_teacher mcrt
                            on          tb.map_class_room_teacher_id = mcrt.map_class_room_teacher_id
                            left join   day d
                            on          tb.day_value = d.day_value
                            left join   emp_profile emp
                            on          sj.subject_teacher_id = emp_profile_id");

            if (!string.IsNullOrEmpty(keyword))
                sql.AppendLine("where       concat(sj.subject_code, sj.subject_name, mcrt.map_class_room_teacher_name,d.day_desc) ilike '%' || @keyword || '%'");

            sql.AppendLine("order by d.day_desc,tb.number,mcrt.map_class_room_teacher_name");
            var data = await _context.QueryAsync<dynamic>(sql.ToString(), new { keyword = keyword });
            return data;
        }

        public async Task DeleteTimetable(int TimeTableId)
        {
            TimeTable user = await _context.TimeTable.Where(w => w.TimeTableId == TimeTableId).FirstOrDefaultAsync();
            if (user == null) throw new ApiException(HttpStatusCode.BadRequest, "ตารางสอนนี้ถูกลบไปแล้ว");
            _context.TimeTable.Remove(user);
            if (user.TimeTableId != null)
            {
                TimeTable tb = await _context.TimeTable.Where(w => w.TimeTableId == user.TimeTableId).FirstOrDefaultAsync();
                _context.TimeTable.Remove(tb);
            }
            await this._context.SaveChangesAsync();
        }

        public async Task UpdateTimetable(TimeTable timetable)
        {
            TimeTable tb = await _context.TimeTable.Where(w => w.TimeTableId == timetable.TimeTableId).FirstOrDefaultAsync();
            if (tb == null) throw new ApiException(HttpStatusCode.BadRequest, "ตารางสอนนี้ไม่มีข้อมูลหรือถูกลบไปแล้ว");
            tb.Number = timetable.Number;
            tb.SubjectId = timetable.SubjectId;
            tb.PeriodId = timetable.PeriodId;
            tb.MapClassRoomTeacherId = timetable.MapClassRoomTeacherId;
            tb.DayValue = timetable.DayValue;
            _context.TimeTable.Attach(tb);
            _context.Entry(tb).State = EntityState.Modified;
            await this._context.SaveChangesAsync();
            return;
        }


        



    }





}
