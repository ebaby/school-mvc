using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using DapperExtensions;

namespace Dao
{
    public class UserDao
    {
        private Common.DapperHelper helper = Common.DapperHelper.Instance;

        public IEnumerable<User> GetList(object predicate, IList<ISort> sort)
        {
            return helper.GetList<User>(predicate, sort, null, true);
        }

        public dynamic Insert(User entity)
        {
            return helper.Insert<User>(entity, 0);
        }
        public bool Update(User entity)
        {
            return helper.Update<User>(entity, 0);
        }

        public int Count(object predicate)
        {
            return helper.Count<User>(predicate, 0);
        }

        public User Get(dynamic id)
        {
            return helper.Get<User>(id, 0);
        }

        public IEnumerable<User> GetPage(object predicate, IList<ISort> sort, int page, int resultsPerPage)
        {
            return helper.GetPage<User>(predicate, sort, page - 1, resultsPerPage, 0, true);
        }
    }
}
