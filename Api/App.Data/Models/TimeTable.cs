using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class TimeTable : BaseModel
    {
        public int? TimeTableId { get; set; }
        public int Number { get; set; }
        public int? SubjectId { get; set; }
        public int? PeriodId { get; set; }
        public int? MapClassRoomTeacherId { get; set; }
        public string DayValue { get; set; }
    }
    public class TimeTableConfiguration : BaseConfiguration<TimeTable>
    {
        public override void Configure(EntityTypeBuilder<TimeTable> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.TimeTableId);
        }
    }
}