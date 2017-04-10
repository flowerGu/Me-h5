/**
 * Created by Administrator on 2016/11/12.
 */
$(function(){
    var type = $(".check").data("type");
    var registerTel = getCookie("tel_no");
    $(".registerTel").html(registerTel.substring(0,3)+"****"+registerTel.substring(7,11));
    $(".chooseBox").click(function(){
        $(".chooseBox").removeClass("check");
        $(this).addClass("check");
        type = $(this).data("type");
    })
    $("#nestStep").click(function(){
        $(this).attr("href","changeTel.html?type="+type);
    })
})