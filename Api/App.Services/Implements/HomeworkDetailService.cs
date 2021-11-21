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
    public class HomeworkDetailService : IHomeworkDetailService
    {
        private readonly IAppDbContext _context;

        public HomeworkDetailService(IAppDbContext context)
        {
            _context = context;
        }

        //Save-Homework-Detail
        public async Task SaveHomeworkDetail(HomeworkDetail homeworkDetail)
        {
            this._context.HomeworkDetail.Add(homeworkDetail);
            await this._context.SaveChangesAsync();
        }


        //Get-Homework-Detail
        public async Task<GetHomeworkDetailResponse> GetHomeworkDetail(int HomeworkId)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"
            select		                hwd.home_work_detail_id ""homeWorkDetailId"",
                                        hwd.title ""title"",
                                        hwd.content ""content""
                           from         homework_detail hwd
                           where       1=1");
            if (HomeworkId == null || HomeworkId == 0)
                sql.AppendLine(@"and homework_id is null");
            else
                sql.AppendLine(@"and homework_id = @id");
            sql.AppendLine(@"order by   hwd.title");
            var homeworkdetaillist = await _context.QueryAsync<dynamic>(sql.ToString(), new { id = HomeworkId });
            return new GetHomeworkDetailResponse() { HomeworkDetailList = homeworkdetaillist };
        }

        //Update-homework-Detail
        public async Task UpdateHomeworkDetail(HomeworkDetail homeworkDetail)
        {
            HomeworkDetail hwd = await _context.HomeworkDetail.Where(w => w.HomeWorkDetailId == homeworkDetail.HomeWorkDetailId).FirstOrDefaultAsync();
            if (hwd == null) throw new ApiException(HttpStatusCode.BadRequest, "การบ้านข้อนี้ไม่มีข้อมูลหรือถูกลบไปแล้ว");
            hwd.HomeWorkDetailId = homeworkDetail.HomeWorkDetailId;
            hwd.Title = homeworkDetail.Title;
            hwd.Content = homeworkDetail.Content;
            _context.HomeworkDetail.Attach(hwd);
            _context.Entry(hwd).State = EntityState.Modified;
            await this._context.SaveChangesAsync();
            return;
        }

        //Delete-Homework
        public async Task DeleteHomeworkDetail(int HomeWorkDetailId)
        {
            HomeworkDetail user = await _context.HomeworkDetail.Where(w => w.HomeWorkDetailId == HomeWorkDetailId).FirstOrDefaultAsync();
            if (user == null) throw new ApiException(HttpStatusCode.BadRequest, "การบ้านข้อนี้ถูกลบไปแล้ว");
            _context.HomeworkDetail.Remove(user);
            if (user.HomeWorkDetailId != null)
            {
                HomeworkDetail hwd = await _context.HomeworkDetail.Where(w => w.HomeWorkDetailId == user.HomeWorkDetailId).FirstOrDefaultAsync();
                _context.HomeworkDetail.Remove(hwd);
            }
            await this._context.SaveChangesAsync();
        }
    }
}

