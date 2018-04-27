using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YQJ_BusinessLib.Models.Socket.ResultModel
{
    public class TeacherLoginResult
    {
        /// <summary>
        /// 教师编号
        /// </summary>
        public int TeacherID { get; set; }

        /// <summary>
        /// Token
        /// </summary>
        public string Token { get; set; }
    }
}
