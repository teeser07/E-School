using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class Times : BaseModel
    {
        public int Times_id { get; set; }
        public string Orders { get; set; }
        public string Duration { get; set; }
        public string Longterm { get; set; }
    }
    public class TimesConfiguration : BaseConfiguration<Times>
    {
        public override void Configure(EntityTypeBuilder<Times> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.Times_id);
        }
    }
}