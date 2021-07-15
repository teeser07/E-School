using App.Data.DTOs;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace App.Data.Models
{
    public class User : BaseModel
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string EmpCode { get; set; }
        public string StudentCode { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }
        public string Roles { get; set; }
        [JsonIgnore]
        public string SecurityStamp { get; set; }
        [JsonIgnore]
        public string RefreshTokenHash { get; set; }
        [JsonIgnore]
        public DateTime? RefreshTokenExpiresDate { get; set; }
        [JsonIgnore]
        public DateTime? RefreshTokenCreatedDate { get; set; }
        public int? EmpProfileId { get; set; }
        public int? StudentProfileId { get; set; }
    }

    public class UserProfileConfiguration : BaseConfiguration<User>
    {
        public override void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.UserId);
        }
    }
}
