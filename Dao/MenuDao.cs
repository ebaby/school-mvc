using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using DapperExtensions;

namespace Dao
{
    public class MenuDao
    {
        private Common.DapperHelper helper = Common.DapperHelper.Instance;

        public IEnumerable<Menu> GetList(object predicate, IList<ISort> sort)
        {
            return helper.GetList<Menu>(predicate, sort, null, true);
        }

        public dynamic Insert(Menu entity)
        {
            return helper.Insert<Menu>(entity, 0);
        }
        public bool Update(Menu entity)
        {
            return helper.Update<Menu>(entity,0);
        }
        public bool Delete(Menu entity)
        {
            return helper.Delete<Menu>(entity,0);
        }

        public int Count(object predicate)
        {
            return helper.Count<Menu>(predicate, 0);
        }

        public Menu Get(dynamic id)
        {
            return helper.Get<Menu>(id, 0);
        }

        public IEnumerable<Menu> GetPage(object predicate, IList<ISort> sort, int page, int resultsPerPage)
        {
            return helper.GetPage<Menu>(predicate, sort, page-1, resultsPerPage, 0, true);
        }
    }
}
