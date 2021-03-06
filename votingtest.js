<!Doctype html>
<html>
<head>
<script type="text/javascript" src="./lib/bignumber.min.js"></script>
<script type="text/javascript" src="./lib/web-light.js"></script>
<script type="text/javascript">

    var Web3 = require('web3');
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

    var vc = web3.eth.contract([ { "constant": true, "inputs": [], "name": "alreadyVoted", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "killContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "cand", "type": "bytes32" } ], "name": "addCandidate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "cand", "type": "bytes32" } ], "name": "getScore", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "cand", "type": "bytes32" } ], "name": "vote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getNumOfCandidates", "outputs": [ { "name": "", "type": "uint8", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ]).at("0xA17cb628c4AdC3bc2A6e1bdB5b9260F64E85956F");

    function showList() {
      var table = document.getElementById("table");
      var length = vc.getNumOfCandidates();
      for(var i=0; i<length; i++){
        var candidate = vc.getCandidateString(i);
        var row = table.insertRow();
        var cell1=row.insertCell(0);
        var cell2=row.insertCell(1);
        cell1.innerHTML = candidate;
        cell2.innerHTML = vc.getScore(candidate);
      }
    }

    function vote() {
      var candidate = document.getElementById("candidate").value;
      var account = document.getElementById("account").value;
      web3.eth.defaultAccount = account;

      if(web3.personal.unlockAccount(account,document.getElementById('pass').value)) {

        var alreadyVoted = vc.alreadyVoted();

        console.console.log(alreadyVoted);

        if(alreadyVoted){ alert ("이미 투표하셨습니다.");}
        else{
          vc.vote(candidate, function(err, result) {
            if(!err) alert("트랜잭션이 성공적으로 전송되었습니다.|n"+result)
          });
        }
      }
    }

    function addCand() {
      var candidate = document.getElementById("candidate").value;
      var account = documnet.getElementById("account").value;

      if(web3.personal.unlockAccount(account,document.getElementById('pass').value)) {

      }
    }

</script>
</head>
<body>
  <h1> 블록체인 투표 <h1>
    <div>
      계정: <input type = "text" id="account"
            value="0x9C6431A810ab10A0CC5B2725d427Fe8808a5d2b5">

      패스워드: <input type = "password" id="pass" value="1234">
    </div><br>
    <div><input type="text" id="candidate" value="b">
    <button onClick = "vote()">투표하기</button>
    <button onClick = "addCand()">후보 추가하기</button></div>
    <table id ="table"/>
    <script>
        showList();
    </script>
</body>
</html>
