{{#bankList}}
<div class="card_info {{#red}}red{{/red}}{{#blue}}blue-card{{/blue}} {{#trusteeship_type}}removeable{{/trusteeship_type}}">
	<a class='card_del' data-id='{{bank_num}}'></a>
	<div class="card_logo">
		<img src='./images/backlogo/{{bank_code}}.png'  >
		<p class='bank_name'>{{bank_name}}</p>
		<p class='card_type'>储蓄卡</p>
		<p class='card_trusteeship_type'>{{trusteeship_type_txt}}</p>
	</div>
	<div class="card_num">
		<p>{{bank_num}}</p>
	</div>
</div>

{{/bankList}}
<a href="addNewCard.html" class="add_card" >
	<div class="add_card_img">
		<span>添加银行卡</span>
	</div>
</a>