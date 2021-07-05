using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class Subject : BaseModel
    {
        public int Subject_id { get; set; }
        public string Code_subject { get; set; }
        public string Credit { get; set; }
        public string Subject_title { get; set; }
    }
    public class SubjectConfiguration : BaseConfiguration<Subject>
    {
        public override void Configure(EntityTypeBuilder<Subject> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.Subject_id);
        }
    }
}