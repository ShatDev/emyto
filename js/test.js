$(document).ready(function(){

//const web3 = new Web3(window.web3.currentProvider);
//const web3 = new Web3(window['ethereum']);
//const defaultAccount = window.web3.eth.defaultAccount;
//console.log(web3.version);
//console.log(defaultAccount);

    if (typeof window.ethereum !== 'undefined') {
      const provider = window['ethereum'];
      const web3 = new Web3(window['ethereum']);
      console.log("Metamask");
      $("#log4").html("Metamask");      
    }else if (typeof web3 !== 'undefined') {
      const provider = window.web3.currentProvider;
      const web3 = new Web3(window.web3.currentProvider);
      console.log("Web3");
      $("#log4").html("Web3");
    }else {
      const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d360b73eb9f548e9b3295ef139906865");
      const web3 = new Web3(provider);
      console.log("Infura");
      $("#log4").html("Infura");
    }
    //Emyto.web3.eth.getAccounts(function(error, accounts) {console.log(accounts);});
    web3.eth.getAccounts(function(error, accounts) {$("#log3").html(accounts[0]);});






//isInstalled();
//isLocked();
//asyncCall();
});

/*async function isLocked() {
  console.log('calling');
   try {
     const accounts = await ethereum.enable();
     console.log(accounts[0]);
     $("#log2").html('MetaMask is unlocked');
     $("#log3").html(accounts[0]);
   } catch (error) {
     $("#log2").html('MetaMask is locked');
     console.error(error);
   }
}

function isInstalled() {
   if (typeof web3 !== 'undefined'){
      console.log('MetaMask is installed');
      $("#log1").html('MetaMask is installed');
   } 
   else{
      console.log('MetaMask is not installed');
      $("#log1").html('MetaMask is not installed');
   }
}*/

/*function isLocked() {
   web3.eth.getAccounts(function(err, accounts){
      if (err != null) {
         console.log(err)
      }
      else if (accounts.length === 0) {
         console.log('MetaMask is locked');
         $("#log2").html('MetaMask is locked');
      }
      else {
         console.log('MetaMask is unlocked');
         $("#log2").html('MetaMask is unlocked');
      }
      $("#log3").html(accounts);
   });
}*/

