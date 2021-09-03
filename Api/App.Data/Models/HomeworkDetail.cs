using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class HomeworkDetail : BaseModel
    {
        public int? HomeWorkDetailId { get; set; }
        public int HomeworkId { get; set; }
        public int No { get; set; }
        public string Content { get; set; }
    }
    public class HomeworkDetailConfiguration : BaseConfiguration<HomeworkDetail>
    {
        public override void Configure(EntityTypeBuilder<HomeworkDetail> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.HomeWorkDetailId);
        }
    }
}