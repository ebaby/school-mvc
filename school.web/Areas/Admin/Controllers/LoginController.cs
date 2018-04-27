using DapperExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace school.web.Areas.Admin.Controllers
{
    public class LoginController : Controller
    {
        // GET: Admin/Login
        public ActionResult Index()
        {
            return View();
        }

        protected Server.UserSvc user_svc = new Server.UserSvc();
                

        [HttpPost]
        public ActionResult UserLogin(string UserName, string PassWord)
        {
            var result = "{{\"code\":{0},\"data\":{{}},\"msg\":\"{1}\"}}";
            try
            {
                var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };
                predicates.Predicates.Add(Predicates.Field<Domain.User>(p => p.Account, Operator.Eq, UserName));
                var list = user_svc.GetList(predicates, null);

                if (list != null && list.Count() > 0)
                {
                    predicates.Predicates.Add(Predicates.Field<Domain.User>(p => p.Password, Operator.Eq, PassWord));// Common.Utility.Md5(PassWord)
                    list = //Common.MSSqlHelper.GetDataTable(string.Format("SELECT * FROM Employee WHERE Account='{0}' AND Password='{1}'", UserName, Common.Utility.Md5(PassWord))); 
                            user_svc.GetList(predicates, null);

                    if (list != null && list.Count() > 0)
                    {
                        Domain.User entity = new Domain.User();
                        foreach (var item in list)
                        {
                            entity = item; break;
                        }
                        entity.LoginCount += 1;
                        entity.LastLoginTime = DateTime.Now;
                        if (user_svc.Update(entity))
                        {
                            var cookie = new HttpCookie(Common.Config.CookieKey);
                            //cookie.Values.Add("Id", shopId.ToString());
                            cookie.Values["Id"] = entity.ID.ToString();

                            cookie.Expires = DateTime.Now.AddDays(1);

                            HttpContext.Response.Cookies.Add(cookie);
                            result = string.Format(result, 0, "");
                        }
                    }
                    else
                    {
                        //result = "error:密码错误";
                        result = string.Format(result, 1001, "密码错误");
                    }
                }
                else
                {
                    //result = "error:用户名不存在";
                    result = string.Format(result, 1002, "用户名不存在");
                }


            }
            catch (Exception ex)
            {
                result = string.Format(result, -1, ex.Message.ToString());
            }
            return Content(result);
        }

        public PartialViewResult LoginOut()
        {
            return PartialView();
        }

        [HttpPost]
        public ActionResult UserLoginOut()
        {
            var result = "{{\"code\":{0},\"data\":{{}},\"msg\":\"{1}\"}}";
            try
            {
                //Common.CookieHelp.RemoveCookie(Common.Config.CookieKey);
                HttpCookie cookie = new HttpCookie(Common.Config.CookieKey);
                cookie.Values.Add("Id", "");
                cookie.Expires = DateTime.Now.AddDays(-1);
                HttpContext.Response.Cookies.Add(cookie);
                result = string.Format(result, 0, "");

            }
            catch (Exception ex)
            {
                result = string.Format(result, -1, ex.Message.ToString());
            }
            return Content(result);
        }

    }
}