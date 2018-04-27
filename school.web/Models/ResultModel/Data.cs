//
// 不要修改此文件中的代码
// 此文件由系统自动生成，再次生成时所有内容会被覆盖
//
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Web;

namespace YQJ_BusinessLib.Models.Socket.ResultModel
{
    /// <summary>
    /// 返回数据
    /// </summary>
    public class Data
    {
        /// <summary>
        /// 类型：
		/// 0、登陆  1、退出 2、心跳 3、下发作业
        /// </summary>
        public int Type { get; set; }

        /// <summary>
        /// 下发作业信息：
        /// </summary>
        public HWInfo HWInfo { get; set; }

    }
}