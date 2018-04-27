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
    /// 返回
    /// </summary>
    public class Result
    {
        /// <summary>
        /// 状态码：
		/// 200成功   500服务器错误
        /// </summary>
        public int Code { get; set; }

        /// <summary>
        /// 错误消息：
        /// </summary>
        public string Msg { get; set; }

        /// <summary>
        /// 返回数据：
        /// </summary>
        public Data Data { get; set; }

    }
}