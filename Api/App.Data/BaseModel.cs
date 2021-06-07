using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data
{
    public enum RowState
    {
        Normal, Add, Edit, Delete
    }

    public class BaseModel
    {
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public uint? RowVersion { get; set; }
        public string Guid { get; private set; }
        public RowState? RowState { get; set; }

        public BaseModel()
        {
            this.Guid = System.Guid.NewGuid().ToString();
            this.RowState = Data.RowState.Normal;
        }
    }
}
