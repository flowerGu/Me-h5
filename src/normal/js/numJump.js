;
(function($){
	$.fn.extend({
		numJump: function(options) {
			var o = {
				sNum:0,// * 原始数字,默认从页面元素中取，设置后会覆盖页面的数字---一般用来设置js中产生的数字显示在页面(支持将金钱格式的数字传入)
				format:"M",// * 输出金钱格式标示
				n:2,// * 默认小数点后保留两位
				fTime:1000,//default模式下跳动完成时间1s
				f:1,//跳动多少次
				jumpType:"1",//0 -数字所有位数一起变化   1--从最低位依次变化
				
				//只有jumpType==1，stepbytpye，stepbybit两者才有效
				stepbytpye:1,//1--一位跳动一次时间固定为stepbybit，不是1--一位跳动完毕时间固定为stepbybit
				stepbybit:200,//jump==1&&stepbytpye=1时，此设置代表一位跳动一次时间;jump==1&&stepbytpye!=1时每一位变化完毕所需时间，即：那一位数越大，此位变化完毕所需时间更长
				//
				
				callback:null//跳动完的回调fn(num) num-最终数字
			};
			o = $.extend(o,options);
			var _this=this;
			if(!o.sNum){
				o.sNum=parseFloat(_this.text().replace(/[,]/g, ""));//try catch？
			}
			if("1"==o.jumpType){
				var num=o.sNum+"";
				var num_arr=num.split("").reverse();
				var start_num=0;
				var index=0;
				growNum(num_arr[index]);
			}else{
				o.f=Math.ceil(o.fTime/100);
				o.step=o.sNum/o.f;
				var aa=0.4;
				var tamp=0;
				var numTimer=setInterval(function(){
					tamp=parseFloat(tamp)+parseFloat(o.step);
					_this.text(formatM(tamp,o.n,o.format));
					if(tamp>=o.sNum){
						_this.text(formatM(o.sNum,o.n,o.format));
						if(typeof(o.callback)=="function"){
							o.callback(o.sNum);//fn(num)
						}
						clearInterval(numTimer);
					}
				},100);
			}
			return $(this);
			
			function growNum(){
				if(num_arr[index]!="."){
					var timer=setInterval(function(){
						start_num++;
						if(start_num>num_arr[index]){
							index++;
							_this.text(formatM(num.substring(num.length-index,num.length),o.n,"M4") );//num.substring(num.length-index,num.length)===num.substr(-1,index)
							start_num=0;
							clearInterval(timer);
							if(index>=num_arr.length){
								index=0;
								return;
							}else{
								growNum();
							}
							
						}else{
							_this.text(formatM( start_num+""+num.substring(num.length-index,num.length),o.n,"M4")  );
						}
						
					},o.stepbytpye==1?o.stepbybit:o.stepbybit/num_arr[index]);//  stepbybit(200)-->每一位总的变化时间   #### stepbybit(200)/num_arr[index]-->每一位变化一次所需时间，即：那一位数越大，此位变化完毕所需时间更长
					
				}else{
					index++;
					_this.text(formatM(num.substring(num.length-index,num.length),o.n,"M4")  );
					growNum();
				}
				
			}
		},
		imageNumJump:function(options){
			//待实现-新的图片数字跳动
			
		}
	});
	
	//numJump
	function formatM(num,n,format){//数字，保留小数点位数,格式化类别
		if("M"==format){//格式化--金钱形式
			return numFormat1(num,n,format);
		}else if("M2"==format){
			return numFormat2(num,n,format);
		}else if("M4"==format){
			return numFormat4(num,n,format);
		}else {//无格式
			return numFormatNull(num,n,format);
		}
	}
	
	
	
	
	
	
	
	//1、numJump数字---金钱格式+保留小数
	function numFormat1(num,n,format){
		if(num <= 0){
			var temp="";
			for(var i=0;i<n;i++){
				if(i==0){
					temp+=".0";
				}else{
					temp+="0";
				}
			}
			return num+temp;
		}else{
			num = parseFloat((num + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
			var l = num.split(".")[0].split("").reverse(), r = num.split(".")[1]; 
			t = ""; 
			for (i = 0; i < l.length; i++) { 
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
			} 
			return  n?(t.split("").reverse().join("") + "." + r):(t.split("").reverse().join(""));
		}
	}
	
	//2、数字新的格式
	function numFormat2(num,n,format){
		if(num <= 0){
			var temp="";
			for(var i=0;i<n;i++){
				if(i==0){
					temp+=".0";
				}else{
					temp+="0";
				}
			}
			return num+temp;
		}else{
			//待实现
			
		}
		
	}
	
	//3、numJump数字---无格式+保留小数
	function numFormatNull(num,n,format){
		if(num <= 0){
			var temp="";
			for(var i=0;i<n;i++){
				if(i==0){
					temp+=".0";
				}else{
					temp+="0";
				}
			}
			return num+temp;
		}else{
			num = parseFloat((num + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
			return num;
		}
	}
	//4、numJump数字---专属依次跳动的金钱格式
	function numFormat4(num,n,format){
		if(num.length==1){
			return num.indexOf(".")>0?"0.0"+num:numFormat41(num,n);
		}else if(num.length==2){
			return num.indexOf(".")>0?"0."+num:numFormat41(num,n);
		}else{
			if(num <= 0){
				var temp="";
				for(var i=0;i<n;i++){
					if(i==0){
						temp+=".0";
					}else{
						temp+="0";
					}
				}
				return num+temp;
			}else{
				num = parseFloat((num + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
				var l = num.split(".")[0].split("").reverse(), r = num.split(".")[1]; 
				t = ""; 
				for (i = 0; i < l.length; i++) { 
					t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
				} 
				return  n?(t.split("").reverse().join("") + "." + r):(t.split("").reverse().join(""));
			}
			
		}
		
	}
	function numFormat41(num,n){
		var temp="";
		for(var i=0;i<n;i++){
			if(i==0){
				temp+=".0";
			}else{
				temp+="0";
			}
		}
		return num+temp;
	}
	
	
	
})(jQuery);