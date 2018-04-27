using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain;
using DapperExtensions;

namespace Server
{
    public class UserSvc
    {
        private Dao.UserDao dao = new Dao.UserDao();

        public IEnumerable<User> GetList(object predicate, IList<ISort> sort)
        {
            return dao.GetList(predicate, sort);
        }

        public dynamic Insert(User entity)
        {
            return dao.Insert(entity);
        }
        public bool Update(User entity)
        {
            return dao.Update(entity);
        }

        public int Count(object predicate)
        {
            return dao.Count(predicate);
        }

        public User GetEntity(dynamic id)
        {
            return dao.Get(id);
        }

        public IEnumerable<User> GetPage(object predicate, IList<ISort> sort, int page, int resultsPerPage, out int totalCount)
        {
            totalCount = dao.Count(predicate);
            return dao.GetPage(predicate, sort, page, resultsPerPage);
        }
    }
}
