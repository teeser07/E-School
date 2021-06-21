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
    public class UserProfile : BaseModel
    {
        public int UserProfileId { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [JsonIgnore]
        public string SecurityStamp { get; set; }
        [JsonIgnore]
        public string RefreshTokenHash { get; set; }
        [JsonIgnore]
        public DateTime? RefreshTokenExpiresDate { get; set; }
        [JsonIgnore]
        public DateTime? RefreshTokenCreatedDate { get; set; }
    }

    public class UserProfileConfiguration : BaseConfiguration<UserProfile>
    {
        public override void Configure(EntityTypeBuilder<UserProfile> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.UserProfileId);
        }
    }
}
