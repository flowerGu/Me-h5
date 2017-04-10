
	<div class="details_box">
		<div class="whitebg details_wrap">
			<!--<ul style="position:relative">
				<li class="btm" style="width:69%;"><label>客户姓名</label><span>{{name}}</span><em><img src="{{gender_img}}"></em></li>
				<li class="btm"  style="width:69%;"><label>客户手机</label><a href="tel:{{phone_number}}"><span>{{phone_number}}</span><em><img src="images/tel.png"></em></a></li>
				<li class="btm" ><label>所在地区</label><span>{{contact_address}}</span></li>
				<li class="btm"><label>详细地址</label></li>
				<li><label>客户介绍</label><span>{{remarks}}</span></li>
				<img src="{{head_url}}" class="nick_pic"/>
			</ul>-->
			<ul style="overflow: hidden;">
				<li style="float:left;width:22%;margin:0 1.3rem;margin-right: 0;">
					<img src="{{head_url}}" class="nick_pic"/>
				</li>
				<li style="float:left;width:70%;margin-bottom:1rem;">
					<p style="overflow: hidden;line-height:1.5rem;margin-top:0.4rem;">
						<span style="font-size:1.5rem;float:left;">
							{{#gendersex}}
								<img src="images/user_pic_02.png" style="margin-right:0.7rem;width:0.8rem;height:0.8rem;vertical-align: middle;" />{{name}}</span><a style="font-size:1.2rem;float:right;color:#5F5F5F;margin-right:2em;" href="tel:{{phone_number}}">
							{{/gendersex}}
							{{#gendersexy}}
								<img src="images/user_pic_01.png" style="margin-right:0.7rem;width:0.8rem;height:0.8rem;vertical-align: middle;" />{{name}}</span><a style="font-size:1.2rem;float:right;color:#5F5F5F;margin-right:2em;" href="tel:{{phone_number}}">
							{{/gendersexy}}
							{{phone_number}}
							</a>
					</p>
					<p style="margin:1.1rem 0;font-size:1.2rem;color:#5F5F5F;"><span>{{contact_address}}</span></p>
					<p style="font-size:1.1rem;color:#5F5F5F;opacity: 0.5;"><span>{{remarks}}</span></p>
				</li>
			</ul>
		</div>
	</div>
	<div class="details_box">
		<div class="whitebg details_wrap separt" >
			<ul>
				<li class="btm clearfix" ><label>身份证号</label><span>{{idcard}}</span></li>
				<li class="btm clearfix"><label>出生日期</label><span>{{birthday}}</span></li>
				<li class="btm clearfix"><label>客户来源</label><span>{{clientsource}}</span></li>
				<li class="btm clearfix"><label>固定电话</label><span>{{telphonenumber}}</span></li>
				<li class="clearfix"><label>注册时间</label><span>{{createtime}}</span></li>
			</ul>
		</div>
	</div>
	<div class="details_box">
		<div class="whitebg details_wrap separt">
			<ul>
				<li class="btm clearfix" ><label>已获收益</label><span>￥{{profit_amount}}</span></li>
				<li class="btm clearfix"><label>已投金额</label><span>￥{{invest_money}}</span></li>
				<li class="clearfix"><label>待收本金</label><span>￥{{duein_amount}}</span></li>
			</ul>
		</div>
	</div>
			{{#orders}}
				<div class="details_box">
					<div class="goods_list whitebg clearfix">
						<p class="pro_name" style="font-size:1.6rem;line-height: 1.6rem;">
							{{#bid_status}}
								{{loan_title}}
							{{/bid_status}}
							{{#product_status}}
								{{product_name}}
							{{/product_status}}
							<span style="font-size:1.3rem;float:right;"><img src="images/money_pic.png" style="width:1.1rem;height:1.5rem;vertical-align: bottom;margin-right:0.7rem;" />{{invest_money}} 万元</span><span style="font-size: 1.3rem;float:right;margin-right:1.4rem;"><img src="images/rate_pic.png" style="width:1.5rem;height:1.2rem;margin-right:0.7rem;" />
							{{newYears_income}} %</span>
						</p>
						<p>{{paydate}}&nbsp;&nbsp;至&nbsp;&nbsp;{{duedate}}</p>
						
					</div>
				</div>
			{{/orders}}
			{{^orders}}
				<div class="details_box ">
					<div class="details_wrap withoutRecord whitebg">
						<img src="images/without.png" />
					暂无出借记录
					</div>
					
				</div>
			{{/orders}}
