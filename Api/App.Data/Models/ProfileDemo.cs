using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{
    public class ProfileDemoConfiguration : BaseConfiguration<ProfileDemo>
    {
        public override void Configure(EntityTypeBuilder<ProfileDemo> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.ProfileId);
            builder.HasMany(m => m.EducationalHistoryDemos).WithOne().HasForeignKey(m => m.ProfileId);
        }
    }

    public class ProfileDemo : BaseModel
    {
        public int ProfileId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<EducationalHistoryDemo> EducationalHistoryDemos { get; set; }
    }
}
