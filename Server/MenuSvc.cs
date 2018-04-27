using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain;
using DapperExtensions;

namespace Server
{
    public class MenuSvc
    {
        private Dao.MenuDao dao = new Dao.MenuDao();

        public IEnumerable<Menu> GetList(object predicate, IList<ISort> sort)
        {
            return dao.GetList(predicate, sort);
        }

        public dynamic Insert(Menu entity)
        {
            return dao.Insert(entity);
        }
        public bool Update(Menu entity)
        {
            return dao.Update(entity);
        }
        public bool Delete(Menu entity)
        {
            return dao.Delete(entity);
        }

        public int Count(object predicate)
        {
            return dao.Count(predicate);
        }

        public Menu GetEntity(dynamic id)
        {
            return dao.Get(id);
        }

        public IEnumerable<Menu> GetPage(object predicate, IList<ISort> sort, int page, int resultsPerPage,out int totalCount)
        {
            totalCount = dao.Count(predicate);
            return dao.GetPage(predicate, sort, page, resultsPerPage);
        }

    }
}
