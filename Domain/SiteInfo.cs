using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class SiteInfo
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
        /// Phone
        /// </summary>
        public virtual string Phone
        {
            get;
            set;
        }
        /// <summary>
        /// Email
        /// </summary>
        public virtual string Email
        {
            get;
            set;
        }
        /// <summary>
        /// Address
        /// </summary>
        public virtual string Address
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
        /// UpdateTime
        /// </summary>
        public virtual DateTime UpdateTime
        {
            get;
            set;
        }
    }
}
