using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Common
{
    public class CookieHelp
    {
        /// <summary>
        /// 设置COOKIE
        /// </summary>
        public static void SetCookie(string cookieKey, object value)
        {
            var cookie = new HttpCookie(cookieKey);
            string strIdValue = value.ToString();
            cookie.Values.Add("Id", strIdValue);
            cookie.Values.Add("Check", Utility.Md5(string.Format("{0}{1}myischeckcum#@$#@$123{2}", strIdValue, cookieKey, HttpContext.Current.Session.SessionID)));
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
        /// <summary>
        /// 获取COOKIE
        /// </summary>
        public static string GetCookie(string cookieKey)
        {
            try
            {
                HttpCookie cookie = HttpContext.Current.Request.Cookies[cookieKey];
                if (cookie != null)
                {
                    string strIdValue = cookie.Values["Id"];
                    string check = cookie.Values["Check"];
                    if (check.Equals(Utility.Md5(string.Format("{0}{1}myischeckcum#@$#@$123{2}", strIdValue, cookieKey, HttpContext.Current.Session.SessionID))))
                    {
                        return strIdValue;
                    }
                }
                return null;
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        ///   注销Cookie
        /// </summary>
        /// <returns></returns>
        public static void RemoveCookie(string cookieKey)
        {
            HttpCookie cookie = new HttpCookie(cookieKey);
            cookie.Values.Add("Id", "");
            cookie.Expires = DateTime.Now.AddDays(-1);
            HttpContext.Current.Response.Cookies.Add(cookie);
        }

        /// <summary>
        /// 设置登录COOKIE
        /// </summary>
        public static void SetLoginCookie(string uName, string uPwd, string userType)
        {
            HttpCookie userCookie = new HttpCookie("BusinessUserCookie");
            userCookie.Values["UEmail"] = uName;
            userCookie.Values["Upwd"] = uPwd;
            userCookie.Values["UType"] = userType;
            userCookie.Expires = DateTime.Now.AddDays(15);
            HttpContext.Current.Response.Cookies.Add(userCookie);   //保存到Cookies中
        }
        /// <summary>
        /// 获取登录cookie
        /// </summary>
        /// <returns></returns>
        public static HttpCookie GetLoginCookie()
        {
            if (HttpContext.Current.Request.Cookies["BusinessUserCookie"] == null) return null;
            HttpCookie userCookie = HttpContext.Current.Request.Cookies["BusinessUserCookie"];
            return !userCookie.HasKeys ? null : userCookie;
        }
        /// <summary>
        /// 注销保存的登录状态
        /// </summary>
        public static void DelLoginCookie()
        {
            if (HttpContext.Current.Request.Cookies["BusinessUserCookie"] == null) return;
            HttpCookie outCookie = HttpContext.Current.Request.Cookies["BusinessUserCookie"];
            outCookie.Expires = DateTime.Now.AddDays(-1);
            HttpContext.Current.Response.Cookies.Add(outCookie);
        }
    }
}
