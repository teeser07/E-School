using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class Room : BaseModel
    {
        public int Room_id { get; set; }
        public string Clas { get; set; }
        public string Classroom { get; set; }
        public int Max_std { get; set; }
    }
    public class RoomConfiguration : BaseConfiguration<Room>
    {
        public override void Configure(EntityTypeBuilder<Room> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.Room_id);
        }
    }
}