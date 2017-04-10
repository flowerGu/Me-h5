var bid_id=getQueryString('id'),
    tokenid=getCookie('tokenid')?getCookie('tokenid'):getQueryString('tokenid'),
    examineLoanTypeCd=null;
window.onload = function(){
    if(!tokenid){
        tip_window('您还未登录','确定');
        return false;
    }
    $.ajax({//标的详情
        url:BIDSECDETAILS_JSON_URL,
        type:'post',
        data:{
            version:app_data.version,
            tokenid:tokenid,
            bid_id:bid_id
        },
        success:function(data){
            if(data.code=='000'){
                data.bidId = bid_id;
		data.examineLoanTypeCd = data.examineLoanTypeCd=='13'?true:false;//高端贷
		examineLoanTypeCd = data.examineLoanTypeCd;
                data.transferType = data.transferType == '0'?true:false;//true为转让，0其他
                data.year_reat=parseFloat(data.year_reat*100).toFixed(3);
                data.start_invest_money=parseFloat(data.start_invest_money).toFixed(2);//起借金额
                data.max_invest_money=parseFloat(data.max_invest_money).toFixed(2);//最高出借
                data.is_real_name=data.is_real_name=='1'?'已审核':'未审核';//实名
                data.is_tel=data.is_tel=='1'?'已审核':'未审核';//手机认证
                data.is_basic_auth=data.is_basic_auth=='1'?'已审核':'未审核';//个人基本认证
                data.is_email=data.is_email=='1'?'已审核':'未审核';//邮箱认证
                data.succeedborrow=data.succeedborrow || 0;//成功借款笔数
                data.rentalmoney=parseFloat(data.rentalmoney || 0).toFixed(2);//借款总额
                data.givebacknum=data.givebacknum || 0;//还清笔数
                data.borrownum=data.borrownum || 0;//申请借款笔数
               data.incomereport = data.incomereport == '0' ? '无' : '有';//收入证明
               data.creditreport = data.creditreport == '0' ? '无' : '有';//信用报告
               data.bankinfo = data.bankinfo == '1' ? '已审核' : '未审核';//银行卡信息
            //    data.car_info_cd = ['', '有车无贷款', '有车有贷款'][data.car_info_cd] || '未评估';//车产
               data.industy_categories = ['自营业主', '公司职员', '离/退休人士', '自由职业者', '其它'][data.industy_categories] || '无';//从事行业
            //    data.household_register_cd = ['', '有房无贷款', '有房有贷款', '未评估', '按揭自置', '无按揭自置'][data.household_register_cd] || '未评估';//房产
                data.caris_assess = data.caris_assess==0?'未评估':'已评估';//车产评估
                data.houseis_assess = data.houseis_assess==0?'未评估':'已评估';//房产评估
               //标的类型 c1:信用贷  c2:房贷 c3:车贷
               if(data.bid_type.toUpperCase()=='C2'){
                    data.bid_type_pledge=true;
                    $.ajax({
                         url: TOPLEDGESECDETAILS,
                         type: 'post',
                         data: {
                              tokenid: tokenid,
                              bid_id: bid_id
                         },
                         async:false,
                         success: function (data1) {
                              if (data1.code == '000') {
                                   for (var i in data1) {
                                        data[i] = data1[i];
                                   }
                                   data.pawn='';
                                   var pawnArr=[];
                                   data.province?pawnArr.push(data.province):pawnArr;
                                   data.city?pawnArr.push(data.city):pawnArr;
                                   data.county?pawnArr.push(data.county):pawnArr;
                                   data.pawn=pawnArr.join(' ') + ' ' + data.houseaddress;//抵押物名称
                                   data.Housepropertynumber = data.Housepropertynumber == '1' ? '已审核' : '无';//房屋产权证
                                   data.propertynature = ['', '商品房', '自建房', '其他', '经济适用房', '拆迁安置房', '房改房', '老房子'][data.propertynature] || '其他';//房屋性质
                                   data.is_housingmaterial = data.is_housingmaterial == '1' ? '已审核' : '未审核';//他项权证
                                   data.is_othermaterial = data.is_othermaterial == '1' ? '已审核' : '未审核';//其他资料
                                   data.is_loancontract = data.is_loancontract == '1' ? '已审核' : '未审核';//借款合同及抵质押合同
                                   data.is_idnumber = data.is_idnumber == '1' ? '已审核' : '未审核';//借款人身份证
                                   data.is_pledgeman = data.is_pledgeman == '1' ? '已审核' : '未审核';//抵押权人
                              }
                         }
                    })
               }else{
                    data.bid_type_pledge=false;
               }
               var template=$('#detail').html();
               $('#bidCommon').append(Mustache.render(template, data));
			   $('#returnMoney').on('click',function(){
				   if(examineLoanTypeCd){
						window.location.href='/me-h5/plan_gather.html';
					}
			   })
               $('.certificate').on('click',function(){
                    if(!tokenid){
                         tools.dialog({
                              title:'请登录',
                              content:'只有Me金融的平台用户才有权限查看资料披露信息请登录后再查看！',
                              btn:['取消','登录'],
                              cb:['','login.html']
                         })
                    }else{
                         window.location.href='/me-h5/certificate.html?tokenid='+tokenid+'&bid_id='+bid_id;
                    }
               })
          }else{
              tip_window(data.msg,'确定');
          }
     }
})




