using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{
    public class EducationalHistoryDemoConfiguration : BaseConfiguration<EducationalHistoryDemo>
    {
        public override void Configure(EntityTypeBuilder<EducationalHistoryDemo> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.EducationalHistoryId);
        }
    }

    public class EducationalHistoryDemo : BaseModel
    {
        public int EducationalHistoryId { get; set; }
        public int ProfileId { get; set; }
        public string InstitutionName { get; set; }
        public int? StartYear { get; set; }
        public int? EndYear { get; set; }
    }
}
