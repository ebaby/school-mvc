using DapperExtensions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace school.web.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        // GET: Admin/Home
        public ActionResult Index()
        {
            return View();
        }


        protected Server.MenuSvc menu_svc = new Server.MenuSvc();
        protected Server.SiteInfoSvc site_svc = new Server.SiteInfoSvc();


        public PartialViewResult AddEmployee(string Type, int EmployeeID)
        {
            ViewBag.OptType = Type;
            if (EmployeeID.Equals(0) == false)
            {
                //ViewBag.EmployeeModel = Common.MyConvert.DataTableToEntity<Domain.Employee>(Common.MSSqlHelper.GetDataTable(string.Format("SELECT TOP 1 * FROM Employee WHERE ID={0}", EmployeeID))); //helper.Get<Domain.Employee>(EmployeeID, null, null); 
            }
            return PartialView();
        }
        public PartialViewResult EmployeeQuery()
        {
            return PartialView();
        }
        public PartialViewResult AddMenu(string Type = "add", int MenuID = 0)
        {
            ViewBag.OptType = Type;
            if (MenuID.Equals(0) == false)
            {
                //ViewBag.MenuModel = Common.MyConvert.DataTableToEntity<Domain.Menu>(Common.MSSqlHelper.GetDataTable(string.Format("SELECT TOP 1 * FROM Menu WHERE ID={0}", MenuID))); // helper.Get<Domain.Menu>(MenuID, null, null); 
            }
            return PartialView();
        }

        public PartialViewResult MenuQuery()
        {
            return PartialView();
        }

        public ActionResult LoadEmployees()
        {
            string result = "error:";
            int totalCount;
            var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };

            //search
            //if (Request.Params["account"] != null && Request.Params["account"].ToString().Equals("") == false)
            //{
            //    predicates.Predicates.Add(Predicates.Field<Domain.Employee>(p => p.Account, Operator.Like, Request.Params["account"].ToString()));
            //}
            //if (Request.Params["sname"] != null && Request.Params["sname"].ToString().Equals("") == false)
            //{
            //    predicates.Predicates.Add(Predicates.Field<Domain.Employee>(p => p.RealName, Operator.Like, Request.Params["sname"].ToString()));
            //}

            //IList<ISort> list_sort = new List<ISort>();
            //ISort sort = new Sort() { Ascending = true, PropertyName = "ID" };
            //list_sort.Add(sort);
            //var list = emp_svc.GetPage(predicates, list_sort, int.Parse(Request.Params["page"]), int.Parse(Request.Params["rows"]), out totalCount);
            //if (list != null && list.Count() > 0)
            //{
            //    result = "{\"rows\":" + Newtonsoft.Json.JsonConvert.SerializeObject(list) + ",\"total\":" + totalCount + "}";
            //}
            //else
            //{
            //    //result = "error:暂无数据";
            //    result = "{\"rows\":[],\"total\":0}";
            //}
            return Content(result);
        }

        [HttpPost]
        public ActionResult Delete(string EmployeeID)
        {
            string result = "error:";
            //try
            //{
            //    var employee = helper.Get<Domain.Employee>(EmployeeID, null, null);
            //    employee.Status = -1;

            //    if (employee != null)
            //    {
            //        helper.RunInTransaction(() =>
            //        {
            //            helper.Update<Domain.Employee>(employee, null);

            //            result = "ok";
            //        });
            //    }
            //    else
            //    {
            //        result = "error:未找到该条记录";
            //    }

            //}
            //catch (Exception ex)
            //{
            //    result = "error:" + ex.Message.ToString();
            //}
            return Content(result);
        }

        [HttpPost]
        public ActionResult UpdatePwd(string NewPwd, string OldPwd)
        {
            string result = "error:";
            try
            {
                //var type = Request.Cookies[Common.Config.CookieKey].Values["type"].ToString();
                //if (type.Equals("0"))
                //{
                //    var entity = emp_svc.GetEntity(Request.Cookies[Common.Config.CookieKey].Values["Id"].ToString());
                //    if (entity != null)
                //    {
                //        if (Common.Utility.Md5(OldPwd) == entity.Password)
                //        {
                //            entity.Password = Common.Utility.Md5(NewPwd);                            
                //            if (emp_svc.Update(entity))
                //            {
                //                result = "ok";
                //            }
                //        }
                //        else {
                //            result = "error:输入的旧密码不正确";
                //        }
                //    }
                //}
                //else {                 
                //    var entity = shop_svc.GetEntity(Request.Cookies[Common.Config.CookieKey].Values["Id"].ToString());
                //    if (entity != null)
                //    {
                //        if (Common.Utility.Md5(OldPwd) == entity.Password)
                //        {
                //            entity.Password = Common.Utility.Md5(NewPwd);

                //            if (shop_svc.Update(entity))
                //            {
                //                result = "ok";
                //            }
                //        }
                //        else
                //        {
                //            result = "error:输入的旧密码不正确";
                //        }
                //    }
                //}
            }
            catch (Exception ex)
            {
                result = "error:" + ex.Message.ToString();
            }
            return Content(result);
        }


        public ActionResult LoadMenus()
        {
            string result = "{\"rows\":[],\"total\":0}";
            int totalCount;
            List<Hashtable> table = new List<Hashtable>();
            var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };

            //search
            if (Request.Params["menuname"] != null && Request.Params["menuname"].ToString().Equals("") == false)
            {
                predicates.Predicates.Add(Predicates.Field<Domain.Menu>(p => p.Name, Operator.Like, Request.Params["menuname"].ToString()));
            }
            if (Request.Params["pid"] != null && Request.Params["pid"].ToString().Equals("") == false)
            {
                predicates.Predicates.Add(Predicates.Field<Domain.Menu>(p => p.ParentID, Operator.Eq, Request.Params["pid"].ToString()));
            }
            else
            {
                predicates.Predicates.Add(Predicates.Field<Domain.Menu>(p => p.ParentID, Operator.Eq, Request.Params["parentid"]));
            }
            IList<ISort> list_sort = new List<ISort>();
            ISort sort = new Sort() { Ascending = true, PropertyName = "OrderID" };
            list_sort.Add(sort);
            var list = menu_svc.GetPage(predicates, list_sort, int.Parse(Request.Params["page"]), int.Parse(Request.Params["rows"]), out totalCount);
            if (list != null && list.Count() > 0)
            {
                foreach (var entity in list)
                {
                    Hashtable ht = new Hashtable();
                    System.Reflection.PropertyInfo[] properties = entity.GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
                    foreach (System.Reflection.PropertyInfo item in properties)
                    {
                        string name = item.Name;
                        object value = item.GetValue(entity, null);
                        if (item.PropertyType.IsValueType || item.PropertyType.Name.StartsWith("String"))
                        {
                            //tStr += string.Format("{0}:{1},", name, value);
                            ht.Add(name, value);
                        }
                        else
                        {
                            //getProperties(value);
                        }
                    }
                    //predicates.Predicates.Clear();
                    //predicates.Predicates.Add(Predicates.Field<Domain.Menu>(p => p.ParentID, Operator.Eq, entity.ID));
                    ht.Add("state", menu_svc.Count(Predicates.Field<Domain.Menu>(p => p.ParentID, Operator.Eq, entity.ID)) == 0 ? "open" : "closed");
                    //ht.Add("total", new FundRaising().GetRecordCount(p=>p.ParentID==entity.RaisingID));
                    table.Add(ht);

                }
                if (Request.QueryString["parentid"].Equals("0"))
                {
                    result = "{\"rows\":" + Newtonsoft.Json.JsonConvert.SerializeObject(table, Newtonsoft.Json.Formatting.None,
                                   new Newtonsoft.Json.JsonSerializerSettings
                                   {
                                       ContractResolver = new Common.LowercaseContractResolver()
                                   }) + ",\"total\":" + totalCount + "}";
                }
                else
                {
                    result = Newtonsoft.Json.JsonConvert.SerializeObject(table, Newtonsoft.Json.Formatting.None,
                                   new Newtonsoft.Json.JsonSerializerSettings
                                   {
                                       ContractResolver = new Common.LowercaseContractResolver()
                                   });
                }


            }
            else
            {
                //result = "error:暂无数据";
                result = "{\"rows\":[],\"total\":0}";
            }
            //result = string.Format(result, Newtonsoft.Json.JsonConvert.SerializeObject(list, Newtonsoft.Json.Formatting.None,
            //   new Newtonsoft.Json.JsonSerializerSettings
            //   {
            //       ContractResolver = new Common.LowercaseContractResolver()
            //   }), totalCount
            //    );
            return Content(result);
        }
        public string LoadRoles()
        {
            //var json = Common.MSSqlHelper.GetDataTable(string.Format("SELECT a.ID,a.Name,(case WHEN b.ID IS NULL THEN 0 ELSE 1 END) Checked FROM Role a LEFT join UserRole b ON  a.id=b.RoleID AND a.IsEnabled=1 AND UserID={0} AND UserType={1}", UserID, Type));
            string result = "error:";
            //List<Hashtable> table = new List<Hashtable>();
            //var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };
            //predicates.Predicates.Add(Predicates.Field<Domain.Role>(p => p.IsEnabled, Operator.Eq, 1));
            //var list = role_svc.GetList(predicates, new List<ISort> { Predicates.Sort<Domain.Role>(p => p.ID) }).Select(p => new { id=p.ID,name=p.Name});
            //if (list != null && list.Count() > 0)
            //{
            //    foreach (var entity in list)
            //    {
            //        Hashtable ht = new Hashtable();

            //        predicates.Predicates.Clear();
            //        predicates.Predicates.Add(Predicates.Field<Domain.UserRole>(p => p.UserType, Operator.Eq, Request.Params["type"].ToString()));
            //        predicates.Predicates.Add(Predicates.Field<Domain.UserRole>(p => p.UserID, Operator.Eq, Request.Params["userid"].ToString()));
            //        predicates.Predicates.Add(Predicates.Field<Domain.UserRole>(p => p.RoleID, Operator.Eq, entity.id));
            //        ht.Add("id", entity.id);
            //        ht.Add("name",entity.name);
            //        ht.Add("state", user_role_svc.Count(predicates) == 0 ? false : true);
            //        //ht.Add("total", new FundRaising().GetRecordCount(p=>p.ParentID==entity.RaisingID));
            //        table.Add(ht);

            //    }
            //    result = Newtonsoft.Json.JsonConvert.SerializeObject(table);
            //}


            return result;

        }

        public string GetMenuEntity()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(menu_svc.GetEntity(Request.Params["id"]), Newtonsoft.Json.Formatting.None,
                   new Newtonsoft.Json.JsonSerializerSettings
                   {
                       ContractResolver = new Common.LowercaseContractResolver()
                   });
        }

        public string GetEmployeeEntity()
        {
            return "";
            //Newtonsoft.Json.JsonConvert.SerializeObject(emp_svc.GetEntity(Request.Params["id"]), Newtonsoft.Json.Formatting.None,
            //   new Newtonsoft.Json.JsonSerializerSettings
            //   {
            //       ContractResolver = new Common.LowercaseContractResolver()
            //   });
        }

        public ActionResult GetParentMenus()
        {
            string result = "[]";
            var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };
            predicates.Predicates.Add(Predicates.Field<Domain.Menu>(p => p.ParentID, Operator.Eq, 0));

            IList<ISort> list_sort = new List<ISort>();
            ISort sort = new Sort() { Ascending = true, PropertyName = "OrderID" };
            list_sort.Add(sort);
            var list = menu_svc.GetList(predicates, list_sort).ToArray().Select(p => new { id = p.ID, text = p.Name });

            if (list != null && list.Count() > 0)
            {
                result = Newtonsoft.Json.JsonConvert.SerializeObject(list);
            }
            return Content(result);
        }

        public string GetAllMenus()
        {
            var uid = Request.Cookies[Common.Config.CookieKey].Values["Id"].ToString();
            //if (Request.Cookies[Common.Config.CookieKey].Values["type"].ToString().Equals("0"))
            //{
            //    var entity = emp_svc.GetEntity(uid);
            //    if (entity != null)
            //    {
            //        if (entity.IsAdmin == 0)
            //        {
            //            strWhere.AppendFormat(" and id in(select menuid from RoleMenu a inner join UserRole b ON  a.roleid=b.roleid  inner join role c on a.RoleID=c.id and b.roleid=c.id INNER JOIN menu d ON a.MenuID=d.ID WHERE  UserID={0} and UserType=0  and a.SourceType=0 AND c.IsEnabled=1 AND d.IsEnabled=1 AND d.IsVisible=1)", uid);
            //        }
            //    }
            //}
            //else
            //{
            //    strWhere.AppendFormat(" and id in(select menuid from RoleMenu a inner join UserRole b ON  a.roleid=b.roleid  inner join role c on a.RoleID=c.id and b.roleid=c.id INNER JOIN Menu d ON a.Menuid=d.ID WHERE  UserID={0} and UserType=1 AND a.SourceType=0 AND c.IsEnabled=1 AND d.IsEnabled=1 AND d.IsVisible=1)", uid);
            //}

            //LoadTree(0);
            return json.ToString();
        }

        [HttpPost]
        public ActionResult SaveMenu()
        {
            var result = "{{\"code\":{0},\"data\":{{}},\"msg\":\"{1}\"}}";
            try
            {
                if (Request.Params["menuid"].ToString().Equals("0"))
                {
                    var menu = new Domain.Menu
                    {
                        Name = Request.Params["name"].ToString(),
                        ParentID = Convert.ToInt32(Request.Params["parentid"].ToString()),
                        OrderID = string.IsNullOrEmpty(Request.Params["orderid"].ToString()) ? 0 : Convert.ToInt32(Request.Params["orderid"].ToString()),
                        Icon = Request.Params["icon"].ToString(),
                        UrlPath = Request.Params["path"].ToString(),
                        IsVisible = Convert.ToInt32(Request.Params["isvisible"].ToString()),
                        IsEnabled = Convert.ToInt32(Request.Params["isenabled"].ToString()),
                        HasArticle = Convert.ToInt32(Request.Params["hasarticle"].ToString()),
                        CreateUser = 1,//Convert.ToInt32(Request.Cookies[Common.Config.CookieKey].Values["Id"].ToString()),
                        CreateTime = DateTime.Now,
                        UpdateUser = 1,//Convert.ToInt32(Request.Cookies[Common.Config.CookieKey].Values["Id"].ToString()),
                        UpdateTime = DateTime.Now,
                        Remark = Request.Params["remark"].ToString(),
                        //SourceType = Convert.ToInt32(Request.Params["sourcetype"].ToString())

                    };

                    object obj = menu_svc.Insert(menu);
                    if ((int)obj > 0)
                    {
                        result = string.Format(result, 0, "");
                        //System.Web.HttpContext.Current.Application["menu"] = Models.MenuCache.AsyncTree();
                    }
                }
                else
                {
                    var menu = menu_svc.GetEntity(Request.Params["menuid"].ToString());
                    menu.Name = Request.Params["name"].ToString();
                    menu.ParentID = Convert.ToInt32(Request.Params["parentid"].ToString());
                    menu.OrderID = string.IsNullOrEmpty(Request.Params["orderid"].ToString()) ? 0 : Convert.ToInt32(Request.Params["orderid"].ToString());
                    menu.Icon = Request.Params["icon"].ToString();
                    menu.UrlPath = Request.Params["path"].ToString();
                    menu.IsVisible = Convert.ToInt32(Request.Params["isvisible"].ToString());
                    menu.IsEnabled = Convert.ToInt32(Request.Params["isenabled"].ToString());
                    menu.HasArticle = Convert.ToInt32(Request.Params["hasarticle"].ToString());
                    menu.UpdateTime = DateTime.Now;
                    menu.UpdateUser = 1;//Convert.ToInt32(Request.Cookies[Common.Config.CookieKey].Values["Id"].ToString());
                    menu.Remark = Request.Params["remark"].ToString();
                    //menu.SourceType = Convert.ToInt32(Request.Params["sourcetype"].ToString());


                    var obj = menu_svc.Update(menu);
                    if (obj)
                    {
                        result = string.Format(result, 0, "");
                        //System.Web.HttpContext.Current.Application["menu"] = Models.MenuCache.AsyncTree();
                    }
                }
            }
            catch (Exception ex)
            {
                result = string.Format(result, -1, ex.Message.ToString());
            }
            return Content(result);
        }

        [HttpPost]
        public ActionResult DeleteMenu()
        {            
            Common.ApiResult result = new Common.ApiResult();
            result.code =- 1;
            try
            {
                if (Request.Params["menuid"].ToString().Equals("0")==false)
                {
                    var menu = menu_svc.GetEntity(Request.Params["menuid"].ToString());
                    menu.Status = 0;

                    //if (menu_svc.Update(menu))
                    if (menu_svc.Delete(menu))
                    {
                        result.code = 0;
                    }
                }
            }
            catch (Exception ex)
            {
                result .msg=  ex.Message.ToString();
            }
            return Content(Newtonsoft.Json.JsonConvert.SerializeObject(result, Newtonsoft.Json.Formatting.None,
               new Newtonsoft.Json.JsonSerializerSettings
               {
                   ContractResolver = new Common.LowercaseContractResolver()
               }));
        }

        [HttpPost]
        public ActionResult SaveEmployee()
        {
            string result = "ok";
            try
            {
                if (Request.Params["employeeid"].ToString().Equals("0"))
                {
                    if (Request.Params["account"] != null)
                    {
                        //var count = emp_svc.Count(Predicates.Field<Domain.Employee>(p => p.Account, Operator.Eq, Request.Params["account"].ToString()));

                        //if (count > 0)
                        //{
                        //    result = "error:账号不能重复，请重新填写";
                        //}
                    }
                    else
                    {
                        //var employee = new Domain.Employee
                        //{
                        //    Account = Request.Params["account"].ToString()
                        //    ,
                        //    Password = Common.Utility.Md5("123456")
                        //    ,
                        //    Mobile = Request.Params["mobile"].ToString()
                        //    ,
                        //    RealName = Request.Params["realname"].ToString()
                        //    ,
                        //    Email = Request.Params["email"].ToString()
                        //    ,
                        //    Status = 1
                        //    ,
                        //    CreateTime = DateTime.Now
                        //    ,
                        //    LastLoginTime = DateTime.Now
                        //    ,
                        //    LoginCount = 0
                        //    ,
                        //    IsAdmin = 0

                        //};

                        //var obj = emp_svc.Insert(employee);
                        //if (obj > 0)
                        //{
                        //    result = "ok";
                        //}
                    }
                }
                else
                {
                    //var employee = emp_svc.GetEntity(Request.Params["employeeid"].ToString());
                    //employee.RealName = Request.Params["realname"].ToString();
                    //employee.Mobile = Request.Params["mobile"].ToString();
                    //employee.Email = Request.Params["email"].ToString();

                    //if (emp_svc.Update(employee))
                    //{
                    //    result = "ok";
                    //}
                }

            }
            catch (Exception ex)
            {
                result = "error:" + ex.Message.ToString();
            }
            return Content(result);
        }

        StringBuilder json = new StringBuilder();
        StringBuilder strWhere = new StringBuilder();
        private void LoadTree(Int32 ParentID)   //加载所有分类
        {
            string querySql = string.Format("SELECT * FROM  Menu  WHERE SourceType=0 AND ParentID={0} AND Status=1 {1} ORDER BY OrderID ", ParentID, strWhere.ToString());
            //var list = repos_svc.GetList(querySql);
            //if (list != null && list.Count() > 0)
            //{
            //    foreach (var entity in list)
            //    {
            //        if (entity.ParentID.ToString().Equals("0"))
            //        {
            //            json.Append("<div class=\"collapsed\">");
            //            json.AppendFormat("<span>{0}</span>", entity.Name.ToString());

            //        }
            //        else
            //        {
            //            json.AppendFormat("<a href=\"javascript:void(null)\" onclick=\"LinkContent('{0}','');setMenu(this)\">{1}</a> ", entity.UrlPath, entity.Name);
            //        }
            //        LoadTree(Convert.ToInt32(entity.ID));

            //        if (entity.ParentID.ToString().Equals("0"))
            //        {
            //            json.Append("</div>");
            //        }

            //    }
            //}
        }

        [HttpPost]
        public ActionResult LoadSiteInfo()
        {
            var result = "{{\"code\":{0},\"data\":{1},\"msg\":\"{2}\"}}";

            var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };

            IList<ISort> list_sort = new List<ISort>();
            ISort sort = new Sort() { Ascending = true, PropertyName = "ID" };
            list_sort.Add(sort);
            var list = site_svc.GetList(predicates, list_sort);
            if (list != null && list.Count() > 0)
            {

                result = string.Format(result, 0,
                     Newtonsoft.Json.JsonConvert.SerializeObject(list.FirstOrDefault(), Newtonsoft.Json.Formatting.None,
                           new Newtonsoft.Json.JsonSerializerSettings
                           {
                               ContractResolver = new Common.LowercaseContractResolver()
                           })
                     , ""
                     );

            }
            else
            {
                result = string.Format(result, -2, "{{}}", "");
            }

            return Content(result);
        }

        [HttpPost]
        public ActionResult SaveSite()
        {
            var result = "{{\"code\":{0},\"data\":{{}},\"msg\":\"{1}\"}}";
            try
            {
                if (Request.Params["id"].ToString().Equals("0"))
                {
                    var site = new Domain.SiteInfo
                    {
                        Phone = Request.Params["phone"].ToString(),
                        Email = Request.Params["email"].ToString(),
                        Address = Request.Params["address"].ToString(),
                        CreateTime = DateTime.Now,
                        UpdateTime = DateTime.Now,

                    };

                    object obj = site_svc.Insert(site);
                    if ((int)obj > 0)
                    {
                        result = string.Format(result, 0, "");
                        //System.Web.HttpContext.Current.Application["menu"] = Models.MenuCache.AsyncTree();
                    }
                }
                else
                {
                    var site = site_svc.GetEntity(Request.Params["id"].ToString());
                    site.Phone = Request.Params["phone"].ToString();
                    site.Email = Request.Params["email"].ToString();
                    site.Address = Request.Params["address"].ToString();
                    site.UpdateTime = DateTime.Now;

                    var obj = site_svc.Update(site);
                    if (obj)
                    {
                        result = string.Format(result, 0, "");
                        //System.Web.HttpContext.Current.Application["menu"] = Models.MenuCache.AsyncTree();
                    }
                }
            }
            catch (Exception ex)
            {
                result = string.Format(result, -1, ex.Message.ToString());
            }
            return Content(result);
        }


    }
}