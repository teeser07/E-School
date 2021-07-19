using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class Period : BaseModel
    {
        public int Period_id { get; set; }
        public string Order { get; set; }
        public string Start_time { get; set; }
        public string End_time { get; set; }
    }
    public class TimesConfiguration : BaseConfiguration<Period>
    {
        public override void Configure(EntityTypeBuilder<Period> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.Period_id);
        }
    }
}