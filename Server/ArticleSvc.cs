using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DapperExtensions;
using Domain;

namespace Server
{
    public class ArticleSvc
    {
        private Dao.ArticleDao dao = new Dao.ArticleDao();

        public IEnumerable<Article> GetList(object predicate, IList<ISort> sort)
        {
            return dao.GetList(predicate, sort);
        }

        public dynamic Insert(Article entity)
        {
            return dao.Insert(entity);
        }
        public bool Update(Article entity)
        {
            return dao.Update(entity);
        }

        public int Count(object predicate)
        {
            return dao.Count(predicate);
        }

        public Article GetEntity(dynamic id)
        {
            return dao.Get(id);
        }

        public IEnumerable<Article> GetPage(object predicate, IList<ISort> sort, int page, int resultsPerPage,out int totalCount)
        {
            totalCount = dao.Count(predicate);
            return dao.GetPage(predicate, sort, page, resultsPerPage);
        }

    }
}
