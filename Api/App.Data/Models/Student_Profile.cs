using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class Student_profile : BaseModel
    {
        public int Student_profile_id { get; set; }
        public int Class_teacher_id { get; set; }
        public string Student_code { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }
        public string Studentid { get; set; }
        public string Tel { get; set; }
        public string Status { get; set; }
    }
    public class Student_profileConfiguration : BaseConfiguration<Student_profile>
    {
        public override void Configure(EntityTypeBuilder<Student_profile> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.Student_profile_id);
        }
    }
}