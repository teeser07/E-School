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


        public async Task<GetTimetableResponse> GetTimetables(int? mapClassRoomTeacherId)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"
            select		                tb.time_table_id ""timeTableId"",
                                        sj.subject_code ""subjectCode"",
                                        sj.subject_name ""subjectName"",
                                        tb.number ""number"",
                                        concat(emp.first_name, ' ', emp.last_name) ""teacherName"",
                                        concat(pr.start_time, '-', pr.end_time) ""period"",
                                        d.day_desc ""day"",
                                        tb.map_class_room_teacher_id ""mapclassroomteacherId""
                            from        time_table tb
                            left join   subject sj
                            on          tb.subject_id = sj.subject_id 
                            left join   period pr
                            on          tb.period_id = pr.period_id
                            left join   day d
                            on          tb.day_value = d.day_value
                            left join   emp_profile emp
                            on          sj.subject_teacher_id = emp_profile_id
                            where       1=1");
            if (mapClassRoomTeacherId == null || mapClassRoomTeacherId == 0)
                sql.AppendLine(@"and map_class_room_teacher_id is null");
            else
                sql.AppendLine(@"and map_class_room_teacher_id = @id");
            sql.AppendLine(@"order by    d.day_desc,sj.subject_code,tb.number,sj.subject_name");
            var timetableList = await _context.QueryAsync<dynamic>(sql.ToString(), new { id = mapClassRoomTeacherId });
            return new GetTimetableResponse() { TimetableList = timetableList };
        }

        public async Task DeleteTimetable(int timeTableId)
        {
            TimeTable tb = await _context.TimeTable.Where(w => w.TimeTableId == timeTableId).FirstOrDefaultAsync();
            if (tb == null) throw new ApiException(HttpStatusCode.BadRequest, "คาบนี้ถูกลบไปแล้ว");
            _context.TimeTable.Remove(tb);
            if (tb.TimeTableId != null)
            {
                TimeTable tt = await _context.TimeTable.Where(w => w.TimeTableId == tb.TimeTableId).FirstOrDefaultAsync();
                _context.TimeTable.Remove(tt);
            }
            await this._context.SaveChangesAsync();
        }


        public async Task SaveTimetable(TimeTable timeTable)
        {
            this._context.TimeTable.Add(timeTable);
            await this._context.SaveChangesAsync();
        }

        public async Task UpdateTimetable(TimeTable timeTable)
        {
            TimeTable sj = await _context.TimeTable.Where(w => w.TimeTableId == timeTable.TimeTableId).FirstOrDefaultAsync();
            if (sj == null) throw new ApiException(HttpStatusCode.BadRequest, "คาบนี้ไม่มีข้อมูลหรือถูกลบไปแล้ว");
            sj.SubjectId = timeTable.SubjectId;
            sj.PeriodId = timeTable.PeriodId;
            sj.MapClassRoomTeacherId = timeTable.MapClassRoomTeacherId;
            sj.DayValue = timeTable.DayValue;
            sj.Number = timeTable.Number; 
            _context.TimeTable.Attach(sj);
            _context.Entry(sj).State = EntityState.Modified;
            await this._context.SaveChangesAsync();
            return;
        }


        public async Task<GetTimetableResponse> GetTimetableDetail(string DayValue, int mapClassRoomTeacherId)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"
            select		                tb.time_table_id ""timeTableId"",
                                        sj.subject_code ""subjectCode"",
                                        sj.subject_name ""subjectName"",
                                        tb.number ""number"",
                                        concat(emp.first_name, ' ', emp.last_name) ""teacherName"",
                                        concat(pr.start_time, '-', pr.end_time) ""period""
                            from        time_table tb
                            left join   subject sj
                            on          tb.subject_id = sj.subject_id 
                            left join   period pr
                            on          tb.period_id = pr.period_id
                            left join   emp_profile emp
                            on          sj.subject_teacher_id = emp_profile_id
                            where       1=1");
            if (DayValue == null || DayValue == null)
                sql.AppendLine(@"and day_value is null");
            if (mapClassRoomTeacherId == null || mapClassRoomTeacherId == 0)
                sql.AppendLine(@"and map_class_room_teacher_id is null");
            else
                sql.AppendLine(@"and day_value = @day_value");
            sql.AppendLine(@"and map_class_room_teacher_id = @id");
            sql.AppendLine(@"order by    tb.number,sj.subject_code,sj.subject_name");
            var timetableList = await _context.QueryAsync<dynamic>(sql.ToString(), new { day_value = DayValue, id = mapClassRoomTeacherId });
            return new GetTimetableResponse() { TimetableList = timetableList };
        }


    }





}
