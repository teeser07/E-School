using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Models
{

    public class Document : BaseModel
    {
        public int? Id { get; set; }
        public int SubjectId { get; set; }
        public string Title { get; set; }
        public string File { get; set; }
    }
    public class DocumentConfiguration : BaseConfiguration<Document>
    {
        public override void Configure(EntityTypeBuilder<Document> builder)
        {
            base.Configure(builder);
            builder.HasKey(m => m.Id);
        }
    }
}