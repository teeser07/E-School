using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class Days : BaseModel
    {
        public int Days_id { get; set; }
        public string Day { get; set; }
        public DateTime Datetime { get; set; }
        public string Note { get; set; }
        public string Year { get; set; }
        public string Term { get; set; }
    }
    public class DaysConfiguration : BaseConfiguration<Days>
    {
        public override void Configure(EntityTypeBuilder<Days> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.Days_id);
        }
    }
}
