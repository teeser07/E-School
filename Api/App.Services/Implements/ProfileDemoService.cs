using App.Data;
using App.Data.Models;
using App.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Implements
{
    public class ProfileDemoService : IProfileDemoService
    {
        private readonly IAppDbContext _context;

        public ProfileDemoService(IAppDbContext context)
        {
            _context = context;
        }

        public async Task SaveProfile(ProfileDemo profile)
        {
            this._context.ProfileDemo.Add(profile);
            await this._context.SaveChangesAsync();
        }

        public async Task UpdateProfile(ProfileDemo profile)
        {
            this._context.ProfileDemo.Attach(profile);
            _context.Entry(profile).State = EntityState.Modified;
            await this._context.SaveChangesAsync();
            if (profile.EducationalHistoryDemos.Count > 0)
            {
                foreach (EducationalHistoryDemo eduHis in profile.EducationalHistoryDemos)
                {
                    this._context.EducationalHistoryDemo.Attach(eduHis);
                    _context.Entry(eduHis).State = EntityState.Modified;
                }
                await this._context.SaveChangesAsync();
            }
        }

        public async Task<ProfileDemo> GetProfile(int profileId)
        {
            ProfileDemo profile = await _context.ProfileDemo.Where(w => w.ProfileId == profileId).FirstOrDefaultAsync();
            return profile;
        }

        public async Task<List<EducationalHistoryDemo>> GetEducationalHistory(int profileId)
        {
            List<EducationalHistoryDemo> eduHisList = await _context.EducationalHistoryDemo.Where(w => w.ProfileId == profileId).ToListAsync();
            return eduHisList;
        }

        public async Task DeleteProfile(int profileId)
        {
            List<EducationalHistoryDemo> eduHisList = await _context.EducationalHistoryDemo.Where(w => w.ProfileId == profileId).ToListAsync();
            if (eduHisList.Count > 0)
            {
                foreach (EducationalHistoryDemo eduHis in eduHisList)
                {
                    this._context.EducationalHistoryDemo.Attach(eduHis);
                    _context.Entry(eduHis).State = EntityState.Deleted;
                }
                await this._context.SaveChangesAsync();
            }
            ProfileDemo profile = await _context.ProfileDemo.Where(w => w.ProfileId == profileId).FirstOrDefaultAsync();
            _context.Entry(profile).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }

        public async Task DeleteEducationalHistory(int EducationalHistoryId)
        {
            EducationalHistoryDemo eduHis = await _context.EducationalHistoryDemo.Where(w => w.EducationalHistoryId == EducationalHistoryId).FirstOrDefaultAsync();
            _context.Entry(eduHis).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
        }
    }
}
