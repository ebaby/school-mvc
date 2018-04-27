using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class User
    {
        public virtual int ID
        {
            get;
            set;
        }
        /// <summary>
        /// Account
        /// </summary>
        public virtual string Account
        {
            get;
            set;
        }
        /// <summary>
        /// Password
        /// </summary>
        public virtual string Password
        {
            get;
            set;
        }
        /// <summary>
        /// Mobile
        /// </summary>
        public virtual string Mobile
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
        /// RealName
        /// </summary>
        public virtual string RealName
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
        /// CreateTime
        /// </summary>
        public virtual DateTime? CreateTime
        {
            get;
            set;
        }
        /// <summary>
        ///  LastLoginTime
        /// </summary>
        public virtual DateTime? LastLoginTime
        {
            get;
            set;
        }
        /// <summary>
        ///  LoginCount
        /// </summary>
        public virtual int LoginCount
        {
            get;
            set;
        }
        /// <summary>
        ///  IsAdmin
        /// </summary>
        public virtual int IsAdmin
        {
            get;
            set;
        }
    }
}
