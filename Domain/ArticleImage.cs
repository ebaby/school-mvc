using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Domain
{
    public class ArticleImage
    {
        public virtual int ID { get; set; }
        public virtual int ArticleID { get; set; }        
        public virtual string Name { get; set; }
        public virtual string ImageUrl { get; set; }
        public virtual int Status { get; set; }
        public virtual DateTime CreateTime { get; set; }
        public virtual string Remark { get; set; }
    }
}
