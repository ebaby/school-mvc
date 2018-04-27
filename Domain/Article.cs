using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Domain
{
    public class Article 
    {

        /// <summary>
        /// ID
        /// </summary>
        public virtual int ID
        {
            get;
            set;
        }
        /// <summary>
        /// MenuID
        /// </summary>
        public virtual int MenuID
        {
            get;
            set;
        }
        /// <summary>
        /// Author
        /// </summary>
        public virtual string Author
        {
            get;
            set;
        }
        /// <summary>
        /// Name
        /// </summary>
        public virtual string Name
        {
            get;
            set;
        }
        /// <summary>
        /// KeyString
        /// </summary>
        public virtual string KeyString
        {
            get;
            set;
        }
        /// <summary>
        /// ImageUrl
        /// </summary>
        public virtual string ImageUrl
        {
            get;
            set;
        }
        /// <summary>
        /// BgImageUrl
        /// </summary>
        public virtual string BgImageUrl
        {
            get;
            set;
        }
        /// <summary>
        /// CreateTime
        /// </summary>
        public virtual DateTime CreateTime
        {
            get;
            set;
        }
        /// <summary>
        /// Status
        /// </summary>
        public virtual int Status
        {
            get;
            set;
        }
        /// <summary>
        /// Abstract
        /// </summary>
        public virtual string Abstract
        {
            get;
            set;
        }
        /// <summary>
        /// Content
        /// </summary>
        public virtual string Content
        {
            get;
            set;
        }
        /// <summary>
        /// ReferralsSort
        /// </summary>
        public virtual int ReferralsSort
        {
            get;
            set;
        }
        /// <summary>
        /// PreviewNumber
        /// </summary>
        public virtual int PreviewNumber
        {
            get;
            set;
        }
        /// <summary>
        /// UpdateTime
        /// </summary>
        public virtual DateTime UpdateTime
        {
            get;
            set;
        }
        /// <summary>
        /// Remark
        /// </summary>
        public virtual int OrderID
        {
            get;
            set;
        }
        public virtual string Remark
        {
            get;
            set;
        }
        public virtual int ArticleType
        {
            get;
            set;
        }

    }
}
