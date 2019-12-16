var Emyto = {
  web3: null,
  contract: null,
  contract_Address: null,
  provider: null,
  user_Address: null,
  abi: null,
  pkey: null,
}

$(document).ready(function(){
  $(".modal-trigger").leanModal();
	

  if(localStorage.getItem('login') != 1){
  	location.href = "/dapp/dapp1/home.html";
  }
    if (typeof window.ethereum !== 'undefined') {
      Emyto.provider = window['ethereum'];
      Emyto.web3 = new Web3(window['ethereum']);
      console.log("Metamask");
    }else if (typeof web3 !== 'undefined') {
      Emyto.provider = window.web3.currentProvider;
      Emyto.web3 = new Web3(window.web3.currentProvider);
      console.log("Web3");
    }else {
      /*Emyto.provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d360b73eb9f548e9b3295ef139906865");
      Emyto.web3 = new Web3(Emyto.provider);
      console.log("Infura");*/
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
	  	location.href = "/dapp/dapp1/home.html";
	  }else{
	  	$("#user_add").html(Emyto.user_Address);
	  	localStorage.setItem('login',1);
	  }
  });
     
  $("#modal1").hide();     
});



function cargarContrato(){ 
	var idContrato = $("#num_contrato").val();
	verContrato(idContrato).then(function(result){
	  $("#vcid").html('Id: ' + idContrato);
	  $("#vccomprador").html('Comprador: ' + result[0]);
	  $("#vcvendedor").html('Vendedor: ' + result[1]);
	  $("#vcagente").html('Agente: ' + result[2]);
	  $("#vccomision").html('Comision: ' + web3.fromWei(result[3], "ether") + '%');
	  $("#vcestado").html('Estado actual: ' + verEstado(result[4]));
	  $("#vcdeposito").html('Deposito: ' + web3.fromWei(result[5], "ether"));
	  console.log(result);
	});
}

let verUltimoContarto = function() {

  return new Promise(function(resolve, reject) {
    var contrato = Emyto.contract.methods.verUltimoContarto().call();    
    resolve(contrato);
  });

};

let verContrato = function(_idContrato) {

  return new Promise(function(resolve, reject) {
    var contrato = Emyto.contract.methods.verContrato(_idContrato).call();    
    resolve(contrato);
  });

};

let nuevoContrato = function(_comprador,_vendedor,_agente,_comision) {
	return new Promise(function(resolve, reject) {
		var idContrato = Emyto.contract.methods.nuevoContrato(_comprador,_vendedor,_agente,_comision).send({from: Emyto.user_Address})
		.then(function(receipt){
		    resolve([receipt,idContrato]);
		});
	});
};



function agregarContrato(){
  var comprador = $("#comprador").val();
  var vendedor = $("#vendedor").val();
  var agente = $("#agente").val();
  var comision = $("#comision").val();
  comision = web3.toWei(comision, "ether"); 

  nuevoContrato(comprador,vendedor,agente,comision).then(function(result) {
  	$("#contrato").html('Contrato: ' + result[1]);
    $("#log").html('Nombre actualizado su comprobante:<br>'+ result[0].transactionHash);
    console.log(result);
  });
}

function verEstado(estado){
      switch(estado) {
        case "0":
          return("ESPERANDO EL PAGO");
          break;
        case "1":
          return("ESPERANDO EL ENVIO");
          break;          
        case "2":
          return("COMPLETO");
          break;
        default:
          return("-");
      }
}      

function salir(){
  	localStorage.setItem('clave', null);
  	localStorage.setItem('login',0);
  	location.href = "/dapp/dapp1/home.html";
}