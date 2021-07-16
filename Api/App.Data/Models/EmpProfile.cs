using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{
    public class EmpProfile : BaseModel
    {
        public int EmpProfileId { get; set; }
        public string EmpCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tel { get; set; }
        public string Status { get; set; }
    }

    public class EmpProfileConfiguration : BaseConfiguration<EmpProfile>
    {
        public override void Configure(EntityTypeBuilder<EmpProfile> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.EmpProfileId);
        }
    }
}
