using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DapperExtensions;
using Domain;

namespace Dao
{
    public class ArticleDao
    {
        private Common.DapperHelper helper = Common.DapperHelper.Instance;

        public IEnumerable<Article> GetList(object predicate, IList<ISort> sort)
        {
            return helper.GetList<Article>(predicate, sort, null, true);
        }

        public dynamic Insert(Article entity)
        {
            return helper.Insert<Article>(entity, 0);
        }

        public dynamic InsertTrans(Article entity)
        {
            return helper.InsertTrans<Article>(entity, 0);
        }
        public bool Update(Article entity)
        {
            return helper.Update<Article>(entity, 0);
        }

        public dynamic UpdateTrans(Article entity)
        {
            return helper.UpdateTrans<Article>(entity, 0);
        }

        public int Count(object predicate)
        {
            return helper.Count<Article>(predicate, 0);
        }

        public Article Get(dynamic id)
        {
            return helper.Get<Article>(id, 0);
        }

        public IEnumerable<Article> GetPage(object predicate, IList<ISort> sort, int page, int resultsPerPage)
        {
            return helper.GetPage<Article>(predicate, sort, page-1, resultsPerPage, 0, true);
        }
    }
}
