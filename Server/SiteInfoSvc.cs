using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain;
using DapperExtensions;

namespace Server
{
    public class SiteInfoSvc
    {
        private Dao.SiteInfoDao dao = new Dao.SiteInfoDao();

        public IEnumerable<SiteInfo> GetList(object predicate, IList<ISort> sort)
        {
            return dao.GetList(predicate, sort);
        }

        public dynamic Insert(SiteInfo entity)
        {
            return dao.Insert(entity);
        }
        public bool Update(SiteInfo entity)
        {
            return dao.Update(entity);
        }

        public int Count(object predicate)
        {
            return dao.Count(predicate);
        }

        public SiteInfo GetEntity(dynamic id)
        {
            return dao.Get(id);
        }

        public IEnumerable<SiteInfo> GetPage(object predicate, IList<ISort> sort, int page, int resultsPerPage, out int totalCount)
        {
            totalCount = dao.Count(predicate);
            return dao.GetPage(predicate, sort, page, resultsPerPage);
        }
    }
}
