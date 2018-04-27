using DapperExtensions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace school.web.Areas.Admin.Controllers
{
    public class ArticleController : Controller
    {
        // GET: Admin/Article
        public ActionResult Index()
        {
            return View();
        }


        protected Server.ArticleSvc article_svc = new Server.ArticleSvc();
        protected Server.MenuSvc menu_svc = new Server.MenuSvc();
        protected Server.ArticleImageSvc img_svc = new Server.ArticleImageSvc();

        public PartialViewResult AddArticle()
        {
            ViewBag.Type = Request.Params["type"].ToString();
            //if (ArticleID.Equals(0) == false)
            //{
            //    Domain.Article amodel = Common.MyConvert.DataTableToEntity<Domain.Article>(Common.MSSqlHelper.GetDataTable(string.Format("SELECT TOP 1 * FROM Article WHERE ID={0}", ArticleID))); //Common.DapperHelper.CreateInstance().Get<Domain.Article>(ArticleID, null, null);
            //    ViewBag.ArticleModel = amodel;
            //}
            //ViewBag.ArticleCategory =( from i in  Common.DapperHelper.CreateInstance().GetList<Domain.ArticleCategory>(null, null,null,true)
            //                               select i
            //                               ).ToArray();

            ViewBag.ArticleID = Request.Params["id"].ToString();
            //ViewBag.ImageUrl = Common.Config.ImageUrl;
            return PartialView();
        }
        public PartialViewResult ArticleCategory()
        {
            return PartialView();
        }
        public PartialViewResult ArticleViews()
        {
            //ViewBag.ArticleCategory = (from i in Common.DapperHelper.CreateInstance().GetList<Domain.ArticleCategory>(null,  null, null, true)
            //                           select i
            //                                  ).ToArray();
            return PartialView();
        }

        [HttpPost]
        public ActionResult SaveArticle()
        {
            var result = "{{\"code\":{0},\"data\":{{}},\"msg\":\"{1}\"}}";
            try
            {
                if (Request.Params["articleid"].ToString().Equals("0"))
                {
                    int totalCount;
                    var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };

                    IList<ISort> list_sort = new List<ISort>();
                    ISort sort = new Sort() { Ascending = false, PropertyName = "ID" };
                    list_sort.Add(sort);
                    var articleid = (int)(from i in article_svc.GetPage(predicates, list_sort, 1, 1, out totalCount)
                                          select i.ID).DefaultIfEmpty().Max() + 1;

                    var article = new Domain.Article
                    {
                        ID = articleid,
                        Author = "",
                        Name = Request.Params["name"].ToString(),
                        KeyString = "",
                        ImageUrl = string.IsNullOrEmpty(Request.Params["images"].ToString()) ? "" : Request.Params["images"].ToString(),
                        BgImageUrl = "",
                        CreateTime = DateTime.Now,
                        Abstract = "",
                        Content = string.IsNullOrEmpty(Request.Params["content"].ToString()) ? "" : HttpUtility.UrlDecode(Request.Params["content"].ToString()),
                        ReferralsSort = 0,
                        PreviewNumber = 0,
                        UpdateTime = DateTime.Now,
                        Remark = "",
                        OrderID = string.IsNullOrEmpty(Request.Params["orderid"].ToString()) ? 1 : Convert.ToInt32(Request.Params["orderid"].ToString()),
                        MenuID = Convert.ToInt32(Request.Params["menuid"].ToString()),
                        Status = 1,
                        ArticleType = Convert.ToInt32(Request.Params["articletype"].ToString()),

                    };

                    object obj = article_svc.Insert(article);
                    if ((int)obj > 0)
                    {
                        //if (Request.Params["images"] != null && Request.Params["images"].ToString().Equals("") == false)
                        //{
                        //    HashSet<string> set = new HashSet<string>();
                        //    foreach (var i in Request.Params["images"].ToString().Split(','))
                        //    {
                        //        //set.Add(i.ToString().Trim('"'));
                        //        //}

                        //        //foreach (string s in set)
                        //        //{
                        //        //foreach (var url in s.Split(','))
                        //        //{
                        //        var articleImage = new Domain.ArticleImage
                        //        {
                        //            ArticleID = (int)obj,
                        //            Name = "",
                        //            ImageUrl = Common.Config.ImageUrl + i,
                        //            Status = 1,
                        //            CreateTime = DateTime.Now,
                        //            Remark = ""
                        //        };
                        //        obj = img_svc.Insert(articleImage);
                        //        //}
                        //    }

                        //}

                        result = string.Format(result, 0, "");
                        //System.Web.HttpContext.Current.Application["menu"] = Models.MenuCache.AsyncTree();
                    }
                }
                else
                {
                    var article = article_svc.GetEntity(Convert.ToInt32(Request.Params["articleid"].ToString()));
                    article.Name = Request.Params["name"].ToString();
                    if (Request.Params["articletype"].ToString().Equals("0"))
                    {
                        article.Content = string.IsNullOrEmpty(Request.Params["content"].ToString()) ? "" : HttpUtility.UrlDecode(Request.Params["content"].ToString());
                    }
                    else
                    {
                        article.ImageUrl = string.IsNullOrEmpty(Request.Params["images"].ToString()) ? "" : Request.Params["images"].ToString();
                    }

                    article.OrderID = string.IsNullOrEmpty(Request.Params["orderid"].ToString()) ? 1 : Convert.ToInt32(Request.Params["orderid"].ToString());
                    article.UpdateTime = DateTime.Now;
                    article.MenuID = Convert.ToInt32(Request.Params["menuid"].ToString());

                    var obj = article_svc.Update(article);
                    if (obj)
                    {
                        //    if (Request.Params["images"] != null && Request.Params["images"].ToString().Equals("") == false)
                        //    {
                        //        HashSet<string> set = new HashSet<string>();
                        //        foreach (var i in Request.Params["images"].ToString().Split(','))
                        //        {
                        //            //set.Add(i.ToString().Trim('"'));
                        //            //}

                        //            //foreach (string s in set)
                        //            //{
                        //            //foreach (var url in s.Split(','))
                        //            //{
                        //            var articleImage = new Domain.ArticleImage
                        //            {
                        //                ArticleID = article.ID,
                        //                Name = "",
                        //                ImageUrl = Common.Config.ImageUrl + i,
                        //                Status = 1,
                        //                CreateTime = DateTime.Now,
                        //                Remark = ""
                        //            };
                        //            obj = img_svc.Insert(articleImage);
                        //            //}
                        //        }

                        //    }
                        //    else {
                        //        var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };
                        //        predicates.Predicates.Add(Predicates.Field<Domain.ArticleImage>(p => p.ArticleID, Operator.Eq, article.ID));
                        //        img_svc.Delete(predicates);
                        //    }


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
        public ActionResult LoadArticles()
        {
            string result = "{\"rows\":[],\"total\":0}";
            try
            {
                int totalCount;
                List<Hashtable> table = new List<Hashtable>();
                IList<ISort> list_sort = new List<ISort>();
                ISort sort = new Sort() { Ascending = false, PropertyName = "CreateTime" };
                list_sort.Add(sort);
                var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };
                if (Request.Params["categoryid"] != null)
                {
                    predicates.Predicates.Add(Predicates.Field<Domain.Article>(p => p.MenuID, Operator.Eq, Request.Params["categoryid"]));
                }
                var list = article_svc.GetPage(predicates, list_sort, int.Parse(Request.Params["page"]), int.Parse(Request.Params["rows"]), out totalCount);
                if (list != null && list.Count() > 0)
                {
                    foreach (var entity in list)
                    {
                        Hashtable ht = new Hashtable();
                        ht.Add("id", entity.ID);
                        ht.Add("name", entity.Name);
                        ht.Add("menuname", GetMenu(entity.MenuID).Name);
                        ht.Add("content", entity.Content);
                        ht.Add("status", entity.Status);
                        ht.Add("createtime", entity.CreateTime.ToString("yyyy-MM-dd HH:mm:ss"));

                        table.Add(ht);
                    }
                    result = "{\"rows\":" + Newtonsoft.Json.JsonConvert.SerializeObject(table) + ",\"total\":" + totalCount + "}";
                }
                else
                {
                    result = "{\"rows\":[],\"total\":0}";
                }

            }
            catch (Exception ex)
            {
                result = string.Format(result, -2, "{{}}", "");
            }
            return Content(result);
        }
        [HttpPost]
        public ActionResult SetStatus(string ArticleID, string status)
        {
            Common.ApiResult result = new Common.ApiResult();
            result.code = -1;
            try
            {
                var article = article_svc.GetEntity(ArticleID);
                if (article != null)
                {
                    article.Status = Convert.ToInt32(status);

                    bool flag = article_svc.Update(article);
                    if (flag)
                    {
                        result.code = 0;
                    }
                    else
                    {
                        result.msg = "更新失败";
                    }
                }
                else
                {
                    result.msg = "未找到该条记录";
                }


            }
            catch (Exception ex)
            {
                result.msg =  ex.Message.ToString();
            }
            return Content(Newtonsoft.Json.JsonConvert.SerializeObject(result, Newtonsoft.Json.Formatting.None,
               new Newtonsoft.Json.JsonSerializerSettings
               {
                   ContractResolver = new Common.LowercaseContractResolver()
               }));
        }
        [HttpPost]
        public ActionResult DeleteProduct(string ArticleID)
        {
            string result = "error:";
            try
            {
                //var article = Common.DapperHelper.CreateInstance().Get<Domain.Article>(ArticleID, null, null);                

                //if (article != null)
                //{
                //    article.Status = -1;
                //    Common.DapperHelper.CreateInstance().RunInTransaction(() =>
                //    {
                //        Common.DapperHelper.CreateInstance().Update<Domain.Article>(article, null);

                //        result = "ok";
                //    });
                //}
                //else
                //{
                //    result = "error:未找到该条记录";
                //}

            }
            catch (Exception ex)
            {
                result = "error:" + ex.Message.ToString();
            }
            return Content(result);
        }

        [HttpPost]
        public ActionResult LoadArticleCategories()
        {
            string result = "[]";

            var predicates = new PredicateGroup { Operator = GroupOperator.And, Predicates = new List<IPredicate>() };
            predicates.Predicates.Add(Predicates.Field<Domain.Menu>(p => p.ParentID, Operator.Eq, 0));
            predicates.Predicates.Add(Predicates.Field<Domain.Menu>(p => p.HasArticle, Operator.Eq, 1));

            IList<ISort> list_sort = new List<ISort>();
            ISort sort = new Sort() { Ascending = true, PropertyName = "OrderID" };
            list_sort.Add(sort);
            var list = menu_svc.GetList(predicates, list_sort).Select(p => new { id = p.ID, text = p.Name });
            if (list != null && list.Count() > 0)
            {
                result = Newtonsoft.Json.JsonConvert.SerializeObject(list);
            }
            return Content(result);
        }

        private Domain.Menu GetMenu(int id)
        {
            return menu_svc.GetEntity(id);
        }

        [HttpPost]
        public string LoadArticleEntity()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(article_svc.GetEntity(Request.Params["id"]), Newtonsoft.Json.Formatting.None,
               new Newtonsoft.Json.JsonSerializerSettings
               {
                   ContractResolver = new Common.LowercaseContractResolver()
               });
        }

        [HttpPost]
        public ActionResult LoadImages()
        {
            string result = "{{\"code\":{0},\"data\":{1},\"msg\":\"{2}\"}}";
            try
            {
                var list = img_svc.GetList(Predicates.Field<Domain.ArticleImage>(p => p.ArticleID, Operator.Eq, Request.Params["articleid"].ToString()), new List<ISort> { Predicates.Sort<Domain.ArticleImage>(p => p.ID) }).Select(p => new
                {
                    //id = p.ID,
                    // path = 
                    p.ImageUrl
                });


                //if (list != null && list.Count() > 0)
                {
                    result = string.Format(result, 0, Newtonsoft.Json.JsonConvert.SerializeObject(list), "");
                }

            }
            catch (Exception ex)
            {
                result = string.Format(result, -1, "{}", ex.Message.ToString());
            }
            return Content(result);
        }


        [HttpPost]
        public ActionResult UpLoadImage()
        {
            string result = "";
            int code = 0;
            string pathUrl = "";
            try
            {
                string serverPath = System.Web.HttpContext.Current.Server.MapPath("~\\UPFiles\\");//Common.Config.ImagePath;//
                HttpPostedFileBase hp = Request.Files["file"];
                string fileNamePath = hp.FileName;// context.Request.Files[0].FileName;
                string folder = DateTime.Now.ToString("yyyy") + DateTime.Now.ToString("MM") + DateTime.Now.ToString("dd");// hp["type"];

                string imgPath = serverPath + folder + "\\"; //serverPath+ @"UPFiles\" + folder + "\\";//
                if (!System.IO.Directory.Exists(imgPath))
                {
                    System.IO.Directory.CreateDirectory(imgPath);
                }
                string toFilePath = Path.Combine(serverPath, imgPath);

                //获取要保存的文件信息
                FileInfo file = new FileInfo(fileNamePath);
                //获得文件扩展名
                string fileNameExt = file.Extension;

                //验证合法的文件
                if (CheckImageExt(fileNameExt))
                {
                    //生成将要保存的随机文件名
                    string fileName = GetImageName() + fileNameExt;

                    //获得要保存的文件路径
                    string serverFileName = toFilePath + fileName;
                    //物理完整路径                    
                    string toFileFullPath = serverFileName;

                    //将要保存的完整文件名                
                    string toFile = toFileFullPath;//+ fileName;

                    ///创建WebClient实例       
                    WebClient myWebClient = new WebClient();
                    //设定windows网络安全认证   方法1
                    myWebClient.Credentials = CredentialCache.DefaultCredentials;
                    ////设定windows网络安全认证   方法2

                    hp.SaveAs(toFile);

                    string relativePath = string.Format(@"/UPFiles/" + folder + "/{0}", fileName); // Common.Config.ImageUrl + folder + "/" + fileName;  //

                    //result = relativePath;// Common.JsonHelper.GetMessage(true, relativePath); 
                    pathUrl = relativePath;

                }
                else
                {
                    throw new Exception("文件格式非法，请上传gif或jpg格式的文件。");
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
                code = -1;
            }

            return Json(new
            {
                path = pathUrl,
                code = code
            });
        }
        /// <summary>
        /// 检查是否为合法的上传图片
        /// </summary>
        /// <param name="_fileExt"></param>
        /// <returns></returns>
        private bool CheckImageExt(string _ImageExt)
        {
            string[] allowExt = new string[] { ".gif", ".jpg", ".jpeg", ".bmp", ".png" };
            for (int i = 0; i < allowExt.Length; i++)
            {
                if (allowExt[i] == _ImageExt) { return true; }
            }
            return false;

        }
        private string GetImageName()
        {
            Random rd = new Random();
            StringBuilder serial = new StringBuilder();
            serial.Append(DateTime.Now.ToString("yyyyMMddHHmmssff"));
            serial.Append(rd.Next(0, 999999).ToString());
            return serial.ToString();

        }


    }
}