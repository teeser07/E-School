using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{
    public class Profile : BaseModel
    {
        public int ProfileId { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
    }

    public class ProfileConfiguration : BaseConfiguration<Profile>
    {
        public override void Configure(EntityTypeBuilder<Profile> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.ProfileId);
        }
    }
}
