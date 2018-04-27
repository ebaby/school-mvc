using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using DapperExtensions;
using System.Configuration;
using System.Data.Common;
using System.Data.SqlClient;
using DapperExtensions.Sql;
using DapperExtensions.Mapper;
using System.Reflection;
using MySql.Data.MySqlClient;
using Dapper;

namespace Common
{
    public class DapperHelper
    {
        private static readonly string _dataBaseType = System.Configuration.ConfigurationManager.AppSettings["DataBaseType"].ToString();
        private static readonly string _connectionString = System.Configuration.ConfigurationManager.AppSettings["ConnectionString"].ToString();

        private volatile static DapperHelper _instance = null;
        private static readonly object lockHelper = new object();
        //private static IDbConnection connection = null; 
        private static IDbTransaction transaction = null; 
                
        public static DapperHelper Instance
        {
            get
            {
                if (_instance == null)
                {
                    lock (lockHelper)
                    {
                        if (_instance == null)
                            _instance = new DapperHelper();
                    }
                }
                return _instance;
            }
        }
        
        
        private Database CreateDatabase()
        {
            ISqlDialect sqlDialect = null;
            IDbConnection connection = null; 

            switch (_dataBaseType.ToLower())
            {
                case "mysql":
                    {
                        connection = new MySqlConnection(_connectionString);
                        sqlDialect = new MySqlDialect();
                    }
                    break;
                case "sqlserver":
                    {
                        connection = new SqlConnection(_connectionString);
                        sqlDialect = new SqlServerDialect();
                    }
                    break;
                case "oracle":
                    {
                        
                    }
                    break;
                case "sqlite":
                    {
                        //connection = new SQLiteConnection(_connectionString);
                        sqlDialect = new SqliteDialect();
                    }
                    break;
                default:
                    break;
            }

            var config = new DapperExtensionsConfiguration(typeof(AutoClassMapper<>), new List<Assembly>(),sqlDialect );
            var sqlGenerator = new SqlGeneratorImpl(config);

            //if (connection.State != ConnectionState.Open)
            //    connection.Open();

            return new Database(connection, sqlGenerator);
        }

        public int Count<T>(object predicate, int? commandTimeout) where T : class
        {
            var db = CreateDatabase();
            try
            {
                return db.Count<T>(predicate, commandTimeout);
            }
            catch (Exception ex) { throw new Exception(ex.Message.ToString()); }
            finally
            {
                db.Connection.Close();
            }
        }
        public T Get<T>(dynamic id, int? commandTimeout) where T : class
        {
            T temp;
            var db = CreateDatabase();
            try{
                temp = (T)db.Get<T>(id, commandTimeout);
            }
            catch (Exception ex) { throw new Exception(ex.Message.ToString()); }
            finally
            {
                db.Connection.Close();
            }
            return temp;
        }        
        public dynamic Insert<T>(T entity, int? commandTimeout) where T : class
        {
            dynamic result;
            var db = CreateDatabase();
            try{
                result = db.Insert<T>(entity, commandTimeout);
            }
            catch (Exception ex) { throw new Exception(ex.Message.ToString()); }
            finally
            {
                db.Connection.Close();
            }
            return result;
        }        
        public bool Update<T>(T entity, int? commandTimeout) where T : class
        {
            bool result;
            var db = CreateDatabase();
            try{
                result= db.Update<T>(entity, commandTimeout,false);
            }
            catch (Exception ex) { throw new Exception(ex.Message.ToString()); }
            finally
            {
                db.Connection.Close();
            }
            return result;
        }
        public bool Delete<T>(T entity, int? commandTimeout) where T : class
        {
            dynamic result;
            var db = CreateDatabase();
            try{
                result = db.Delete(entity, commandTimeout);
            }
            catch (Exception ex) { throw new Exception(ex.Message.ToString()); }
            finally
            {
                db.Connection.Close();
            }
            return result;
        }
        public bool Delete<T>(object predicate, int? commandTimeout) where T : class
        {
            dynamic result;
            var db = CreateDatabase();
            try
            {
                result = db.Delete<T>(predicate, commandTimeout);
            }
            catch (Exception ex) { throw new Exception(ex.Message.ToString()); }
            finally
            {
                db.Connection.Close();
            }
            return result;
        }
        public IEnumerable<T> GetList<T>(object predicate, IList<ISort> sort, int? commandTimeout, bool buffered) where T : class
        {
            IEnumerable<T> result = null;
            var db = CreateDatabase();
            try
            {
                result = db.GetList<T>(predicate, sort, commandTimeout, buffered);

            }
            catch (Exception ex) { throw new Exception(ex.Message.ToString()); }
            finally
            {
                db.Connection.Close();
            }
            return result;
        }
        public IEnumerable<T> GetPage<T>(object predicate, IList<ISort> sort, int page, int resultsPerPage, int? commandTimeout, bool buffered) where T : class
        {
            IEnumerable<T> result=null;
            var db = CreateDatabase();
            try
            {
                result = db.GetPage<T>(predicate, sort, page, resultsPerPage, commandTimeout, buffered);
            }
            catch (Exception ex) { throw new Exception(ex.Message.ToString()); }
            finally {
                db.Connection.Close();
            }
            return result;
        }
        public IEnumerable<T> GetSet<T>(object predicate, IList<ISort> sort, int firstResult, int maxResults, int? commandTimeout, bool buffered) where T : class
        {
            IEnumerable<T> result;
            var db = CreateDatabase();
            try{
                result = db.GetSet<T>( predicate, sort, firstResult, maxResults, commandTimeout, buffered);
            }
            catch (Exception ex) { throw new Exception(ex.Message.ToString()); }
            finally
            {
                db.Connection.Close();
            }
            return result;
        }
        public IMultipleResultReader GetMultiple(GetMultiplePredicate predicate, int? commandTimeout)
        {
            IMultipleResultReader result;
            var db = CreateDatabase();
            try
            {
                result = db.GetMultiple(predicate, commandTimeout);
            }catch (Exception ex) { throw new Exception(ex.Message.ToString()); }
            finally {
                db.Connection.Close();
            }
            return result;
        }

        #region Transaction Method

        public IDbTransaction BeginTransaction()
        {
            var db = CreateDatabase();
            return db.Connection.BeginTransaction(IsolationLevel.ReadCommitted);
        }
        public void RunInTransaction(Action action)
        {
            var db = CreateDatabase();

            db.RunInTransaction(action);
        }
        public bool UpdateTrans<T>(T entity, int? commandTimeout) where T : class
        {
            bool result;
            var db = CreateDatabase();
            result = db.Update<T>(entity, transaction, commandTimeout ,false);
            return result;
        }
        public T GetTrans<T>(dynamic id, int? commandTimeout) where T : class
        {
            T temp;
            var Db = CreateDatabase();
            temp = (T)Db.Get<T>(id, transaction, commandTimeout);

            return temp;
        }
        public int CountTrans<T>(object predicate, int? commandTimeout) where T : class
        {
            var db = CreateDatabase();

            return db.Count<T>(predicate, transaction, commandTimeout);

        }
        public dynamic InsertTrans<T>(T entity, int? commandTimeout = null) where T : class
        {
            dynamic result;
            var db = CreateDatabase();
            result = db.Insert<T>(entity, transaction, commandTimeout);
            return result;
        }
        public bool DeleteTrans<T>(T entity, int? commandTimeout) where T : class
        {
            bool result;
            var db = CreateDatabase();
            result = db.Delete<T>(entity, transaction, commandTimeout);
            return result;
        }
        public bool DeleteTrans<T>(object predicate, int? commandTimeout) where T : class
        {
            bool result;
            var db = CreateDatabase();
            result = db.Delete<T>(predicate, transaction, commandTimeout);
            return result;
        }
        public IEnumerable<T> GetListTrans<T>(object predicate, IList<ISort> sort, int? commandTimeout, bool buffered) where T : class
        {
            IEnumerable<T> result;
            var db = CreateDatabase();
            result = db.GetList<T>(predicate, sort, transaction, commandTimeout, buffered);
            return result;
        }
        public IEnumerable<T> GetSetTrans<T>(object predicate, IList<ISort> sort, int firstResult, int maxResults, int? commandTimeout, bool buffered) where T : class
        {
            IEnumerable<T> result;
            var db = CreateDatabase();
            result = db.GetSet<T>(predicate, sort, firstResult, maxResults, transaction, commandTimeout, buffered);
            return result;
        }
        public IEnumerable<T> GetPageTrans<T>(object predicate, IList<ISort> sort, int page, int resultsPerPage, int? commandTimeout, bool buffered) where T : class 
        {
            IEnumerable<T> result;
            var db = CreateDatabase();
            result = db.GetPage<T>(predicate, sort, page, resultsPerPage, transaction, commandTimeout, buffered);
            return result;
        }
        public IMultipleResultReader GetMultipleTrans(GetMultiplePredicate predicate, int? commandTimeout)
        {
            var db = CreateDatabase();
            return db.GetMultiple( predicate, transaction, commandTimeout);
        }
        #endregion

        #region Dapper SQL
        public IEnumerable<dynamic> GetPage(string sql, object param = null)
        {
            IEnumerable<dynamic> list = null;
            using (var connection = new MySqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                    connection.Open();
                }
                else
                {
                    connection.Open();
                }

                list = connection.Query(sql, param);
            }

            return list;
        }
        public IEnumerable<dynamic> GetList(string sql, object param = null)
        {
            IEnumerable<dynamic> list = null;
            using (var connection = new MySqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                    connection.Open();
                }
                else
                {
                    connection.Open();
                }
                list = connection.Query(sql, param);

            }

            return list;
        }
        public int Count(string sql, object param = null) 
        {
            int result = 0;
            using (var connection = new MySqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                    connection.Open();
                }
                else
                {
                    connection.Open();
                }

                result = connection.Query<int>(sql, param).Single();

            }
            return result;
        }
        public dynamic Execute(string sql, object param = null)
        {
            dynamic result = 0;
            using (var connection = new MySqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                    connection.Open();
                }
                else
                {
                    connection.Open();
                }
                result = connection.Execute(sql, param);

            }

            return result;
        }
        public string ExecuteTran(List<string> sqlArray)
        {
            string result = "ok";
            using (var connection = new MySqlConnection(_connectionString))
            {
                IDbTransaction tran = null;
                try
                {
                    if (connection.State == ConnectionState.Open)
                    {
                        connection.Close();
                        connection.Open();
                    }
                    else
                    {
                        connection.Open();
                    }
                    tran = connection.BeginTransaction();
                    foreach (var sql in sqlArray)
                    {
                        connection.Execute(sql, null,tran);
                    }
                    tran.Commit();

                }
                catch(Exception ex)
                {
                    tran.Rollback();
                    //throw new Exception(ex.Message.ToString());
                    result = ex.Message.ToString();
                }

            }

            return result;
        }
        #endregion

    }
}
