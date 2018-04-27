using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DapperExtensions;
using Domain;

namespace Server
{
    public class ArticleImageSvc
    {
        private Dao.ArticleImageDao dao = new Dao.ArticleImageDao();

        public IEnumerable<ArticleImage> GetList(object predicate, IList<ISort> sort)
        {
            return dao.GetList(predicate, sort);
        }

        public dynamic Insert(ArticleImage entity)
        {
            return dao.Insert(entity);
        }

        public int Count(object predicate)
        {
            return dao.Count(predicate);
        }


        public bool Delete(object predicate)
        {
            return dao.Delete(predicate);
        }

        public dynamic InsertTrans(ArticleImage entity)
        {
            return dao.InsertTrans(entity);
        }

        public bool DeleteTrans(object predicate)
        {
            return dao.DeleteTrans(predicate);
        }

    }
}
