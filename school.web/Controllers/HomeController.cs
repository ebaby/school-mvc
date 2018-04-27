using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Text;
using DapperExtensions;
using Dapper;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;


namespace school.web.Controllers
{
    //[Authorization]
    public class HomeController : Controller
    {
        protected Server.MenuSvc menu_svc = new Server.MenuSvc();
        protected Server.SiteInfoSvc site_svc = new Server.SiteInfoSvc();
        protected Server.ArticleSvc article_svc = new Server.ArticleSvc();

        //private IArticleRepository service = new ArticleRepository();

        public ActionResult Index()
        {
            return View();
        }
        public PartialViewResult Detail()
        {
            ViewBag.id = Request.Params["id"];
            return PartialView();
        }

        public ActionResult About()
        {
            ViewBag.Message = "你的应用程序说明页。";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "你的联系方式页。";

            return View();
        }

        [HttpPost]
        public ActionResult LoadMenus()
        {
            var result = "{{\"code\":{0},\"data\":{1},\"msg\":\"{2}\"}}";

            var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };
            predicates.Predicates.Add(Predicates.Field<Domain.Menu>(p => p.ParentID, Operator.Eq, 0));
            predicates.Predicates.Add(Predicates.Field<Domain.Menu>(p => p.IsEnabled, Operator.Eq, 1));
            predicates.Predicates.Add(Predicates.Field<Domain.Menu>(p => p.IsVisible, Operator.Eq, 1));
            IList<ISort> list_sort = new List<ISort>();
            ISort sort = new Sort() { Ascending = true, PropertyName = "OrderID" };
            list_sort.Add(sort);
            var list = menu_svc.GetList(predicates, list_sort);
            if (list!=null && list.Count() > 0)
            {

                result = string.Format(result, 0,
                        Newtonsoft.Json.JsonConvert.SerializeObject(list, Newtonsoft.Json.Formatting.None,
                                       new Newtonsoft.Json.JsonSerializerSettings
                                       {
                                           ContractResolver = new Common.LowercaseContractResolver()
                                       }), ""
                        );

            }
            else {
                result = string.Format(result, 0,"[]", "");
            }
            return Content(result);
        }

        [HttpPost]
        public ActionResult LoadLeftMenus()
        {
            var result = "{{\"code\":{0},\"data\":{1},\"msg\":\"{2}\"}}";

            var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };
            predicates.Predicates.Add(Predicates.Field<Domain.Menu>(p => p.ParentID, Operator.Eq, 1009));

            IList<ISort> list_sort = new List<ISort>();
            ISort sort = new Sort() { Ascending = true, PropertyName = "OrderID" };
            list_sort.Add(sort);
            var list = menu_svc.GetList(predicates, list_sort);
            if (list!=null && list.Count() > 0)
            {

                result = string.Format(result, 0,
                        Newtonsoft.Json.JsonConvert.SerializeObject(list, Newtonsoft.Json.Formatting.None,
                                       new Newtonsoft.Json.JsonSerializerSettings
                                       {
                                           ContractResolver = new Common.LowercaseContractResolver()
                                       }), ""
                        );

            }
            else {
                result = string.Format(result, 0,"[]", "");
            }
            return Content(result);
        }

        [HttpPost]
        public ActionResult LoadMenuEntity()
        {
            var result = "{{\"code\":{0},\"data\":{1},\"msg\":\"{2}\"}}";
            result = string.Format(result,0,
                Newtonsoft.Json.JsonConvert.SerializeObject(menu_svc.GetEntity(Request.Params["id"]), Newtonsoft.Json.Formatting.None,
                   new Newtonsoft.Json.JsonSerializerSettings
                   {
                       ContractResolver = new Common.LowercaseContractResolver()
                   })
                , "");

            

            return Content(result);
        }

        [HttpPost]
        public ActionResult LoadMenuInfo()
        {
            var result = "{{\"code\":{0},\"data\":{1},\"msg\":\"{2}\"}}";

            var predicates = new PredicateGroup { Operator = GroupOperator.Or, Predicates = new List<IPredicate>() };
            var menuids = Request.Params["menuids"];
            if (menuids != null) {
                foreach (string id in menuids.Split(','))
                {
                    predicates.Predicates.Add(Predicates.Field<Domain.Menu>(p => p.ID, Operator.Eq, id));
                }
            }
            
            IList<ISort> list_sort = new List<ISort>();
            ISort sort = new Sort() { Ascending = true, PropertyName = "OrderID" };
            list_sort.Add(sort);
            var list = menu_svc.GetList(predicates, list_sort);
                        
            result = string.Format(result,0,
                Newtonsoft.Json.JsonConvert.SerializeObject(list, Newtonsoft.Json.Formatting.None,
                   new Newtonsoft.Json.JsonSerializerSettings
                   {
                       ContractResolver = new Common.LowercaseContractResolver()
                   })
                , "");

            

            return Content(result);
        }

        [HttpPost]
        public ActionResult LoadArticleList()
        {
            var result = "{{\"code\":{0},\"data\":{1},\"msg\":\"{2}\"}}";
            int totalCount;

            //Pagination pagination = new Pagination();
            //pagination.page = 1;
            //pagination.rows = 8;
            //pagination.sord = "asc";
            //pagination.sidx = "";
            //pagination.records = 0;
            //var expression = ExtLinq.True<Article>();
            //expression = expression.And(t => t.MenuID == Convert.ToInt32(Request.Params["menuid"]));
            //var list  = service.FindList(expression, pagination);

            var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };
            predicates.Predicates.Add(Predicates.Field<Domain.Article>(p => p.MenuID, Operator.Eq, Request.Params["menuid"]));
            IList<ISort> list_sort = new List<ISort>();
            ISort sort = new Sort() { Ascending = false, PropertyName = "UpdateTime" };
            list_sort.Add(sort);
            var list = article_svc.GetPage(predicates, list_sort, 1, 8, out totalCount);

            result = string.Format(result,0,
                Newtonsoft.Json.JsonConvert.SerializeObject(list, Newtonsoft.Json.Formatting.None,
                   new Newtonsoft.Json.JsonSerializerSettings
                   {
                       ContractResolver = new Common.LowercaseContractResolver()
                   })
                , "");

            

            return Content(result);
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
            else {
                result = string.Format(result, -2, "{{}}", "");
            }

            return Content(result);
        }

        [HttpPost]
        public ActionResult LoadArticles()
        {
            var result = "{{\"code\":{0},\"data\":{1},\"msg\":\"{2}\"}}";

            var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };
            predicates.Predicates.Add(Predicates.Field<Domain.Article>(p => p.MenuID, Operator.Eq, Request.Params["menuid"]));

            IList<ISort> list_sort = new List<ISort>();
            ISort sort = new Sort() { Ascending = false, PropertyName = "OrderID" };
            list_sort.Add(sort);
            var list = article_svc.GetList(predicates, list_sort);
            if (list != null && list.Count() > 0)
            {

                result = string.Format(result, 0,
                        Newtonsoft.Json.JsonConvert.SerializeObject(list, Newtonsoft.Json.Formatting.None,
                                       new Newtonsoft.Json.JsonSerializerSettings
                                       {
                                           ContractResolver = new Common.LowercaseContractResolver()
                                       }), ""
                        );

            }
            else {
                result = string.Format(result, 0, "[]", "");
            }
            return Content(result);
        }

        [HttpPost]
        public ActionResult LoadArticleEntity()
        {
            var result = "{{\"code\":{0},\"data\":{1},\"msg\":\"{2}\"}}";

            result = string.Format(result,0,
                Newtonsoft.Json.JsonConvert.SerializeObject(article_svc.GetEntity(Request.Params["id"]), Newtonsoft.Json.Formatting.None,
                   new Newtonsoft.Json.JsonSerializerSettings
                   {
                       ContractResolver = new Common.LowercaseContractResolver()
                   })
                , "");

            

            return Content(result);
        }

        public FileContentResult GetImgCode()
        {
            //string code = GetRndStr();
            string code = Models.CreateCheckCodeImage.GetNumAndStr(4);
            byte[] imageByte;
            using (Bitmap img = Models.CreateCheckCodeImage.CreateImages(code, "ch"))
            {
                imageByte = BitmapToByte(img);
                Session["validate"] = code;
            }
            return File(imageByte, "image/png");
        }
        public static byte[] BitmapToByte(Bitmap bitmap)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                bitmap.Save(stream, ImageFormat.Jpeg);
                byte[] data = new byte[stream.Length];
                stream.Seek(0, SeekOrigin.Begin);
                stream.Read(data, 0, Convert.ToInt32(stream.Length));
                return data;
            }
        }

    }
}
