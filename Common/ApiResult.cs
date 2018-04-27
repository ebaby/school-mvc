using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class ApiResult
    {
        public int code { get; set; }
        public object data { get; set; }
        public string msg { get; set; }
    }
}
