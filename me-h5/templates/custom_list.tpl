 {{#list}} {{#last}}
<tr class="number_two last" onclick="location.href='customer_details.html?id='+{{id}}" style="marin-bottom: 5px;">
	<td class="th_1" style="border-bottom:1px solid #ddd">
		{{#gendersex}}
		<img src="images/user_pic_02.png" style="margin-right:0.7rem;width:0.8rem;height:0.8rem;vertical-align: middle;" /> {{/gendersex}}
		{{#gendersexy}}
		<img src="images/user_pic_01.png" style="margin-right:0.7rem;width:0.8rem;height:0.8rem;vertical-align: middle;" /> {{/gendersexy}}
		<span style="font-size:1.5rem;">{{name}}</span>
		<p style="padding-top:0.4em;font-size:1.3rem;padding-left: 1.5rem;">{{phone_number}}</p>
	</td>
	<td class='{{#over20}}over20 {{/over20}} th_2' style="border-bottom:1px solid #ddd">
		<p>额度</p>
		<span >{{investMoneyTotal}}万{{#over50}}</span><img src="images/cup_pic.png" class="imgCup"
		/>{{/over50}}
	</td>
	<td style="border:none;font-size:1.3rem;border-bottom:1px solid #ddd">
		<p>期限</p>
		<span>{{investEarlyTime}}</span>
		</td>
</tr>
{{/last}} {{^last}}
<tr class="number_two" onclick="location.href='customer_details.html?id='+{{id}}">
	<td class="th_1" style="border:none;border-bottom:1px solid #ddd">
		{{#gendersex}}
		<img src="images/user_pic_02.png" style="margin-right:0.7rem;width:0.8rem;height:0.8rem;vertical-align: middle;" /> {{/gendersex}}
		{{#gendersexy}}
		<img src="images/user_pic_01.png" style="margin-right:0.7rem;width:0.8rem;height:0.8rem;vertical-align: middle;" /> {{/gendersexy}}
		<span style="font-size:1.5rem;">{{name}}</span>
		<p style="padding-top:0.4em;font-size:1.3rem;padding-left: 1.5rem;">{{phone_number}}</p>
	</td>
	<td style="border-bottom:1px solid #ddd" class='{{#over20}}over20 {{/over20}} th_2'>
		<p>额度</p>
		<span >{{investMoneyTotal}}万{{#over50}}</span><img src="images/cup_pic.png" style="width:1rem;height:1.2rem;"class="imgCup"
		/>{{/over50}}
	</td>
	<td style="border:none;border-bottom:1px solid #ddd;font-size:1.3rem;">
		<p>期限</p>
		<span>{{investEarlyTime}}</span>
		</td>
</tr>
{{/last}} {{/list}}

