using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DapperExtensions;
using Domain;

namespace Dao
{
    public class ArticleImageDao
    {
        private Common.DapperHelper helper = Common.DapperHelper.Instance;

        public IEnumerable<ArticleImage> GetList(object predicate, IList<ISort> sort)
        {
            return helper.GetList<ArticleImage>(predicate, sort, null, true);
        }

        public ArticleImage Get(dynamic id)
        {
            return helper.Get<ArticleImage>(id, 0);
        }

        public bool Delete(object predicate)
        {
            return helper.Delete<ArticleImage>(predicate, 0);
        }

        public dynamic Insert(ArticleImage entity)
        {
            return helper.Insert<ArticleImage>(entity, 0);
        }

        public int Count(object predicate)
        {
            return helper.Count<ArticleImage>(predicate, 0);
        }

        public dynamic InsertTrans(ArticleImage entity)
        {
            return helper.InsertTrans<ArticleImage>(entity, 0);
        }

        public dynamic DeleteTrans(object predicate)
        {
            return helper.DeleteTrans<ArticleImage>(predicate, 0);
        }

    }
}
