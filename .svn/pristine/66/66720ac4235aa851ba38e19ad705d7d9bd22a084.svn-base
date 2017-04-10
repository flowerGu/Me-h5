 {{#list}}
<!--<li>
   <div class="product2 whitebg clearfix\">
	    <a href="my_account_detial.html?id={{ id }}" class="pro_link clearfix">{{ product_name }}
		    <em><p style="margin-right:.5em;">{{ name }}</p>
		    	<i>{{#is_online_user}}线下{{/is_online_user}}
		    	   {{^is_online_user}}线上{{/is_online_user}}
		    	</i></em>
	    </a>
	    <ul class="clearfix mgt_ul">
	     <li style="text-align: left;"><p><span class="f47"> {{years_income}} </span></p><p>过往年化收益</p></li>
	     <li><p><span class="f46"> {{ repay_progress }} </span></p><p>还款进度</p></li>
	     <li class="li_pos" style="text-align: right;"><p class="c34 pos">
	     	<span class="f55"> {{ invest_money }}</span>
	     	<span class="f55"></span></p>
	     	<p>投资金额(万)</p>
	     </li>
	    </ul>
	    <p class="infact_be">
		 	{{^wancheng}}协议年化收益(元)：{{/wancheng}}
		 	{{#wancheng}}实际收益(元)：{{/wancheng}}
		 	<span style="color:#ff6400;font-size:1.3em;">{{expire_profit}}</span>
		 	<span class="infact_re" style="color:#666">
		 		折标&nbsp;&nbsp;{{ conversions_money }}
		 	</span>
		 </p>
		 <ul class="time_ul clearfix" style="float:left;width:60%;">
		 	<li><img src="images/preserve.png"/>{{paydate}}</li>
		 	<li><img src="images/finish.png"/>{{trade_end_date}}</li>
		 </ul>
		 <p style="float:left;width:40%;padding-top:.5em;text-align:right"class="infact_be">
		 	{{#sta}}
		 		剩余<span>{{remaining_days}}</span>天 
		 	{{/sta}}
		 	{{#str}}
		 		已完成
		  	{{/str}}
		 </p>
   </div>
</li>-->
<li>
	<div class="product2 whitebg clearfix\">
		<a href="my_account_detial.html?id={{ id }}&wan_status={{#wan_status}}{{wan_status}}{{/wan_status}}{{^wan_status}}{{wan_status}}{{/wan_status}}" class="pro_link clearfix" style="font-size:1.6rem;color:#8e8e8e;">
	    	{{#pro}}
		    	{{ product_name }}
	    	{{/pro}}
	    	{{#loan}}
	    		{{loan_title}}
	    	{{/loan}}
		    <p style="float:right;font-size:1.6rem;">
		    	{{^jd}}
					{{#is_online_user}}
						<img src="images/offline_pic.png" style="width:1.6rem;height:1.6rem;margin-right:.7rem;vertical-align: middle;" />
					{{/is_online_user}}
					{{^is_online_user}}
						<img src="images/online_pic.png" style="width:1.6rem;height:1.6rem;margin-right:.7rem;vertical-align: middle;" />
					{{/is_online_user}}
				{{/jd}}
				{{#jd}}
					{{^bid_status5}}成功{{/bid_status5}}
					{{#bid_status5}}流标{{/bid_status5}}
				{{/jd}}
				{{ name }}
			</p>
		    	<!--<i>{{#is_online_user}}线下{{/is_online_user}}
		    	   {{^is_online_user}}线上{{/is_online_user}}
		    	</i></em>-->
	    </a>
		<ul class="clearfix mgt_ul">
			<li style="width:100%;text-align:center;">
				{{#wancheng}}
				<span style="float:left;color:#6fb7ff">
			 	 	<img style="width:1.5rem;height:1.7rem;margin-right:.8rem;font-weight:bold;" src="images/lan_rate_pic.png" />
			 	 	<b>{{rate_percent}}</b>
			 	 </span> {{/wancheng}} {{^wancheng}}
				<span style="float:left;color:#ff5383">
			 	 	<img style="width:1.5rem;height:1.7rem;margin-right:.8rem;font-weight:bold;" src="images/rate_pic.png" />
			 	 	<b>{{rate_percent}}</b>
			 	 </span> {{/wancheng}}
				<span><img src="images/money_pic.png" style="width:1.1rem;height:1.5rem;margin-right:.8rem;vertical-align: top;" />
				 <em style="font-size:1.22em;font-weight:bold;font-style: normal;">{{ invest_money }}</em>万
				 </span>
				<span style="float:right;font-weight:bold;"><img src="images/chai_pic.png" style="width:1.2rem;height:1.5rem;margin-right:.7rem;vertical-align: top;" />{{ conversions_money }}</span>
			</li>
			<!--<li style="text-align: left;"><p><span class="f47"> {{years_income}} </span></p><p>过往年化收益</p></li>-->
			<!--<li><p><span class="f46"> {{ repay_progress }} </span></p><p>还款进度</p></li>-->
			<!--<li class="li_pos" style="text-align: right;"><p class="c34 pos">
	     	<span class="f55"> {{ invest_money }}</span>
	     	<span class="f55"></span></p>
	     	<p>投资金额(万)</p>
	     </li>-->
			<!--<li class="li_pos" style="text-align: center;">
	     	<p class="c34 pos"><span style="color:#666;font-size:1.5em;"> {{ conversions_money }} </span>
	     	</p>
	     	<p>折标</p>
	     </li>-->
		</ul>
		<p style="font-size:1rem;color:#8e8e8e;margin-top:1.4rem;margin-bottom:1.7rem;">{{paydate}}&nbsp;&nbsp;至&nbsp;&nbsp;{{trade_end_date}}</p>
		<p style="color:#8e8e8e;">
			<span style="font-size:1.5rem;">
				{{^wancheng}}
					<img src="images/predict_pic.png" style="width:1.7rem;height:1.7rem;vertical-align: top;margin-right:.6rem;" />
					<span style="color:#fe5282;font-weight:bold;font-size:1em;">{{expire_profit}}</span>
			<span style="color:#fe5282;font-size:.9rem;">元</span> {{/wancheng}} {{#wancheng}}
			<img src="images/shi_pic.png" style="width:1.7rem;height:1.7rem;vertical-align: top;margin-right:.6rem;" />
			<span style="color:#6fb9ff;font-weight:bold;font-size:1em;">{{expire_profit}}</span>
			<span style="color:#6fb9ff;font-size:.9rem;">元</span> {{/wancheng}}

			</span>

			<!--<span>
			{{#wancheng}}
				<span style="float:right;font-size:1.8rem;">{{remaining_days}}<span style="font-size:.9rem;margin-left:.4rem;">天</span></span>
				
			{{/wancheng}}
			{{^wancheng}}
				<span class="finishSpan" style="float:right;font-size:1.6rem;">已完成</span>
			{{/wancheng}}</span>--></p>
		<!--<p class="infact_be">
		 	{{#wancheng}}协议年化收益(元)：{{/wancheng}}
		 	{{^wancheng}}实际收益(元)：{{/wancheng}}
		 	<span style="color:#ff6400;font-size:1.2em;margin-left:-.1em;">{{expire_profit}}</span>
		 	
		 	<span class="infact_re" style="color:#666">
		 		折标&nbsp;&nbsp;{{ conversions_money }}
		 	</span>
		 </p>-->
		<!--<div class="clearfix">
		 	<ul class="time_ul clearfix" style="float:left;width:60%;">
			 	<li><img src="images/preserve.png"/>{{paydate}}</li>
			 	<li><img src="images/finish.png"/>{{trade_end_date}}</li>
			 </ul>
			{{#wancheng}}
			 <p class="infact_be remainP">剩余<span style="font-size:1.1em;color:#3a3a3a;">{{remaining_days}}</span>天</p>
			{{/wancheng}}
			{{^wancheng}}
			 <p class="infact_be remainP"><span class="finishSpan">已完成</span></p>
			{{/wancheng}}
		 </div>-->
	</div>
</li>
{{/list}}