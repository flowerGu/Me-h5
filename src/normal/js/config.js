//生产环境地址
var host = '/me-front/'; //develop
var host1 = 'https://devcms.mejinrong.com:4430/me-cms/commProController/'; // 开发环境
var H5_HOST='//me.mejinrong.com/me-h5/';
var bill_HOST='//zdcx.minxinjituan.com/';
// 测试及开发环境地址
// var host='http://124.65.99.54:8048/me-front/';//准生产
// var bill_HOST = '//192.168.9.220:8080/';
var appDownload = {
  android: 'http://a.app.qq.com/o/simple.jsp?pkgname=mxbapp.zrmx.com.minxinbao',
  ios: 'https://itunes.apple.com/cn/app/id1080260971'
};

var app_data = {
  version: '3.7.2',
  tel: '4000443888转6',
  type: 'h5'
};

// 公用
var BRANCH_BANK_INFO_URL = host + 'branchbankinfo.json';          //模糊查询分行支行信息
var RISK_WARNING_JSON_URL  = host + 'riskWarning.json';          //首页风险提示书
// 三项开关
var THREE_SWITCH_QUERY_URL = host + 'threeswitchquery.json';      //三项开关查询
var THREE_SWITCH_INDEX = host + 'threeswitchindex.json';          //三项开关首页产品列表

//债权列表
var NEW_BILL_DETAIL_URL = host + 'newbillDetail.json';            //不打码债权列表,获取名字,身份证号等不打码信息
var FIRST_BILL_DETAIL_URL = host + 'toApp.json';                  //账单详情首期
var BILL_DETAIL_URL = host + 'toAppOther.json';                   //账单详情 非 首期
var GET_LIST_ORDER = host + 'appList.json';                       //账单列表
var GET_CHECK_CODE_VIEW_BILL = host + 'telephoneCode.json';       //获取验证码（债权列表）
var AUTH_VIEW_BILL = host + 'findSmsByPhonenCode.json';           //验证债权列表查看权限（检查验证码）

// 代付-融宝
var PROXY_WITHDRAW_URL = host + 'proxywithdraw.json';                     //首次代付提现接口
var PROXY_BANK_INFO_LIST_URL = host + 'bankinfolist.json';                //支持银行卡 列表
var PROXY_RECHARGE_INIT_URL = host + 'proxyrechargeinit.json';            //准备非首次充值数据
var PROXY_RECHARGE_CHECKCODE_URL = host + 'proxyrechargecheckcode.json';  //首次绑卡加充值、充值购买接口
var PROXY_BLANCE_PAY_URL = host + 'proxyblancepay.json';                  //余额支付接口   余额支付发送验证码
var PROXY_PAY_COFIRM_URL = host + 'payconfirm.json';                      //融宝支付确认接口  //短信验证码验证
var PROXY_PAY_CHECKCODE_URL = host + 'proxypay.json';                     //非首次支付发送验证码
var PROXY_PAY_CODEREPLAY_URL = host + 'proxycheckcodereplay.json';        //代付重发短信验证码
var PROXY_PAY_REQUEST_URL = host + 'payrequest.json';                     //通过该接口查询支付请求页面参数
var BANK_LIST_URL = host + 'bankidlist.json';                              //用户绑卡列表
var PROXY_WITHDRAW_COMMON_INFO_URL = host + 'withdrawcommoninfo.json';    //首次提现，准备
var PROXY_RECHARGE_INIT_FIRST_URL = host + 'proxyrechargeinit_first.json';//平台默认起充金额
var PROXY_WITHDRAW_SMS_URL = host + 'proxywithdrawsms.json';              //提现的短信重发接口
var PROXY_WITHDRAW_INIT_URL = host + 'proxywithdrawinit.json';            //提现的短信重发接口
var PLATFORMTRADECHECKCODE_JSON_URL = host + 'platformtradecheckcode.json';//验证平台交易密码验证码
var PROXYQUERYACCOUNT_JSON_URL = host + 'proxyqueryaccount.json';          //代付账户信息
var PROXYASSETSDETAIL_JSON_URL = host + 'proxyassetsdetail.json';          //代付资产明细查询
var PAYREQUEST_JSON_URL = host + 'payrequest.json';                        //支付请求

// 登录注册修改密码
var LOGIN_JSON_URL = host + 'login.json';                          			          //登录页面接口
var REGISTER_JSON_URL = host + 'register.json';                      			        //注册接口
var GETSLIDEIMGAGE = host + 'newImgCode.json';                                    //生成算式验证码第一步
var GETSLIDEQUESTION = host + 'getCalcuImg.json';                                 //生成问题图片
var GETSLIDEANSWER = host + 'getAnswerImg.json'; 	                                //生成答案图片
var SLIDEIMGISTRUE = host + 'checkImgCode.json';                                   //对比答案是否正确
var GETSENDMSGCODE = host + 'checkcode.json';                                     //发送短信验证码
var CREATEQRCODE_URL = host + 'createTwoDimensional.json';                        //生成分享链接二维码
var FP_VERIFICATIONIDCARD_JSON_URL = host + 'fp_VerificationIdCard.json';				  //忘记交易密码--验证验身份证
var FPT_VERIFICATIONIDCARD_JSON_URL = host + 'fpt_VerificationIdCard.json';				//忘记交易密码--验证验身份证
var FORGETPASSWORDLOGINTEL_JSON_URL = host + 'forgetpasswordlogintel.json';       //忘记登录密码--提交登录手机号
var FORGETPASSWORD_JSON_URL = host + 'forgetpassword.json';					              //忘记登录密码--修改密码
var MODIFYPASSWORD_JSON_URL = host + 'modifypassword.json';					              //修改登录密码
var PLATFORMTRADEPWD_JSON_URL = host + 'platformtradepwd.json';                    //设置平台交易密码
var PLATFORMTRADEPWDCHECK_JSON_URL = host + 'platformtradepwdcheck.json';          //验证旧密码
var LOGINOUT_JSON_URL = host + 'loginOut.json';                                    //退出

// 页面信息
var BANNER_JSON_URL = host + 'banner.json';            					          //获取首页Banner信息
var PRODUCTS_JSON_URL = host + 'products.json';            				        //获取首页项目详情接口
var GETICONLIST_JSON_URL = host + 'getICONList.json';                      //获取ICON图标
var GETDETAIL_JSON_URL = host + 'getdetail.json';            					    //我的账户首页
var ASSETSDETAIL_JSON_URL = host + 'assetsdetail.json';            				//资产明细
var INVESTS_JSON_URL = host + 'invests.json';            					        //已投项目（分页）
var STATISTICS_URL = host + 'turnoverdetail.json';                        //数据统计
var QUESTIONNAIRE_JSON_URL = host + 'questionnaire.json';                  //风险测评问题列表
var SAVEQUESTIONNAIRE_JSON_URL = host + 'saveQuestionnaire.json';         //提交风险测评答题
var SEARCHRATECHART_URL = host + 'searchratechart.json';                  //风险测评答案
var MESSAGES_JSON_URL = host + 'messages.json';            					      //消息中心(分页)
var MESSAGESOPRATE_JSON_URL = host + 'messagesoprate.json';					      //消息中心(已读未读删除)
var BIDS_JSON_URL = host + 'bids.json';                                    //标的列表
var BIDONEDETAILS_JSON_URL = host + 'bidonedetails.json';                  //标的详细一级
var BIDSECDETAILS_JSON_URL = host + 'bidsecdetails.json';                  //标的详细二级
var BIDRECORD_JSON_URL = host + 'bidrecord.json';                          //参与记录
var ADMESSAGE_JSON_URL = host + 'adMessage.json';                          //广告词
var HOUSEPROPERTYLIST  = host+'housePropertyList.json';                   //证明资料
var TOPLEDGESECDETAILS  =host+'topledgesecdetails.json';                   //房产车产信息
var JDMANAGERORDERS_JSON_URL = host + 'jdmanagerorders.json';              //订单查询
var NEWPRODUCTS_JSON_URL = host + 'producttype.json';                      //返回产品类型列表
var PRODUCTINTROINFO_JSON_URL = host + 'productIntroInfo.json';            //产品详情

//金盾（江西银行）
var OPEN_AN_ACCOUNT_URL = host + 'jxyhregister.json';                     //江西银行（开户)
var JX_ACCOUNT_NEW_URL = host + 'jxyhnewregister.json';                   //江西银行开户（跳江西页面）
var JXYH_BIND_CARD_URL = host + 'jxyhbindcard.json';                      //江西银行-绑卡
var JX_BINDCARD_NEW_URL = host + '/jxyhbindcardnew.json';                 //江西绑卡新街口（跳江西页面）
var JXYH_UNBIND_CARD = host + 'jxyhunbindcard.json';                      //江西银行解绑
var JXYH_WITH_DRAW_URL = host + 'jxyhwithdraw.json';                      //江西银行提现
var WITHDRWA_NOTICE_URL = host + 'withdrawNotice.json';                //江西银行提现须知
var BANK_LIST_SUPPORT_URL = host + 'bankListByJx.json';                  //江西银行支持银行卡列表
var BANK_CNAPS_URL = host + 'bankcnaps.json';                             //江西银行提现查询联行行号
var BANK_LIST_URL = host + 'bankidlist.json';                             //新的获取银行卡列表
var SYNC_BALANCE_URL = host + 'jxyhsynbalance.json';                      //同步余额，用于江西银行充值后。。
var QUERY_DEPOSITORY = host + 'querydepository.json';                     //存管账户查询
var CHECK_ID_NUMBER_URL = host + 'checkidnumber.json';                    //实名认证身份证号排重
var JD_SAFEAUTH_JSON_URL = host + 'jdsafeauth.json';                      //安全认证
var JD_ASSETSDETAIL_JSON_URL = host + 'jdassetsdetail.json';              //资产明细
var JD_GETAMTLIMIT_URL = host + 'getjdamtlimit.json';                     //获取金盾限额
var JD_GET_DETAIL_URL = host + 'getjddetail.json';                        //金盾账户首页
var JD_SET_TRADEPWD_URL = host + 'jxyhsettradepwd.json';                  //修改/设置交易密码
var JD_CAPITAL_RECORDS = host + 'jdcapitalrecords.json';                  //金盾资金记录
var JDINVESTS_JSON_URL = host + 'jdinvests.json';                          //已投项目-->金盾
var CAPITALRECORD_JSON_URL = host + 'capitalrecord.json';                  //客户列表-->金盾
var JDCUSTOMERDETAIL_JSON_URL = host + 'jdcustomerdetail.json';            //客户列表详细-->金盾
var JDTEAMMGRQUERY_JSON_URL = host + 'jdteammgrquery.json';                //团队尊享-->金盾
var JDMANGQUERYMYREFER_JSON_URL = host + 'jdmangquerymyrefer.json';        //我的邀请-->金盾
var BACKAMOUNT_JSON_URL = host + 'backamount.json';                        //回款计划--》金盾
var BIDCOMPLETEDETAILS_JSON_URL = host + 'bidcompletedetails.json';        //标的返回成功-->金盾
var ISPOPUP_JSON_URL = host + 'isPopup.json';                             //弹框江西银行
var BIDTOPAY_JSON_URL = host + 'bidtopay.json';                           //标的产品购买
var TOPAYJXCHECKCODE_JSON_URL = host + 'topayjx/checkcode.json';          //标的购买短信验证
var DEBT_ARGEEMENT_TRANSFER_URL = host + 'debtAgreementTransfer';        //债权转让授权
var BIDS_TRANSFER_URL = host + 'bidsTransfer.json';        // 获取债转列表
var BIDTRANSFERTOPAY = host + '/bidTransferToPay.json'//债权转让标的购买
//中金
var ZJ_ASSETSDETAIL_URL = host + 'assetsdetail.json';                                   //中金资产详情
var PROJECT_DETAIL_URL = host + 'productdetail.json';                                   //获取产品详细
var CUSTOMERQUERY_JSON_URL = host + 'customerquery.json';					                      //查询用户信息
var SAFEAUTH_JSON_URL = host + 'jdsafeauth.json';						                              //安全认证
var EQUIPMENT_JSON_URL = host + 'equipment.json';						                            //登陆投资设备信息接口
var BINDBANKAPI_JSON_URL = host + 'bindbankapi.json';						                        //绑定银行卡
var FPT_VERIFICATIONCHECKCODE_JSON_URL = host + 'fpt_VerificationCheckCode.json';				//忘记交易密码--验证验验证码
var GETAMTLIMIT_JSON_URL = host + 'getamtlimit.json';				                            //获取限额
var CPCNREGISTER_JSON_URL = host + 'cpcnregister.json';				                          //中金注册
var CPCNBINDBANK_JSON_URL = host + 'cpcnbindbank.json';				                          //中金绑卡
var CPCNWITHDRAW_JSON_URL = host + 'cpcnwithdraw.json';				                          //中金提现
var CPCNAUTOTRANSFER_JSON_URL = host + 'cpcnautotransfer.json';				                  //中金自动签约
var ZJSAFEAUTO_JSON_URL = host + 'jdsafeauth.json';                                        //中金余额支付
var ZJQUERYPAYRESULT_JSON_URL = host + 'zjquerypayresult.json';                          //中金回调产品出借

// 民信专享
var QUERYINTENTCUST_JSON_URL = host + 'queryintentcust.json';				                    //意向客户列表
var SHOWINTENTCUST_JSON_URL = host + 'showintentcust.json';				                      //意向客户详情
var CHANGEINTENTCUST_JSON_URL = host + 'changeintentcust.json';				                  //意向客户修改
var INSERTINTENTCUST_JSON_URL = host + 'insertintentcust.json';				                  //意向客户新增
var TEAMMGRQUERY_JSON_URL = host + 'teammgrquery.json';                                 //团队经理查询
var TeamMGRNAMELIST_JSON_URL = host + 'teammgrnamelist.json';                            //团队经理列表
var APPSHARE_JSON_URL = host + 'appshare.json';                                          //经理分享接口
var MANAGERINDEX_JSON_URL = host + 'managerindex.json';            		                  //客户经理首页
var CUSTOMERS_JSON_URL = host + 'customers.json';            					                  //客户列表（分页）
var CUSTOMERDETAIL_JSON_URL = host + 'customerdetail.json';            	                //客户详情信息
var MANAGERORDERS_JSON_URL = host + 'managerorders.json';            	                  //客户经理-订单列表（分页）
var ORDERDETAIL_JSON_URL = host + 'orderdetail.json';            					              //订单详情
var SALESPERFORMANCE_JSON_URL = host + 'salesperformance.json';                         //客户经理业绩查询
var UPMONTHPERFORMANCES_JSON_URL = host + 'upmonthperformances.json';		                //上月业绩查询--新增
var PERFORMANCES_JSON_URL = host + 'performances.json';            			                //历史业绩查询--修改
var MANAGERDETAILS_JSON_URL = host + "managershow.json";				        	              //理财专享接口-新增
var RANKINGS_JSON_URL = host + 'rankings.json';						                              //业绩TOP100(分页)
var MONTHRANKING_JSON_URL = host + 'monthRanking.json';					                        //业绩Top200(分页)
var QUERYWEALTHMGRPER_JSON_URL = host + 'queryWealthMgrPer.json';                        //查询中心尊享
var QUERYSALESTEAMNAME_JSON_URL = host + 'querySalesTeamName.json';                     //中心尊享团队名称
var JDPERFORMANCSEMONTH_JSON_URL = host + 'jdperformancesmonth.json';                   //业绩查询

// 独立功能
var FINSNCISL_LIST_URL = host + 'classificationnewlist.json';          //理财头条
var SAVEEMAIL_JSON_URL = host + 'saveEmail.json';                      //设置邮箱
var SAVEADDRESS_JSON_URL = host + 'saveorupdateaddress.json';          //设置地址
var SELECTADDRESS_JSON_URL = host + 'selectaddress.json';              //获取联系地址
var GETPROVINCECITY_JSON_URL = host + 'getProvinceCity.json';          //三级联动
var SAVEHEADIMAGE_JSON_URL = host + 'saveHeadImage.json';              //上传头像
var SHAREINFO_JSON_URL = host + 'shareinfo.json';                   //分享信息
var FEEDBACK_JSON_URL = host + 'feedback.json';						            //意见反馈
var PRIVACCOUNTLIST_JSON_URL = host + 'privaccountlist.json';			    //特权本金列表
var RED_LIST_URL = host + 'redlist.json';                             //查询红包列表
var RED_EXCHARGE_URL = host + 'redexchanger.json';                    //红包兑换
var RED_PICTUREINIT_URL = host + 'checkcodereq.json';                 //红包准备图片验证码
var RED_PICTURE_URL = host + 'checkcoderes.json';                     //红包生成图片验证码
var SYSTEMMESSAGE_JSON_URL = host + 'systemmessage.json';              //系统广播
var REFRESHBALANCE_JSON_URL = host + 'refreshbalance.json';           //余额刷新
var APPLYSIGN_JSON_URL = host + 'applysign.json';                      //申请电子签章
var CLASSIFICATIONLIST_JSON_URL = host + 'classificationlist.json';    //分类功能列表接口
var CLASSIFICATIONDETAIL_JSON_URL = host + 'classificationdetail.json';//分类功能详细接口
var MIANCLASSIFI_URL = host + 'mianClassifi.json'; //员工学习区，客户资料区
var MIANCLASSIFIDETAIL_URL = host + 'mianClassifiDetails.json';   //员工学习区、客户资料区详情接口
var CANBUY = host+'canBuy.json'          //是否有可购理财产品
var CONFIRM_AGREEMENT_URL = host + 'confirmAgreement'; //首页是否同意风险提示书
/**vip_bids */
var VIP_BIDS = host + 'vip_bids.json' //vip列表
var realname_pc = host+'realname_pc.json'//单独实名
var queryRePayPlanInfo = host + "/queryRePayPlanInfo.json" //还款计划 
var queryLoanTailList  = host + "/queryLoanTailList.json" //贷后跟踪