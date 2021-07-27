﻿using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface ISubjectService
    {
        Task SaveSubject(Subject subject);
        Task DeleteSubject(int subjectId);
        Task<IEnumerable<dynamic>> GetSubject(string keyword);
        Task UpdateSubject(Subject subject);
    }
}