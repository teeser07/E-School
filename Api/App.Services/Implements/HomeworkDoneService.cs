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

        public async Task SaveHomeworkDone(HomeworkDone homeworkdone)
        {
            this._context.HomeworkDone.Add(homeworkdone);
            await this._context.SaveChangesAsync();
        }


    }
}

