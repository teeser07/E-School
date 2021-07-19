using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class Holiday : BaseModel
    {
        public int Holiday_id { get; set; }
        public DateTime Date { get; set; }
        public string Note { get; set; }
    }
    public class HolidayConfiguration : BaseConfiguration<Holiday>
    {
        public override void Configure(EntityTypeBuilder<Holiday> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.Holiday_id);
        }
    }
}
