using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class HomeworkDone : BaseModel
    {
        public int? Id { get; set; }
        public int MapClassRoomTeacherId { get; set; }
        public int StudentId { get; set; }
        public int HomeworkDetailId { get; set; }
        public string Status { get; set; }
        public string Answer { get; set; }
    }
    public class HomeworkDoneConfiguration : BaseConfiguration<HomeworkDone>
    {
        public override void Configure(EntityTypeBuilder<HomeworkDone> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.Id);
        }
    }
}