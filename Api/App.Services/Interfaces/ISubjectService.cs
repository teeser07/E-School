using App.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface ISubjectService
    {
        Task<Subject> GetSubjectDetail(int subject_id);
        Task SaveSubject(Subject subject);
        Task DeleteSubject(int subject_id);
        Task<List<Subject>> GetSubject();
        Task UpdateSubject(int subject_id, Subject subject);
    }
}