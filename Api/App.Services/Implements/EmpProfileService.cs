using App.Data;
using App.Data.DTOs;
using App.Data.Models;
using App.Services.Interfaces;
using App.Utility;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Implements
{
    public class EmpProfileService : IEmpProfileService
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserAccessor _user;
        private readonly IAccountService _account;

        public EmpProfileService(IAppDbContext context, ICurrentUserAccessor user, IAccountService account)
        {
            _context = context;
            _user = user;
            _account = account;
        }

        public async Task Save(SaveEmpProfileRequest request)
        {
            if (_context.EmpProfile.Any(a => a.EmpCode == request.EmpCode))
                throw new ApiException(HttpStatusCode.BadRequest, "รหัสพนักงานนี้มีอยู่แล้ว");

            EmpProfile empProfile = new EmpProfile();
            empProfile.EmpCode = request.EmpCode;
            empProfile.FirstName = request.FirstName;
            empProfile.LastName = request.LastName;
            empProfile.Tel = request.Tel;
            empProfile.Status = request.Status;
            _context.EmpProfile.Add(empProfile);
            await this._context.SaveChangesAsync();
            await _account.CreateEmpUser(request.Email, request.EmpCode, request.Password, request.Role, empProfile.EmpProfileId);
            return;
        }

        public async Task<IEnumerable<dynamic>> GetEmpProfile(string keyword)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendLine(@"select     u.email,
			                            u.emp_code ""empCode"",
                                        ep.first_name ""firstName"",
                                        ep.last_name ""lastName"",
                                        ep.tel,
                                        u.""role"",
                                        ep.status,
                                        st.status_desc ""statusName"",
                                        u.user_id ""userId"",
                                        ep.emp_profile_id ""empProfileId""
                            from        ""user"" u
                            inner join  emp_profile ep
                            on          ep.emp_profile_id = u.emp_profile_id
                            inner join  status st
                            on          ep.status = st.status_value");

            if (!string.IsNullOrEmpty(keyword))
                sql.AppendLine("where       concat(u.email, u.emp_code, ep.first_name, ep.last_name, ep.tel) ilike '%' || @keyword || '%'");

            sql.AppendLine("order by u.role");
            var data = await _context.QueryAsync<dynamic>(sql.ToString(), new { keyword = keyword });
            return data;
        }

        public async Task Delete(int userId)
        {
            User user = await _context.User.Where(w => w.UserId == userId).FirstOrDefaultAsync();
            if (user == null) throw new ApiException(HttpStatusCode.BadRequest, "บุคลากรคนนี้ถูกลบไปแล้ว");
            _context.User.Remove(user);
            if (user.EmpProfileId != null)
            {
                EmpProfile empProfile = await _context.EmpProfile.Where(w => w.EmpProfileId == user.EmpProfileId).FirstOrDefaultAsync();
                _context.EmpProfile.Remove(empProfile);
            }

            await this._context.SaveChangesAsync();
        }

        public async Task Update(SaveEmpProfileRequest request)
        {
            EmpProfile empProfile = await _context.EmpProfile.Where(w => w.EmpProfileId == request.EmpProfileId).FirstOrDefaultAsync();
            if (empProfile == null) throw new ApiException(HttpStatusCode.BadRequest, "บุคลากรคนนี้ไม่มีข้อมูลหรือถูกลบไปแล้ว");
            empProfile.FirstName = request.FirstName;
            empProfile.LastName = request.LastName;
            empProfile.Tel = request.Tel;
            empProfile.Status = request.Status;
            _context.EmpProfile.Attach(empProfile);
            _context.Entry(empProfile).State = EntityState.Modified;
            await this._context.SaveChangesAsync();
            await _account.UpdateEmpUser(request.UserId, request.Password, request.Role);
            return;
        }
    }
}
