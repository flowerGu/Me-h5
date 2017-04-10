function add(me) {
    var message = '银行资金托管';
    var result = '';
    var adMessage = '银行资金托管';
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var t = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    var adjson = JSON.parse(localStorage.getItem("adjson"));
    if (adjson != null) {
        adMessage = adjson.adMessage;
        t = adjson.adtime;
    }
    else {
        $.ajax({
            url: ADMESSAGE_JSON_URL,
            version: app_data.version,
            type: 'post',
            data: {},
            async: false,
            dataType: 'json',
            success: function (data) {
                if (data.list != null) {
                    adMessage = data.list[0].adMessage;
                }
            }
        })
    }
    result += '<div  class="jszc">Me金融服务由民信技术中心提供</div>';
    result += '<div id="resetload">';
    result += '<div class="resetload_left">';
    result += '<img src="./images/refresh.png">';
    result += ' </div>';
    result += '<div class="resetload_right">';
    result += '<p class="adMessage">' + adMessage + '</p>';
    result += '<p class="adtime">最近更新时间：<span id="adtime" >' + t + '</span></p>';
    result += '</div>';
    result += '</div>';
    return result;
}
var result = add();
var droploadbody = $('body').dropload({
    distance: 100,
    loadUpFn: function (me) {

        // $.ajax({
        //     url: ADMESSAGE_JSON_URL,
        //     type: 'post',
        //     version: app_data.version,
        //     data: {},
        //     async: false,
        //     dataType: 'json',
        //     success: function (data) {
        //         var date = new Date();
        //         var year = date.getFullYear();
        //         var month = date.getMonth() + 1;
        //         var day = date.getDate();
        //         var hour = date.getHours();
        //         var minute = date.getMinutes();
        //         var second = date.getSeconds();
        //         var t = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        //         var adjson = JSON.parse(localStorage.getItem("adjson"));
        //         var id = 0;
        //         if (adjson != null) {
        //             id = adjson.id;
        //             if (data.list != null) {
        //                 if ((id + 1) == data.list.length) {

        //                     id = 0;
        //                 }
        //                 else {
        //                     id++;
        //                 }
        //                 adjson.id = id;
        //                 adjson.adMessage = data.list[id].adMessage;
        //             }

        //         }
        //         else {
        //             var adjson = {};
        //             adjson.id = 0;
        //             if (data.list != null) {
        //                 adjson.adMessage = data.list[0].adMessage;
        //             }
        //             else {
        //                 adjson.adMessage = "银行资金托管";
        //             }
        //         }
        //         adjson.adtime = t
        //         localStorage.setItem("adjson", JSON.stringify(adjson));
        //     }
        // });
        // me.resetload();
    },
    touchend: function (me) {
        //      var result = add();
        me.opts.domUp.domRefresh = result;
        me.opts.domUp.domUpdate = result;
        me.opts.domUp.domLoad = result;
    }
});