
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Web;

namespace school.web.Models.ResultModel
{
    /// <summary>
    /// 返回数据
    /// </summary>
    public class Menu_Result
    {
        public Domain.Menu Menu { get; set; }
        
        public string ArticleText { get; set; }
        public List<string> ArticleImage { get; set; }

    }
}