<ul class="menu {{^over5}}one{{/over5}}">
    <li>
      <a class="js-identity-auth">
        <img src="images/project_details/list.png" alt="">
        <p>查看债权列表</p>
      </a>
    </li>
    {{#over5}}
    <li>
      <a href="sendEmail.html?id={{id}}&noSend={{noSend}}">
        <img src="images/project_details/contract.png" alt="">
        <p>发送电子合同</p>
      </a>
    </li>
    {{/over5}}
  </ul>