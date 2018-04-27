using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using DapperExtensions;

namespace Dao
{
    public class SiteInfoDao
    {
        private Common.DapperHelper helper = Common.DapperHelper.Instance;

        public IEnumerable<SiteInfo> GetList(object predicate, IList<ISort> sort)
        {
            return helper.GetList<SiteInfo>(predicate, sort, null, true);
        }

        public dynamic Insert(SiteInfo entity)
        {
            return helper.Insert<SiteInfo>(entity, 0);
        }
        public bool Update(SiteInfo entity)
        {
            return helper.Update<SiteInfo>(entity, 0);
        }

        public int Count(object predicate)
        {
            return helper.Count<SiteInfo>(predicate, 0);
        }

        public SiteInfo Get(dynamic id)
        {
            return helper.Get<SiteInfo>(id, 0);
        }

        public IEnumerable<SiteInfo> GetPage(object predicate, IList<ISort> sort, int page, int resultsPerPage)
        {
            return helper.GetPage<SiteInfo>(predicate, sort, page - 1, resultsPerPage, 0, true);
        }
    }
}
