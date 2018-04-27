﻿//
// 不要修改此文件中的代码
// 此文件由系统自动生成，再次生成时所有内容会被覆盖
//
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Web;

namespace YQJ_BusinessLib.Models.Socket.ParameterModel
{
    /// <summary>
    /// 推送
    /// </summary>
    public class Push_Par
    {
        /// <summary>
        /// 身份密钥：
        /// </summary>
		[Required(ErrorMessage = "身份密钥是必须项")]
        public string Token { get; set; }

        /// <summary>
        /// 操作传push：
        /// </summary>
		[Required(ErrorMessage = "操作传push是必须项")]
        public string Action { get; set; }

    }
}