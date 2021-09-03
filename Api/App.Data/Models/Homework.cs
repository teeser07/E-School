using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class Homework : BaseModel
    {
        public int? HomeWorkId { get; set; }
        public int EmpProfileId { get; set; }
        public int MapClassRoomTeacherId { get; set; }
        public int Lesson { get; set; }
        public int Orders { get; set; }
        public string Contents { get; set; }
    }
    public class HomeworkConfiguration : BaseConfiguration<Homework>
    {
        public override void Configure(EntityTypeBuilder<Homework> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.HomeWorkId);
        }
    }
}