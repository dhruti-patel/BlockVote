if (typeof web3 !== 'undefined') 
{
 web3 = new Web3(web3.currentProvider);
 } 
else 
{
 // set the provider you want from Web3.providers
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 }

//abi=JSON.parse('')

VotingContract = web3.eth.contract([
  {
    "constant": false,
    "inputs": [
      {
        "name": "toVoter",
        "type": "uint256"
      }
    ],
    "name": "giveRightToVote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "toVoter",
        "type": "uint256"
      }
    ],
    "name": "registerToVote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "toCandidate",
        "type": "uint8"
      }
    ],
    "name": "vote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "name": "cid",
        "type": "uint256"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "candidatesCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "voterids",
    "outputs": [
      {
        "name": "eid",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "name": "vid",
        "type": "uint256"
      },
      {
        "name": "voted",
        "type": "bool"
      },
      {
        "name": "vote",
        "type": "uint8"
      },
      {
        "name": "registered",
        "type": "bool"
      },
      {
        "name": "vadd",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "winner",
    "outputs": [
      {
        "name": "_winner",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]);

var dateV = '25/01/2020'
var contractInstance = VotingContract.at('0xBCF367712C44501249b95768b40A100667A8a9f7');

function registerVoter()
{
var r = document.getElementById("Id").value;
contractInstance.giveRightToVote(r, {from: web3.eth.accounts[0]});
 }
 //var Voting = VotingContract.at();
function voterRegistration()
{
var r = document.getElementById("Voterid").value;
if (contractInstance.voters(r)[3]==true)
{
  alert("You are already registered");
}
else if(contractInstance.voters(r)[0]==0)
{
  alert("You are not a valid voter");
}
else
{
var account = prompt("Please enter the account address index");
$("#ID").html("Your Account ID: "+web3.eth.accounts[account]);
$("#bal").html("Balance: "+web3.eth.getBalance(web3.eth.accounts[account])/Math.pow(10,18));
contractInstance.registerToVote(r, {from: web3.eth.accounts[account]});
}
 }

 function voteForCandidate() 
 {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd = '0'+dd
  } 
  if(mm<10) {
    mm = '0'+mm
  } 
  today = dd + '/' + mm + '/' + yyyy;


  if(today.toString()==dateV){    
    document.getElementById('vote').disabled = true;
    alert("You have missed your chance to vote");    
  }
  else{
    var r = document.getElementById("vvid").value;
    var account = contractInstance.voters(r)[4];
    $("#ID").html("Your Account ID: "+account);
    $("#bal").html("Balance: "+web3.eth.getBalance(account)/Math.pow(10,18));
    if(contractInstance.voters(r)[1]==true)
    {
      alert("You have already voted");
    }
    else
    {
    var e = document.getElementById("candidate").value;
    var candidateName = e;  
    contractInstance.vote(e, {from: account}); 
    $("#bal").html("Balance: "+web3.eth.getBalance(account)/Math.pow(10,18));
    }
  }
}

function countForCandidate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd = '0'+dd
  } 
  if(mm<10) {
    mm = '0'+mm
  } 
  today = dd + '/' + mm + '/' + yyyy;


  if(today.toString()==dateV){
    document.getElementById('win1').disabled = false;
    document.getElementById('vote').disabled = true;
    for(var i=1;i<4;i++){
      $("#candidate-"+i).html(contractInstance.candidates(i)[2].toString());    
    }
  }
  else{
    alert("The results will be declared on "+dateV);
  }   
}

function winner(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd = '0'+dd
  } 
  if(mm<10) {
    mm = '0'+mm
  } 
  today = dd + '/' + mm + '/' + yyyy;


  if(today.toString()==dateV){
  var candidateW = contractInstance.winner();

  //alert(max + " "+ candidateW);
  $("#win").html("Winner is: " + candidateW);
}
else{
    alert("The results will be declared on "+dateV);
  }   
}

 console.log(VotingContract);

 /*$("#button").click(function(){
 VotingContract.methods.giveRightToVote($("#Id").val()).call({from:'0xe14737B090212BecC3aBD9E9bc8081121F874EFB'})});*/