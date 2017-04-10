/**
 * Created by gupeiling on 2016/10/12.
 */
'use strict';
var obj=investDetail();
$(function() {
     if(obj.channel!='5'){
          $('.header').show()
     }
     switch(obj.channel){
          case '1':
               $('#skipTo').text('返回产品出借');
               break;
          case '2':
               $('#skipTo').text('返回标的出借');
               break;
          case '3':
               $('#skipTo').text('返回我的资产');
               break;
          case '5':
               $('#skipTo').text('完成');
               break;
          default:
               $('#skipTo').text('返回个人设置');
               break;
     }
     $('#skipTo').on('click',function(){
          if(obj.channel=='5' || obj.channel=='4'){//5app端调用,4为个人设置评测后查看类型
               window.location.href='my_setting.html';
          }else{//其他来源
               var history=localStorage.getItem('history');
               window.location.href=history;
          }
     })
     $.post(SEARCHRATECHART_URL,{
          version:app_data.version,
          tokenid:obj.tokenid,
          quesType:obj.quesType
     }).then(function(data){
          if(data.code=='000'){
               $('.scoreWrap').text(data.rategrade==null?0:data.rategrade);
               $('#belongRate,#belongRate2').text(data.rate==null?'':data.rate)
               $('#evaluate').text(data.evaluate==null?'':data.evaluate);
      	       $("#create_time").text(data.rateTime == null ? '' : data.rateTime)
          }else{
               tip_window(data.msg,'确定');
          }
     },function(data){
          tip_window('网络超时','确定');
     })
  $("#refresh_result").click(function () {
    if (isWeiXin()) {
      var tokenid = getCookie("tokenid");
    } else {
      var tokenid = getQueryString("tokenid");
    }
    window.location.href = 'risk_level.html?channel=5&quesType=0&tokenid=' + tokenid;
  })
})
