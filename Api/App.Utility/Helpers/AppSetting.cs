using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Utility.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public int MinuteOfTokenExpires { get; set; }
        public int DayOfRefreshTokenExpires { get; set; }
        public string AesKey { get; set; }
        public string AesIv { get; set; }
    }
}
