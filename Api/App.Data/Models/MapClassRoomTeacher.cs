using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class MapClassRoomTeacher : BaseModel
    {
        public int MapClassRoomTeacherId { get; set; }
        public string Class { get; set; }
        public string Room { get; set; }
        public string EducationLevel { get; set; }
        public string MapClassRoomTeacherName { get; set; }
        public int? EmpProfileIdFirst { get; set; }
        public int? EmpProfileIdSecond { get; set; }

    }
    public class MapClassRoomTeacherConfiguration : BaseConfiguration<MapClassRoomTeacher>
    {
        public override void Configure(EntityTypeBuilder<MapClassRoomTeacher> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.MapClassRoomTeacherId);
        }
    }
}