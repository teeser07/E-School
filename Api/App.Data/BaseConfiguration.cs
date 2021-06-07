using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data
{
    public class BaseConfiguration<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : BaseModel
    {
        public virtual void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.Property(e => e.CreatedBy).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            builder.Property(e => e.CreatedDate).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            builder.Ignore(e => e.Guid);
            builder.Ignore(e => e.RowState);
            builder.Property(e => e.RowVersion).HasColumnName("xmin").HasColumnType("xid").ValueGeneratedOnAddOrUpdate().IsConcurrencyToken();
        }
    }
}
