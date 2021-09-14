using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class OnlineClassroom : BaseModel
    {
        public int? OnlineClassroomId { get; set; }
        public int? MapClassRoomTeacherId { get; set; }
        public string OnlineClassroomLink { get; set; }
    }
    public class OnlineClassroomConfiguration : BaseConfiguration<OnlineClassroom>
    {
        public override void Configure(EntityTypeBuilder<OnlineClassroom> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.OnlineClassroomId);
        }
    }
}