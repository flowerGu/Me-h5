var obj = investDetail();
$(function(){
     if(obj.channel!='5'){
          $('.header').show()
     }
     $.ajax({
          url:QUESTIONNAIRE_JSON_URL,
          type:'post',
          data:{version:app_data.version,
               tokenid:obj.tokenid,
               quesType:obj.quesType
          },
          dataType:'json',
          success:function(data){
               if(data.code=='000'){
                    var arrChoose=['A','B','C','D','E','F','G']
                    $.each(data.questionList,function(i,item){//选项
                         item.outerstatus=i+1;
                         for(var j=0;j<data.questionList[i].choose.length;j++){
                              data.questionList[i].choose[j].status=arrChoose[j];
                         }
                    })
                    var result = Mustache.render($('#riskList').html(), data);
                    $('.risk_wrap').append(result);
                    $('.riskQues').find('input').click(function(){
                         $(this).parent().parent().parent().find('span').removeClass('seleBtn').addClass('unSeleBtn');
                         $(this).parent().find('span').removeClass('unSeleBtn').addClass('seleBtn');
                    })
               }
          }
     })
})
function backFn(){
     if(obj.channel=='3'){
          window.localStorage.setItem('noTest','1');//来源我的资产，未测试
     }
     window.history.back(-1);
}
function save(){
     var i=0;
     $('.riskQues').each(function(){
          var val=$(this).find('input[type=radio]:checked').val();
          if(val==undefined){
               i++;
          }
     })
     if(i>0){
          tip_window("请将信息填写完整",'确定');
          return false;
     }
     tip_risk_refer('提交确认','本人保证以上所填全部信息为本人真实的意思表示，并接受贵公司评估意见。','确定','取消','submit()');
}
function submit(){
     var choose;
     var answer ="[";
     $('.riskQues>p').each(function(i,item){
          var questionId=parseFloat($(this).attr('id'));//问题
          choose=$(this).next('ul').find('input[type=radio]:checked').val();//选项
          answer=answer+'{"questionId":'+questionId+',"quesId":'+choose+'}'+',';
     })
     answer=answer.substr(0,answer.length-1)
     answer= answer+"]";
     $.ajax({
          url:SAVEQUESTIONNAIRE_JSON_URL,
          type:'post',
          data:{
               version:app_data.version,
               tokenid:obj.tokenid,
               answerList: answer,
               quesType:obj.quesType
          },
          dataType:'json',
          success:function(data){
               if(data.code=='000'){
                    var history=window.document.referrer;
                    if(obj.channel!=='5'){
                         var isBandData=JSON.parse(localStorage.getItem('isBandData'));
                         isBandData.is_ratechart='1';
                         window.localStorage.setItem('isBandData',JSON.stringify(isBandData));
                         localStorage.setItem('history',history);
                    }
                    window.location.href='risk_level_result.html?tokenid='+obj.tokenid+'&quesType='+obj.quesType+'&channel='+obj.channel;
               }
          },
          error:function(data){
          }
     })
}