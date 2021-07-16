using App.Data;
using App.Data.DTOs;
using App.Data.Models;
using App.Services.Interfaces;
using App.Utility;
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
            await _account.CreateEmpUser(request.Email, request.EmpCode, request.Password, request.Roles, empProfile.EmpProfileId);
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
                                        s1.status_desc ""role"",
                                        s2.status_desc ""status""
                            from        ""user"" u
                            inner join  emp_profile ep
                            on          ep.emp_profile_id = u.emp_profile_id
                            left join   status s1
                            on          s1.table_name = 'user'
                                        and s1.column_name = 'role'
                                        and s1.status_value = u.""role""
                            left join   status s2
                            on          s2.table_name = 'emp_profile'
                                        and s2.column_name = 'status'
                                        and s2.status_value = ep.status");

            if (!string.IsNullOrEmpty(keyword))
                sql.AppendLine("where       concat(u.email, u.emp_code, ep.first_name, ep.last_name, ep.tel, s1.status_desc, s2.status_desc) ilike '%' || @keyword || '%'");

            sql.AppendLine("order by u.emp_code");
            var data = await _context.QueryAsync<dynamic>(sql.ToString(), new { keyword = keyword });
            return data;
        }
    }
}
