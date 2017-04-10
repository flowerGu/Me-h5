{{#list}}
	<li>
		{{#product_id_status}}
			<div class="product2 whitebg clearfix" onclick="window.location.href='project_details.html?id={{id}}&over5={{over5}}&is_allow_applysign={{is_allow_applysign}}&investorsId={{investorsId}}&childFinanceNumber={{childFinanceNumber}}'">
				<a class="pro_link clearfix">
					<span style="font-size:1.6rem;color: #8e8e8e;">{{protuct_name}}</span> 
	  {{/product_id_status}}
		{{#bid_id_status}}
			<div class="product2 whitebg clearfix">
				<a  id="{{id}}" 
					bid_id="{{bid_id}}"
					data-expire-profit-status = "{{expire_profit_status}}" 
					data-order-number="{{borrowNum}}" 
					data-transfer-type="{{transferType}}" 
					item_status_e="{{item_status_e}}" 
					item5="{{item5}}" 
					contract_status="{{contract_status}}"
					data-transfer-type="{{transferType}}"
					class="pro_link clearfix">
					<span style="font-size:1.6rem;color: #8e8e8e;">{{loan_title}}</span> 	
					<em>
						<i>
							{{#item_status_s}}成功{{/item_status_s}}
							{{#item_status_e}}流标{{/item_status_e}}
						</i>
				  </em> 
		{{/bid_id_status}} 
		{{#product_id_status}}
					<span style="float:right;font-size:.8em;margin-left:.2em"></span> {{#online}}
					<img src="images/up_arrow.png" style="float:right;width:1.6rem;height:1.6rem;" /> {{/online}} {{#downline}}
					<img src="images/down_arrow.png" style="float:right;width:1.6rem;height:1.6rem;" /> {{/downline}} {{/product_id_status}}
			</a>
			{{#transferType}}<div class="line-order-number">{{borrowNum}}</div>{{/transferType}}
			<ul class="clearfix mgt_ul">
				<li style="text-align: left;color:#e60041">
					<span class="f47" style="font-size:1.5rem;">
							<img src="images/rate_pic.png" style="margin-right:0.8rem;width:1.5rem;height:1.4rem;" />
							<b>{{rate_percent}}</b>
							</span>
				</li>

				<li class="li_pos" style="text-align:right;line-height: 1.5rem;">
					<p class="c34 pos">
						<span class="f55" style="font-size:1.5rem;color:#8e8e8e;">
								<img src="images/money_pic.png" style="margin-right:0.7rem;width:1.1rem;height:1.5rem;" />
								<span class="invest"><b>{{ invest_money }}</b> </span>
						</span>万</p>
				</li>
			</ul>
			
			<div class="clearfix">
				<ul class="time_ul clearfix" style="float:left;width:100%;font-size:1.2rem;margin-bottom:1rem;">
					<li>预定时间 <span class="reserve">{{reserve_date}}</span></li>
					{{^transferType}}<li>计息时间 <span class="interrest">{{interrest_date}}</span></li>{{/transferType}}
					<li>{{#item_status_e}}流标{{/item_status_e}}{{^item_status_e}}完成{{/item_status_e}}时间 <span class="end_date">{{trade_end_date}}</span></li>
				</ul>
				<p>
					<span>
							{{#item_status}}
								{{^expire_profit_status}}
									<em style="display: inline-block;width:1.7em;height:1.7em;text-align:center;line-height:1.7em;font-style:normal;font-size:1em;border-radius: 50%;background:#e60041;color:#fff;">预</em>
									<span class="f55 expire" style="font-size:2.3rem;color:#8e8e8e">{{expire_profit}}</span><span class="predict_down">元</span>	
								{{/expire_profit_status}}
							{{/item_status}} 
							{{^item_status}}
									<em style="display: inline-block;width:1.7em;height:1.7em;text-align:center;line-height:1.7em;font-style:normal;font-size:1em;border-radius: 50%;background:#e60041;color:#fff;">实</em>
									<span class="f55 expire" style="font-size:2.3rem;color:#8e8e8e">{{expire_profit}}</span><span class="predict_down">元</span>		
							{{/item_status}}

					</span>
					<span style="color:#8e8e8e;float:right;font-size:1.6rem;">{{#item_status}}
							<span style="font-size:2.3rem;">{{remaining_days}}</span><span class="predict_down">天</span> {{/item_status}} {{^item_status}}
					<span style="font-size:1.6rem;">已完成</span> {{/item_status}}
					</span>
				</p>
			</div>
			</div>
	</li>
{{/list}}
