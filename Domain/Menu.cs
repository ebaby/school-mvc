using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Menu
    {
        public virtual int ID { get; set; }
        public virtual string Name { get; set; }
        public virtual int ParentID { get; set; }
        public virtual int OrderID { get; set; }
        public virtual string Remark { get; set; }
        public virtual string Icon { get; set; }
        public virtual string UrlPath { get; set; }
        public virtual int IsVisible { get; set; }
        public virtual int IsEnabled { get; set; }
        public virtual int HasArticle { get; set; }
        public virtual DateTime CreateTime { get; set; }
        public virtual int CreateUser { get; set; }
        public virtual DateTime UpdateTime { get; set; }
        public virtual int UpdateUser { get; set; }
        public virtual int Status { get; set; }
    }
}
