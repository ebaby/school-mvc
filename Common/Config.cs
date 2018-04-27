using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;

namespace Common
{
    public class Config
    {
        private static readonly object MLocker = new object();
        /// <summary>
        /// 帐号
        /// </summary>
        private static string _mAccountId;
        public static string AccountId
        {
            get
            {
                if (string.IsNullOrEmpty(_mAccountId))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mAccountId))
                        {
                            _mAccountId = ConfigurationManager.AppSettings["AccountId"];
                        }
                    }
                }
                return _mAccountId;
            }
        }
        /// <summary>
        /// 密码
        /// </summary>
        private static string _mAccountKey;
        public static string AccountKey
        {
            get
            {
                if (string.IsNullOrEmpty(_mAccountKey))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mAccountKey))
                        {
                            _mAccountKey = ConfigurationManager.AppSettings["AccountKey"];
                        }
                    }
                }
                return _mAccountKey;
            }
        }
        /// <summary>
        /// 版本
        /// </summary>
        private static string _mVersionId;
        public static string VersionId
        {
            get
            {
                if (string.IsNullOrEmpty(_mVersionId))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mVersionId))
                        {
                            _mVersionId = ConfigurationManager.AppSettings["VersionId"];
                        }
                    }
                }
                return _mVersionId;
            }
        }
        /// <summary>
        /// 获取酒店信息的url地址
        /// </summary>
        private static string _mGetHotelInfoUrl;
        public static string GetHotelInfoUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetHotelInfoUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetHotelInfoUrl))
                        {
                            _mGetHotelInfoUrl = ConfigurationManager.AppSettings["GetHotelInfoUrl"];
                        }
                    }
                }
                return _mGetHotelInfoUrl;
            }
        }
        /// <summary>
        /// 提交订单的url地址
        /// </summary>
        private static string _mSubmitOrderUrl;
        public static string SubmitOrderUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mSubmitOrderUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mSubmitOrderUrl))
                        {
                            _mSubmitOrderUrl = ConfigurationManager.AppSettings["SubmitOrderUrl"];
                        }
                    }
                }
                return _mSubmitOrderUrl;
            }
        }
        /// <summary>
        /// 银行卡信息url地址
        /// </summary>
        private static string _mCardInfoUrl;
        public static string CardInfoUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mCardInfoUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mCardInfoUrl))
                        {
                            _mCardInfoUrl = ConfigurationManager.AppSettings["CardInfoUrl"];
                        }
                    }
                }
                return _mCardInfoUrl;
            }
        }
        /// <summary>
        /// cookie的主键
        /// </summary>
        private static string _mCookieKey;
        public static string CookieKey
        {
            get
            {
                if (string.IsNullOrEmpty(_mCookieKey))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mCookieKey))
                        {
                            _mCookieKey = ConfigurationManager.AppSettings["CookieKey"];
                        }
                    }
                }
                return _mCookieKey;
            }
        }

        private static string _mMainAppId;
        public static string MainAppId
        {
            get
            {
                if (string.IsNullOrEmpty(_mMainAppId))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mMainAppId))
                        {
                            _mMainAppId = ConfigurationManager.AppSettings["MainAppId"];
                        }
                    }
                }
                return _mMainAppId;
            }
        }

        private static string _mMainAppSecret;
        public static string MainAppSecret
        {
            get
            {
                if (string.IsNullOrEmpty(_mMainAppSecret))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mMainAppSecret))
                        {
                            _mMainAppSecret = ConfigurationManager.AppSettings["MainAppSecret"];
                        }
                    }
                }
                return _mMainAppSecret;
            }
        }

        private static string _mMainToket;
        public static string MainToket
        {
            get
            {
                if (string.IsNullOrEmpty(_mMainToket))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mMainToket))
                        {
                            _mMainToket = ConfigurationManager.AppSettings["MainToket"];
                        }
                    }
                }
                return _mMainToket;
            }
        }

        private static string _mOneAppId;
        public static string OneAppId
        {
            get
            {
                if (string.IsNullOrEmpty(_mOneAppId))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mOneAppId))
                        {
                            _mOneAppId = ConfigurationManager.AppSettings["OneAppId"];
                        }
                    }
                }
                return _mOneAppId;
            }
        }

        private static string _mOneAppSecret;
        public static string OneAppSecret
        {
            get
            {
                if (string.IsNullOrEmpty(_mOneAppSecret))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mOneAppSecret))
                        {
                            _mOneAppSecret = ConfigurationManager.AppSettings["OneAppSecret"];
                        }
                    }
                }
                return _mOneAppSecret;
            }
        }

        private static string _mOneToket;
        public static string OneToket
        {
            get
            {
                if (string.IsNullOrEmpty(_mOneToket))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mOneToket))
                        {
                            _mOneToket = ConfigurationManager.AppSettings["OneToket"];
                        }
                    }
                }
                return _mOneToket;
            }
        }

        private static string _mWriteLogPath;
        public static string WriteLogPath
        {
            get
            {
                if (string.IsNullOrEmpty(_mWriteLogPath))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mWriteLogPath))
                        {
                            _mWriteLogPath = ConfigurationManager.AppSettings["WriteLogPath"];
                        }
                    }
                }
                return _mWriteLogPath;
            }
        }

        private static string _mLogConfigPath;
        public static string LogConfigPath
        {
            get
            {
                if (string.IsNullOrEmpty(_mLogConfigPath))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mLogConfigPath))
                        {
                            _mLogConfigPath = ConfigurationManager.AppSettings["LogConfigPath"];
                        }
                    }
                }
                return _mLogConfigPath;
            }
        }

        private static string _mSmsContentFmt;
        public static string SmsContentFmt
        {
            get
            {
                if (string.IsNullOrEmpty(_mSmsContentFmt))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mSmsContentFmt))
                        {
                            _mSmsContentFmt = ConfigurationManager.AppSettings["SmsContentFmt"];
                        }
                    }
                }
                return _mSmsContentFmt;
            }
        }

        private static string _mDingSmsContentFmt;
        public static string DingSmsContentFmt
        {
            get
            {
                if (string.IsNullOrEmpty(_mDingSmsContentFmt))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mDingSmsContentFmt))
                        {
                            _mDingSmsContentFmt = ConfigurationManager.AppSettings["DingSmsContentFmt"];
                        }
                    }
                }
                return _mDingSmsContentFmt;
            }
        }

        private static string _mHallSmsContentFmt;
        public static string HallSmsContentFmt
        {
            get
            {
                if (string.IsNullOrEmpty(_mHallSmsContentFmt))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mHallSmsContentFmt))
                        {
                            _mHallSmsContentFmt = ConfigurationManager.AppSettings["HallSmsContentFmt"];
                        }
                    }
                }
                return _mHallSmsContentFmt;
            }
        }

        private static string _mLeisureSmsContentFmt;
        public static string LeisureSmsContentFmt
        {
            get
            {
                if (string.IsNullOrEmpty(_mLeisureSmsContentFmt))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mLeisureSmsContentFmt))
                        {
                            _mLeisureSmsContentFmt = ConfigurationManager.AppSettings["LeisureSmsContentFmt"];
                        }
                    }
                }
                return _mLeisureSmsContentFmt;
            }
        }

        private static string _mSmsUrl;
        public static string SmsUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mSmsUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mSmsUrl))
                        {
                            _mSmsUrl = ConfigurationManager.AppSettings["SmsUrl"];
                        }
                    }
                }
                return _mSmsUrl;
            }
        }

        private static string _mImageUrl;
        public static string ImageUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mImageUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mImageUrl))
                        {
                            _mImageUrl = ConfigurationManager.AppSettings["ImageUrl"];
                        }
                    }
                }
                return _mImageUrl;
            }
        }

        private static string _mImagePath;
        public static string ImagePath
        {
            get
            {
                if (string.IsNullOrEmpty(_mImagePath))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mImagePath))
                        {
                            _mImagePath = ConfigurationManager.AppSettings["ImagePath"];
                        }
                    }
                }
                return _mImagePath;
            }
        }

        private static string _mWeChatUrl;
        public static string WeChatUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mWeChatUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mWeChatUrl))
                        {
                            _mWeChatUrl = ConfigurationManager.AppSettings["WeChatUrl"];
                        }
                    }
                }
                return _mWeChatUrl;
            }
        }

        private static string _mMailServer;
        public static string MailServer
        {
            get
            {
                if (string.IsNullOrEmpty(_mMailServer))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mMailServer))
                        {
                            _mMailServer = ConfigurationManager.AppSettings["MailServer"];
                        }
                    }
                }
                return _mMailServer;
            }
        }

        private static string _mMailUserName;
        public static string MailUserName
        {
            get
            {
                if (string.IsNullOrEmpty(_mMailUserName))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mMailUserName))
                        {
                            _mMailUserName = ConfigurationManager.AppSettings["MailUserName"];
                        }
                    }
                }
                return _mMailUserName;
            }
        }

        private static string _mMailPassword;
        public static string MailPassword
        {
            get
            {
                if (string.IsNullOrEmpty(_mMailPassword))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mMailPassword))
                        {
                            _mMailPassword = ConfigurationManager.AppSettings["MailPassword"];
                        }
                    }
                }
                return _mMailPassword;
            }
        }

        private static string _mFlagShipUrl;
        public static string FlagShipUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mFlagShipUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mFlagShipUrl))
                        {
                            _mFlagShipUrl = ConfigurationManager.AppSettings["FlagShipUrl"];
                        }
                    }
                }
                return _mFlagShipUrl;
            }
        }

        private static string _mPageSize;
        public static int PageSize
        {
            get
            {
                if (string.IsNullOrEmpty(_mPageSize))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mPageSize))
                        {
                            _mPageSize = ConfigurationManager.AppSettings["PageSize"];
                        }
                    }
                }
                return int.Parse(_mPageSize);
            }
        }

        private static string _mNoticeRoomTypeSms;
        public static string NoticeRoomTypeSms
        {
            get
            {
                if (string.IsNullOrEmpty(_mNoticeRoomTypeSms))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mNoticeRoomTypeSms))
                        {
                            _mNoticeRoomTypeSms = ConfigurationManager.AppSettings["RoomTypeSms"];
                        }
                    }
                }
                return _mNoticeRoomTypeSms;
            }
        }

        private static string _mNoticeDingSms;
        public static string NoticeDingSms
        {
            get
            {
                if (string.IsNullOrEmpty(_mNoticeDingSms))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mNoticeDingSms))
                        {
                            _mNoticeDingSms = ConfigurationManager.AppSettings["DingSms"];
                        }
                    }
                }
                return _mNoticeDingSms;
            }
        }

        private static string _mNoticeHallSms;
        public static string NoticeHallSms
        {
            get
            {
                if (string.IsNullOrEmpty(_mNoticeHallSms))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mNoticeHallSms))
                        {
                            _mNoticeHallSms = ConfigurationManager.AppSettings["HallSms"];
                        }
                    }
                }
                return _mNoticeHallSms;
            }
        }

        private static string _mNoticeLeisureSms;
        public static string NoticeLeisureSms
        {
            get
            {
                if (string.IsNullOrEmpty(_mNoticeLeisureSms))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mNoticeLeisureSms))
                        {
                            _mNoticeLeisureSms = ConfigurationManager.AppSettings["LeisureSms"];
                        }
                    }
                }
                return _mNoticeLeisureSms;
            }
        }

        private static string _mSendSmsPath;
        public static string SendSmsPath
        {
            get
            {
                if (string.IsNullOrEmpty(_mSendSmsPath))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mSendSmsPath))
                        {
                            _mSendSmsPath = ConfigurationManager.AppSettings["SendSmsPath"];
                        }
                    }
                }
                return _mSendSmsPath;
            }
        }

        private static string _mReSetPwdSms;
        public static string ReSetPwdSms
        {
            get
            {
                if (string.IsNullOrEmpty(_mReSetPwdSms))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mReSetPwdSms))
                        {
                            _mReSetPwdSms = ConfigurationManager.AppSettings["ReSetPwdSms"];
                        }
                    }
                }
                return _mReSetPwdSms;
            }
        }

        private static string _mQueryOrderSms;
        public static string QueryOrderSms
        {
            get
            {
                if (string.IsNullOrEmpty(_mQueryOrderSms))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mQueryOrderSms))
                        {
                            _mQueryOrderSms = ConfigurationManager.AppSettings["QueryOrderSms"];
                        }
                    }
                }
                return _mQueryOrderSms;
            }
        }

        private static string _mSendAccount;
        public static string SendAccount
        {
            get
            {
                if (string.IsNullOrEmpty(_mSendAccount))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mSendAccount))
                        {
                            _mSendAccount = ConfigurationManager.AppSettings["SendAccount"];
                        }
                    }
                }
                return _mSendAccount;
            }
        }

        private static string _mSendPassword;
        public static string SendPassword
        {
            get
            {
                if (string.IsNullOrEmpty(_mSendPassword))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mSendPassword))
                        {
                            _mSendPassword = ConfigurationManager.AppSettings["SendPassword"];
                        }
                    }
                }
                return _mSendPassword;
            }
        }

        private static string _mLoginUrl;
        public static string LoginUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mLoginUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mLoginUrl))
                        {
                            _mLoginUrl = ConfigurationManager.AppSettings["LoginUrl"];
                        }
                    }
                }
                return _mLoginUrl;
            }
        }

        private static string _mRegisterUrl;
        public static string RegisterUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mRegisterUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mRegisterUrl))
                        {
                            _mRegisterUrl = ConfigurationManager.AppSettings["RegisterUrl"];
                        }
                    }
                }
                return _mRegisterUrl;
            }
        }
        private static string _mGetUserUrl;
        public static string GetUserUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetUserUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetUserUrl))
                        {
                            _mGetUserUrl = ConfigurationManager.AppSettings["GetUserUrl"];
                        }
                    }
                }
                return _mGetUserUrl;
            }
        }
        private static string _mUpLoadHeadUrl;
        public static string UpLoadHeadUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mUpLoadHeadUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mUpLoadHeadUrl))
                        {
                            _mUpLoadHeadUrl = ConfigurationManager.AppSettings["UpLoadHeadUrl"];
                        }
                    }
                }
                return _mUpLoadHeadUrl;
            }
        }

        private static string _mGetAreaUrl;
        public static string GetAreaUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetAreaUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetAreaUrl))
                        {
                            _mGetAreaUrl = ConfigurationManager.AppSettings["GetAreaUrl"];
                        }
                    }
                }
                return _mGetAreaUrl;
            }
        }

        private static string _mSetUserUrl;
        public static string SetUserUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mSetUserUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mSetUserUrl))
                        {
                            _mSetUserUrl = ConfigurationManager.AppSettings["SetUserUrl"];
                        }
                    }
                }
                return _mSetUserUrl;
            }
        }

        private static string _mSendSmsUrl;
        public static string SendSmsUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mSendSmsUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mSendSmsUrl))
                        {
                            _mSendSmsUrl = ConfigurationManager.AppSettings["SendSmsUrl"];
                        }
                    }
                }
                return _mSendSmsUrl;
            }
        }

        private static string _mResetPwdUrl;
        public static string ResetPwdUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mResetPwdUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mResetPwdUrl))
                        {
                            _mResetPwdUrl = ConfigurationManager.AppSettings["ResetPwdUrl"];
                        }
                    }
                }
                return _mResetPwdUrl;
            }
        }

        private static string _mGetHotDestUrl;
        public static string GetHotDestUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetHotDestUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetHotDestUrl))
                        {
                            _mGetHotDestUrl = ConfigurationManager.AppSettings["GetHotDestUrl"];
                        }
                    }
                }
                return _mGetHotDestUrl;
            }
        }

        private static string _mGetDestDetailUrl;
        public static string GetDestDetailUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetDestDetailUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetDestDetailUrl))
                        {
                            _mGetDestDetailUrl = ConfigurationManager.AppSettings["GetDestDetailUrl"];
                        }
                    }
                }
                return _mGetDestDetailUrl;
            }
        }

        private static string _mGetCommentUrl;
        public static string GetCommentUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetCommentUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetCommentUrl))
                        {
                            _mGetCommentUrl = ConfigurationManager.AppSettings["GetCommentUrl"];
                        }
                    }
                }
                return _mGetCommentUrl;
            }
        }

        private static string _mAddCommentUrl;
        public static string AddCommentUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mAddCommentUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mAddCommentUrl))
                        {
                            _mAddCommentUrl = ConfigurationManager.AppSettings["AddCommentUrl"];
                        }
                    }
                }
                return _mAddCommentUrl;
            }
        }

        private static string _mGetSceneTagUrl;
        public static string GetSceneTagUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetSceneTagUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetSceneTagUrl))
                        {
                            _mGetSceneTagUrl = ConfigurationManager.AppSettings["GetSceneTagUrl"];
                        }
                    }
                }
                return _mGetSceneTagUrl;
            }
        }
        private static string _mGetSceneListUrl;
        public static string GetSceneListUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetSceneListUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetSceneListUrl))
                        {
                            _mGetSceneListUrl = ConfigurationManager.AppSettings["GetSceneListUrl"];
                        }
                    }
                }
                return _mGetSceneListUrl;
            }
        }
        private static string _mGetSceneDetailUrl;
        public static string GetSceneDetailUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetSceneDetailUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetSceneDetailUrl))
                        {
                            _mGetSceneDetailUrl = ConfigurationManager.AppSettings["GetSceneDetailUrl"];
                        }
                    }
                }
                return _mGetSceneDetailUrl;
            }
        }

        private static string _mGetScenePicUrl;
        public static string GetScenePicUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetScenePicUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetScenePicUrl))
                        {
                            _mGetScenePicUrl = ConfigurationManager.AppSettings["GetScenePicUrl"];
                        }
                    }
                }
                return _mGetScenePicUrl;
            }
        }
        private static string _mGetHotTripUrl;
        public static string GetHotTripUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetHotTripUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetHotTripUrl))
                        {
                            _mGetHotTripUrl = ConfigurationManager.AppSettings["GetHotTripUrl"];
                        }
                    }
                }
                return _mGetHotTripUrl;
            }
        }
        private static string _mBaiDuAsk;
        public static string BaiDuAsk
        {
            get
            {
                if (string.IsNullOrEmpty(_mBaiDuAsk))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mBaiDuAsk))
                        {
                            _mBaiDuAsk = ConfigurationManager.AppSettings["BaiDuAsk"];
                        }
                    }
                }
                return _mBaiDuAsk;
            }
        }

        private static string _mBaiDuWeatherUrl;
        public static string BaiDuWeatherUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mBaiDuWeatherUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mBaiDuWeatherUrl))
                        {
                            _mBaiDuWeatherUrl = ConfigurationManager.AppSettings["BaiDuWeatherUrl"];
                        }
                    }
                }
                return _mBaiDuWeatherUrl;
            }
        }

        private static string _mPictureUrl;
        public static string PictureUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mPictureUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mPictureUrl))
                        {
                            _mPictureUrl = ConfigurationManager.AppSettings["PictureUrl"];
                        }
                    }
                }
                return _mPictureUrl;
            }
        }

        private static string _mSetCommentLikeUrl;
        public static string SetCommentLikeUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mSetCommentLikeUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mSetCommentLikeUrl))
                        {
                            _mSetCommentLikeUrl = ConfigurationManager.AppSettings["SetCommentLikeUrl"];
                        }
                    }
                }
                return _mSetCommentLikeUrl;
            }
        }

        private static string _mGetMyCommentUrl;
        public static string GetMyCommentUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetMyCommentUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetMyCommentUrl))
                        {
                            _mGetMyCommentUrl = ConfigurationManager.AppSettings["GetMyCommentUrl"];
                        }
                    }
                }
                return _mGetMyCommentUrl;
            }
        }

        private static string _mGetApplyInfoByOpenIDUrl;
        public static string GetApplyInfoByOpenIDUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mGetApplyInfoByOpenIDUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mGetApplyInfoByOpenIDUrl))
                        {
                            _mGetApplyInfoByOpenIDUrl = ConfigurationManager.AppSettings["GetApplyInfoByOpenIDUrl"];
                        }
                    }
                }
                return _mGetApplyInfoByOpenIDUrl;
            }
        }

        private static string _mUserActionUrl;
        public static string UserActionUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_mUserActionUrl))
                {
                    lock (MLocker)
                    {
                        if (string.IsNullOrEmpty(_mUserActionUrl))
                        {
                            _mUserActionUrl = ConfigurationManager.AppSettings["UserActionUrl"];
                        }
                    }
                }
                return _mUserActionUrl;
            }
        }
    }
}
