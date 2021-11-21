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
    public class HomeworkDoneService : IHomeworkDoneService
    {
        private readonly IAppDbContext _context;

        public HomeworkDoneService(IAppDbContext context)
        {
            _context = context;
        }

        public async Task SaveHomeworkDone(SaveHomeworkDoneRequest request)
        {
            foreach (HomeworkDone hwd in request.HomeworkDoneList)
            {
                this._context.HomeworkDone.Add(hwd);
                await this._context.SaveChangesAsync();
            }

        }

        public async Task SaveHomeWork(HomeworkDone homeworkdone)
        {
            this._context.HomeworkDone.Add(homeworkdone);
            await this._context.SaveChangesAsync();
        }


        public async Task<GetHomeworkResponse> GetHomeWork(int HomeworkId, int StudentId)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"
            select		hd.id ""Id"",
			            hd.title ""title"",
                        hd.answerfile ""file""
            from        homework_done hd
            where       hd.status = 'fail' ");
            if (HomeworkId == null || HomeworkId == 0)
                sql.AppendLine(@"and homework_id is null");
            if (StudentId == null || StudentId == 0)
                sql.AppendLine(@"and student_id is null");
            else
                sql.AppendLine(@"and student_id = @ids");
                sql.AppendLine(@"and homework_id = @id");
            sql.AppendLine(@"order by    hd.title");
            var studentList = await _context.QueryAsync<dynamic>(sql.ToString(), new { id = HomeworkId, ids = StudentId });
            return new GetHomeworkResponse() { HomeworkDoneList = studentList };
        }



    }
}

