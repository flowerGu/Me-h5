(function(){
    var tokenid = getQueryString('tokenid'),
        // bidId = getQueryString('bidId'),
        bidId = 29,
        type = getQueryString('type');
        
        if(type == 'loan'){
            //还款计划
            document.title ='还款计划';
             getData({
                 url:queryRePayPlanInfo,
                 ele:"body",
                 tpl:"#loan"
             })
        }else{
            //贷后跟踪
            document.title ='贷后跟踪';
             getData({
                 url:queryLoanTailList,
                 ele:"body",
                 tpl:"#debt"
             })
        }
        function getData(opts){
            $.ajax({
                url:opts.url,
                data:{
                    bidId:bidId,
                    tokenid:tokenid,
                    channel:'h5'
                },
                success:function(data){
                    if(data.list.length>0 && data.list.constructor == Array){
                        for(var i =0;i<data.list.length;i++){
                            if(data.list[i].reVisitDate){
                                data.list[i].reVisitDate = data.list[i].reVisitDate.split(' ')[0];
                            }
                        }
                    }
                    $(opts.ele).append(Mustache.render($(opts.tpl).html(),data))
                }
            })
        }
})()
