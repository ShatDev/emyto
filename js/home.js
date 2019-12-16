var Emyto = {
  web3: null,
  contract: null,
  contract_Address: null,
  provider: null,
  user_Address: null,
  abi: null,
  pkey: null,
  user_Type: null,
  id_contrato: null,
}


$(document).ready(function(){
  $(".modal-trigger").leanModal();
	

    if (typeof window.ethereum !== 'undefined') {
      Emyto.provider = window['ethereum'];
      Emyto.web3 = new Web3(window['ethereum']);
      unlockedMetamask();
      console.log("Metamask");
      $("#log").html("Metamask");
    }else if (typeof web3 !== 'undefined') {
      Emyto.provider = window.web3.currentProvider;
      Emyto.web3 = new Web3(window.web3.currentProvider);
      console.log("Web3");
      $("#log").html("Web3");
    }else {
      /*Emyto.provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d360b73eb9f548e9b3295ef139906865");
      Emyto.web3 = new Web3(Emyto.provider);
      console.log("Infura");*/
      $(".botones-home").hide();
      $("#log").html("Billetera no detectada!");
      $(".mensaje-usuario-error").show();$(".mensaje-usuario-ok").hide();
      $("#modal1").hide();
      return;
    }

  console.log(Emyto.web3.version);  

  Emyto.contract_Address = "0x5C09D9a302A27FAF154a4C79c2faa42Ea553f587";
  
  Emyto.abi =
	[
		{
			"constant": true,
			"inputs": [],
			"name": "verUltimoContarto",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "enum Escrow.Estado",
					"name": "",
					"type": "uint8"
				},
				{
					"internalType": "uint256",
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
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "contratos",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "idContrato",
					"type": "uint256"
				},
				{
					"internalType": "address payable",
					"name": "comprador",
					"type": "address"
				},
				{
					"internalType": "address payable",
					"name": "vendedor",
					"type": "address"
				},
				{
					"internalType": "address payable",
					"name": "agente",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "comision",
					"type": "uint256"
				},
				{
					"internalType": "enum Escrow.Estado",
					"name": "estadoActual",
					"type": "uint8"
				},
				{
					"internalType": "uint256",
					"name": "deposito",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "matar",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "usuarios",
			"outputs": [
				{
					"internalType": "uint256",
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
					"internalType": "uint256",
					"name": "_idContrato",
					"type": "uint256"
				}
			],
			"name": "verContrato",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "enum Escrow.Estado",
					"name": "",
					"type": "uint8"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_idContrato",
					"type": "uint256"
				}
			],
			"name": "devolverGarantiaAlComprador",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_idContrato",
					"type": "uint256"
				}
			],
			"name": "reiniciarTransaccion",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "address payable",
					"name": "_comprador",
					"type": "address"
				},
				{
					"internalType": "address payable",
					"name": "_vendedor",
					"type": "address"
				},
				{
					"internalType": "address payable",
					"name": "_agente",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_comision",
					"type": "uint256"
				}
			],
			"name": "nuevoContrato",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_idContrato",
					"type": "uint256"
				}
			],
			"name": "depositarGarantiaEnVendedor",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_idContrato",
					"type": "uint256"
				}
			],
			"name": "depositarGarantiaEnContrato",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "address",
					"name": "dir",
					"type": "address"
				}
			],
			"name": "verUsuario",
			"outputs": [
				{
					"internalType": "uint256[]",
					"name": "",
					"type": "uint256[]"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address payable",
					"name": "_emyto",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_comision_emyto",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		}
	];
  Emyto.contract = new Emyto.web3.eth.Contract(Emyto.abi, Emyto.contract_Address);

  Emyto.web3.eth.net.isListening()
     .then(() => {console.log('web3 is connected');$(".mensaje-usuario-error").hide();$(".mensaje-usuario-ok").show();})
     .catch(e => console.log('Wow. Something went wrong')); 

  Emyto.web3.eth.getAccounts(function(error, accounts) {
	  Emyto.user_Address = accounts[0].toLowerCase();
	  console.log(Emyto.user_Address);
	  if (Emyto.user_Address === 'undefined' || Emyto.user_Address === null ) {
	  	localStorage.setItem('login',0);
	  	$("#log").html('Error! Billetera no encontrada!');
	  }else{
	  	$("#user_add").html(Emyto.user_Address);
	  	localStorage.setItem('login',1); 	
	  }

  });

  $("#modal1").hide();
});


async function getAccount() {
   try {
    const accounts = await Emyto.web3.eth.getAccounts();
    console.log(accounts[0]);
    return accounts[0];
   } catch (error) {
     console.error(error);
   }
}

async function unlockedMetamask() {
   try {
     const accounts = await ethereum.enable();
     if (accounts) {
     	console.log('MetaMask is unlocked');
     }else{
     	console.log('Error');
     }
   } catch (error) {
   	console.log('MetaMask is locked');
     console.error(error);
   }
}


function contratos(){
	location.href = "/dapp/dapp1/index.html";
}
function cuenta(){
	location.href = "/dapp/dapp1/index2.html";
}



