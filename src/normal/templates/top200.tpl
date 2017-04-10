 {{#list}}
 			 {{#status}}
				<tr class='top100_redtr {{#phone_number_bold}}phone_number_bold{{/phone_number_bold}}'>
					<td class='mingci'width="12%">
						{{#first}}<span class='first_t'></span>{{/first}}
						{{#second}}<span class='second_t'></span>{{/second}}
						{{#thrid}}<span class='thrid_t'></span>{{/thrid}} 
						{{#other}}<span class='other_t'>{{rank}}</span>{{/other}}
					</td>
					<td class='tel'width="24%" style='{{#first}}color:rgb(255,205,96){{/first}}{{#second}}color:rgb(106,203,254){{/second}}{{#thrid}}color:rgb(214,116,0){{/thrid}}{{#other}}color:#717171{{/other}};'>{{phoneNumber}}</td>
					<td class='name'width="22%" style='{{#first}}color:rgb(255,205,96){{/first}}{{#second}}color:rgb(106,203,254){{/second}}{{#thrid}}color:rgb(214,116,0){{/thrid}}{{#other}}color:#717171{{/other}};'>{{cusName}}</td>
					<td width="6%"style='{{#first}}color:rgb(255,205,96){{/first}}{{#second}}color:rgb(106,203,254){{/second}}{{#thrid}}color:rgb(214,116,0){{/thrid}}{{#other}}color:#717171{{/other}};'>{{#first}}<img src="images/prince.png"/>{{/first}}</td>
					<td width="28%"class='jine'style='{{#first}}color:rgb(255,205,96){{/first}}{{#second}}color:rgb(106,203,254){{/second}}{{#thrid}}color:rgb(214,116,0){{/thrid}}{{#other}}color:#717171{{/other}};'>{{investMoney}}万</td>
				</tr>
			{{/status}}
			{{^status}}
				<tr class='top100_redtr {{#phone_number_bold}}phone_number_bold{{/phone_number_bold}}'>
					<td class='mingci'width="12%"><span {{#first}}class='first_t'{{/first}}{{#second}}class='second_t'{{/second}}{{#thrid}}class='thrid_t'{{/thrid}} {{#other}}class='other_t'{{/other}}>{{rank}} </span></td>
					<td class='tel' width="24%">{{phoneNumber}}</td>
					<td class='name' width="22%">{{cusName}}</td>
					<td width="6%"></td>
					<td class='jine'width="28%" style="color:rgb(154,154,154);">{{investMoney}}万</td>
				</tr>
			{{/status}}
{{/list}}