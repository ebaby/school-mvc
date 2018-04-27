using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Policy;
using System.Text;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Diagnostics;

namespace Common
{
    public class Utility
    {
        private static double EarthRadius = 6378.137; //地球半径 
        private static readonly Random MRand = new Random();
        /// <summary>
        ///   生成验证码
        /// </summary>
        /// <returns></returns>
        public static string GenerateRandomText(int length)
        {
            const string so = "2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,M,N,Q,R,S,T,U,V,W,X,Y,Z";
            string[] strArr = so.Split(',');
            string code = "";
            for (int i = 0; i < length; i++)
            {
                code += strArr[MRand.Next(0, strArr.Length)];
            }
            return code;
        }
        /// <summary>
        /// 获得MD5加密后的字符串
        /// </summary>
        public static string Md5(string str)
        {
            byte[] b = Encoding.Default.GetBytes(str);
            if (b.Length > 0)
            {
                try
                {
                    var m = new MD5CryptoServiceProvider();
                    byte[] b2 = m.ComputeHash(b);
                    if (b2.Length > 0)
                    {
                        string ret = "";
                        for (int i = 0; i < b2.Length; i++)
                        {
                            ret += b2[i].ToString("x").PadLeft(2, '0');
                        }
                        return ret;
                    }
                }
                catch
                {
                    //nothing
                }
            }
            return string.Empty;
        }
        public static string GetPwd(int len)
        {
            Random rd = new Random();
            long code = rd.Next(111111111, 999999999);
            const string chars = "1029384756qazwsxedcrfvtgbyhnujmikolp";
            const long mask = 0x03918D643E3C257A;
            const long limit = 0x000000FFFFFFFFFF;
            code = (code ^ mask) & limit;
            StringBuilder fs = new StringBuilder(6);
            do
            {
                int remain = (int)(code % chars.Length);
                fs.Append(chars[remain]);
                len--;
            } while ((code = code / chars.Length) != 0 && len > 0);
            return fs.ToString();
        }
        public static void Post(string url, string strData, out string ret)
        {
            byte[] data = Encoding.UTF8.GetBytes(strData);
            ret = "";
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;
            var stream = request.GetRequestStream();
            stream.Write(data, 0, data.Length);
            stream.Flush();
            stream.Close();
            var response = (HttpWebResponse)request.GetResponse();
            if (request.HaveResponse)
            {
                var responseStream = response.GetResponseStream();
                if (responseStream != null)
                {
                    var reader = new StreamReader(responseStream, Encoding.UTF8);
                    ret = reader.ReadToEnd();
                    reader.Close();
                    responseStream.Close();
                }
                response.Close();
            }
        }
        public static string Get(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.ContentType = "text/html;charset=UTF-8";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream myResponseStream = response.GetResponseStream();
            StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
            string retString = myStreamReader.ReadToEnd();
            myStreamReader.Close();
            myResponseStream.Close();
            return retString;

        }
        /// <summary>
        /// 时间戳转DateTime
        /// </summary>
        /// <param name="stamp"></param>
        /// <returns></returns>
        public static DateTime GetTimeByTimeStamp(string stamp)
        {
            DateTime dtStart = TimeZone.CurrentTimeZone.ToLocalTime(new DateTime(1970, 1, 1));
            long lTime = long.Parse(stamp + "0000000");
            TimeSpan toNow = new TimeSpan(lTime);
            return dtStart.Add(toNow);
        }
        /// <summary>
        /// 时间转时间戳
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static long GetTimeStamp(DateTime dt)
        {
            DateTime st = TimeZone.CurrentTimeZone.ToLocalTime(new DateTime(1970, 1, 1));
            return (long)(dt - st).TotalSeconds;
        }
        public static bool IsChina(string pin)
        {
            bool isChina = false;
            Regex rx = new Regex("^[\u4e00-\u9fbb]+$");
            if (rx.IsMatch(pin))
                isChina = true;
            else
                isChina = false;
            return isChina;
        }

        public static string GetIp()
        {
            string strIp = "";
            string strHostName = Dns.GetHostName();//Get localhost name
            IPAddress[] addresslist = Dns.GetHostByName(strHostName).AddressList;
            for (int i = 0; i < addresslist.Length; i++)
            {
                strIp += addresslist[i].ToString();
            }
            //foreach (IPAddress i in addresslist)
            //{
            //    strIp += i.ToString();
            //}
            return strIp;
        }

        /// <summary>
        /// base64加密
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
        public static string Base64Code(string msg)
        {
            byte[] bytes = Encoding.Default.GetBytes(msg);
            return Convert.ToBase64String(bytes);
        }
        /// <summary>
        /// base64解密
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
        public static string Base64Decode(string msg)
        {
            byte[] bytes = Convert.FromBase64String(msg);
            return Encoding.Default.GetString(bytes);
        }

        #region 创建数字签名

        /// <summary>
        /// 创建数字签名
        /// </summary>
        /// <param name="htValidationParams">存放数字签名参数的Hashtable</param>
        /// <returns>DigitalSign</returns>
        public static string CreateDigitalSign(string accountKey, string version, string accountId, string serviceName, DateTime td)
        {
            if (String.IsNullOrEmpty(accountKey))
            {
                throw new ApplicationException("缺少API帐户密钥");
            }
            List<string> stringList = new List<string>();
            stringList.Add(string.Format("Version={0}", version));
            stringList.Add(string.Format("AccountID={0}", accountId));
            stringList.Add(string.Format("ServiceName={0}", serviceName));
            stringList.Add(string.Format("ReqTime={0}", td.ToString("yyyy-MM-dd HH:mm:ss.fff")));

            string[] originalArray = stringList.ToArray();
            string[] sortedArray = BubbleSort(originalArray);
            string digitalSing = GetMD5ByArray(sortedArray, accountKey, "utf-8");

            return digitalSing;
        }

        #endregion

        #region 排序

        /// <summary>
        /// 数组排序（冒泡排序法）
        /// </summary>
        /// <param name="originalArray">待排序字符串数组</param>
        /// <returns>经过冒泡排序过的字符串数组</returns>
        public static string[] BubbleSort(string[] originalArray)
        {
            int i, j; //交换标志 
            string temp;
            bool exchange;

            for (i = 0; i < originalArray.Length; i++) //最多做R.Length-1趟排序 
            {
                exchange = false; //本趟排序开始前，交换标志应为假

                for (j = originalArray.Length - 2; j >= i; j--)
                {
                    if (String.CompareOrdinal(originalArray[j + 1], originalArray[j]) < 0)　//交换条件
                    {
                        temp = originalArray[j + 1];
                        originalArray[j + 1] = originalArray[j];
                        originalArray[j] = temp;

                        exchange = true; //发生了交换，故将交换标志置为真 
                    }
                }

                if (!exchange) //本趟排序未发生交换，提前终止算法 
                {
                    break;
                }
            }
            return originalArray;
        }

        #endregion

        #region MD5加密

        /// <summary>
        /// 获取字符数组的MD5哈希值
        /// </summary>
        /// <param name="sortedArray">待计算MD5哈希值的输入字符数组</param>
        /// <param name="key">密钥</param>
        /// <param name="charset">输入字符串的字符集</param>
        /// <returns>输入字符数组的MD5哈希值</returns>
        public static string GetMD5ByArray(string[] sortedArray, string key, string charset)
        {
            //构造待md5摘要字符串
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < sortedArray.Length; i++)
            {
                if (i == sortedArray.Length - 1)
                {
                    builder.Append(sortedArray[i]);
                }
                else
                {
                    builder.Append(sortedArray[i] + "&");
                }
            }
            builder.Append(key);
            return GetMD5(builder.ToString(), charset);
        }

        /// <summary>
        /// MD5 哈希运算
        /// </summary>
        /// <param name="input">待计算MD5哈希值的输入字符串</param>
        /// <param name="charset">输入字符串的字符集</param>
        /// <returns>输入字符串的MD5哈希值</returns>
        public static string GetMD5(string input, string charset)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] data = md5.ComputeHash(Encoding.GetEncoding(charset).GetBytes(input));
            StringBuilder builder = new StringBuilder(32);
            for (int i = 0; i < data.Length; i++)
            {
                builder.Append(data[i].ToString("x2"));
            }
            return builder.ToString();
        }

        #endregion

        #region 向服务器提交数据

        /// <summary>
        /// 向服务器提交XML数据
        /// </summary>
        /// <param name="url">远程访问的地址</param>
        /// <param name="data">参数</param>
        /// <param name="method">Http页面请求方法</param>
        /// <returns>远程页面调用结果</returns>
        public static string PostDataToServer(string url, string data, string method)
        {
            HttpWebRequest request = null;

            try
            {
                request = WebRequest.Create(url) as HttpWebRequest;
                //request.UserAgent = "Mozilla/6.0 (MSIE 6.0; Windows NT 5.1; Natas.Robot)";
                //request.Timeout = 3000;

                switch (method)
                {
                    case "GET":
                        request.Method = "GET";
                        break;
                    case "POST":
                        {
                            request.Method = "POST";

                            byte[] bdata = Encoding.UTF8.GetBytes(data);
                            request.ContentType = "application/xml;charset=utf-8";
                            request.ContentLength = bdata.Length;

                            Stream streamOut = request.GetRequestStream();
                            streamOut.Write(bdata, 0, bdata.Length);
                            streamOut.Close();
                        }
                        break;
                }

                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream streamIn = response.GetResponseStream();

                StreamReader reader = new StreamReader(streamIn);
                string result = reader.ReadToEnd();
                reader.Close();
                streamIn.Close();
                response.Close();

                return result;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
            }
        }
        #endregion

        /// <summary>
        /// 检测身份证号码是否有效
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public static bool CheckIDCard(string Id)
        {
            if (Id.Length == 18)
            {
                bool check = CheckIDCard18(Id);
                return check;
            }
            else if (Id.Length == 15)
            {
                bool check = CheckIDCard15(Id);
                return check;
            }

            else
            {
                return false;
            }
        }
        private static bool CheckIDCard18(string Id)
        {
            long n = 0;
            if (long.TryParse(Id.Remove(17), out n) == false || n < Math.Pow(10, 16) || long.TryParse(Id.Replace('x', '0').Replace('X', '0'), out n) == false)
            {
                return false;//数字验证
            }
            string address = "11x22x35x44x53x12x23x36x45x54x13x31x37x46x61x14x32x41x50x62x15x33x42x51x63x21x34x43x52x64x65x71x81x82x91";
            if (address.IndexOf(Id.Remove(2)) == -1)
            {
                return false;//省份验证
            }
            string birth = Id.Substring(6, 8).Insert(6, "-").Insert(4, "-");
            DateTime time = new DateTime();
            if (DateTime.TryParse(birth, out time) == false)
            {
                return false;//生日验证
            }
            string[] arrVarifyCode = ("1,0,x,9,8,7,6,5,4,3,2").Split(',');
            string[] Wi = ("7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2").Split(',');
            char[] Ai = Id.Remove(17).ToCharArray();
            int sum = 0;
            for (int i = 0; i < 17; i++)
            {
                sum += int.Parse(Wi[i]) * int.Parse(Ai[i].ToString());
            }
            int y = -1;
            Math.DivRem(sum, 11, out y);
            if (arrVarifyCode[y] != Id.Substring(17, 1).ToLower())
            {
                return false;//校验码验证
            }
            return true;//符合GB11643-1999标准
        }
        private static bool CheckIDCard15(string Id)
        {
            long n = 0;
            if (long.TryParse(Id, out n) == false || n < Math.Pow(10, 14))
            {
                return false;//数字验证
            }
            string address = "11x22x35x44x53x12x23x36x45x54x13x31x37x46x61x14x32x41x50x62x15x33x42x51x63x21x34x43x52x64x65x71x81x82x91";
            if (address.IndexOf(Id.Remove(2)) == -1)
            {
                return false;//省份验证
            }
            string birth = Id.Substring(6, 6).Insert(4, "-").Insert(2, "-");
            DateTime time = new DateTime();
            if (DateTime.TryParse(birth, out time) == false)
            {
                return false;//生日验证
            }
            return true;//符合15位身份证标准
        }

        /// <summary>
        /// 是否为有效的手机号码
        /// </summary>
        /// <param name="mobile">手机号码</param>
        /// <returns>bool</returns>
        public static bool IsMobile(string mobile)
        {
            return Regex.IsMatch(mobile, "^1[3458][0-9]{9}$");
        }
        /// <summary>
        /// 是否为有效的邮件地址
        /// true 有效
        /// false 无效
        /// </summary>
        /// <param name="email">邮件地址</param>
        /// <returns>bool</returns>
        public static bool IsEmail(string email)
        {
            return Regex.IsMatch(email, @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$");
        }
        /// <summary>
        /// 计算经纬度间距离
        /// </summary>
        /// <param name="lat1"></param>
        /// <param name="lng1"></param>
        /// <param name="lat2"></param>
        /// <param name="lng2"></param>
        /// <returns>单位：千米</returns>
        public static double GetDistance(double lat1, double lng1, double lat2, double lng2)
        {
            double radLat1 = Rad(lat1);
            double radLat2 = Rad(lat2);
            double a = radLat1 - radLat2;
            double b = Rad(lng1) - Rad(lng2);
            double s = 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) + Math.Cos(radLat1) * Math.Cos(radLat2) * Math.Pow(Math.Sin(b / 2), 2)));
            s = s * EarthRadius;
            s = Math.Round(s * 10000) / 10000;
            return s;
        }
        private static double Rad(double d)
        {
            return d * Math.PI / 180.0;
        }
        /// <summary>
        /// 通过经纬度获取城市名称和区域名称
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lng"></param>
        /// <param name="cityName"></param>
        /// <param name="sectionName"></param>
        public static void GetCityInfo(string lat, string lng, out string cityName, out string sectionName)
        {
            string url = string.Format("http://api.map.baidu.com/geocoder/v2/?ak=AD3dc68c0bb44cda6f424a1b66a26aed&callback=renderReverse&location={0},{1}&output=xml&pois=0", lat, lng);
            cityName = "";
            sectionName = "";
            string xmlStr = Common.Utility.PostDataToServer(url, "", "GET");
            string[] secItems = xmlStr.Split(new string[] { "<district>", "</district>" }, StringSplitOptions.None);
            sectionName = secItems[1];
            string[] cityItems = xmlStr.Split(new string[] { "<city>", "</city>" }, StringSplitOptions.None);
            cityName = cityItems[1];
            if (cityName.EndsWith("市"))
                cityName = cityName.Replace("市", "");
        }

        public static string UnicodeToChinese(string unicode)
        {
            string outStr = "";
            if (!string.IsNullOrEmpty(unicode))
            {
                string[] strlist = unicode.Replace("\\", "").Split('u');
                try
                {
                    for (int i = 1; i < strlist.Length; i++)
                    {
                        //将unicode字符转为10进制整数，然后转为char中文字符
                        outStr += (char)int.Parse(strlist[i], System.Globalization.NumberStyles.HexNumber);
                    }
                }
                catch (FormatException ex)
                {
                    outStr = ex.Message;
                }
            }
            return outStr;
        }

        public static System.Collections.Hashtable GetKeyValuePairByUrl(string url)
        {
            System.Collections.Hashtable list = new System.Collections.Hashtable();
            if (url.Equals("") == false)
            {
                foreach (var k in url.Split('&'))
                {
                    var v = k.Split('=');
                    if (list.ContainsKey(v[0]) == false)
                    {
                        list.Add(v[0].ToString().Trim('"'), v[1].ToString().Trim('"'));
                    }
                    else
                    {
                        list[v[0]] +=","+ v[1].ToString().Trim('"');
                    }
                }
            }
            return list;
        }

        public static string GetPictureUrl(string pid)
        {
            string url = "";
            if (!string.IsNullOrEmpty(pid))
            {
                string mdIndex = Md5(pid).Remove(3);
                url = string.Format("{0}/{1}/{2}.jpg", Common.Config.PictureUrl, mdIndex, pid);
            }
            return url;
        }



        #region Stopwatch计时器
        /// <summary>
        /// 计时器开始
        /// </summary>
        /// <returns></returns>
        public static Stopwatch TimerStart()
        {
            Stopwatch watch = new Stopwatch();
            watch.Reset();
            watch.Start();
            return watch;
        }
        /// <summary>
        /// 计时器结束
        /// </summary>
        /// <param name="watch"></param>
        /// <returns></returns>
        public static string TimerEnd(Stopwatch watch)
        {
            watch.Stop();
            double costtime = watch.ElapsedMilliseconds;
            return costtime.ToString();
        }
        #endregion

        #region 删除数组中的重复项
        /// <summary>
        /// 删除数组中的重复项
        /// </summary>
        /// <param name="values"></param>
        /// <returns></returns>
        public static string[] RemoveDup(string[] values)
        {
            List<string> list = new List<string>();
            for (int i = 0; i < values.Length; i++)//遍历数组成员
            {
                if (!list.Contains(values[i]))
                {
                    list.Add(values[i]);
                };
            }
            return list.ToArray();
        }
        #endregion

        #region 自动生成编号
        /// <summary>
        /// 表示全局唯一标识符 (GUID)。
        /// </summary>
        /// <returns></returns>
        public static string GuId()
        {
            return Guid.NewGuid().ToString();
        }
        /// <summary>
        /// 自动生成编号  201008251145409865
        /// </summary>
        /// <returns></returns>
        public static string CreateNo()
        {
            Random random = new Random();
            string strRandom = random.Next(1000, 10000).ToString(); //生成编号 
            string code = DateTime.Now.ToString("yyyyMMddHHmmss") + strRandom;//形如
            return code;
        }
        #endregion

        #region 生成0-9随机数
        /// <summary>
        /// 生成0-9随机数
        /// </summary>
        /// <param name="codeNum">生成长度</param>
        /// <returns></returns>
        public static string RndNum(int codeNum)
        {
            StringBuilder sb = new StringBuilder(codeNum);
            Random rand = new Random();
            for (int i = 1; i < codeNum + 1; i++)
            {
                int t = rand.Next(9);
                sb.AppendFormat("{0}", t);
            }
            return sb.ToString();

        }
        #endregion

        #region 删除最后一个字符之后的字符
        /// <summary>
        /// 删除最后结尾的一个逗号
        /// </summary>
        public static string DelLastComma(string str)
        {
            return str.Substring(0, str.LastIndexOf(","));
        }
        /// <summary>
        /// 删除最后结尾的指定字符后的字符
        /// </summary>
        public static string DelLastChar(string str, string strchar)
        {
            return str.Substring(0, str.LastIndexOf(strchar));
        }
        /// <summary>
        /// 删除最后结尾的长度
        /// </summary>
        /// <param name="str"></param>
        /// <param name="Length"></param>
        /// <returns></returns>
        public static string DelLastLength(string str, int Length)
        {
            if (string.IsNullOrEmpty(str))
                return "";
            str = str.Substring(0, str.Length - Length);
            return str;
        }
        #endregion



    }
}
