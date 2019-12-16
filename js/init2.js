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
     .catch(e => {console.log('Error');$(".mensaje-usuario-error").show();$(".mensaje-usuario-ok").hide();});
  //Emyto.user_Address = Emyto.web3.eth.defaultAccount;

  Emyto.web3.eth.getAccounts(function(error, accounts) {
	  Emyto.user_Address = accounts[0].toLowerCase();
	  console.log(Emyto.user_Address);
	  if (Emyto.user_Address === 'undefined' || Emyto.user_Address === null ) {
	  	localStorage.setItem('login',0);
	  	location.href = "/dapp/dapp1/home.html";
	  }else{
	  	$("#user_add").html(Emyto.user_Address);
	  	localStorage.setItem('login',1);
	  	cargarEmyto();
	  }
  });
    
  $("#modal1").hide();
});


function sorter(a, b){
  return a - b;
}

function cargarEmyto(){  
  console.log("cargarEmyto");

  verUsuario(Emyto.user_Address).then(function(result){
    
	var idsContrato = [];
	var ids = result.sort(sorter);
	$.each(ids, function(i, el){
	    if($.inArray(el, idsContrato) === -1) idsContrato.push(el);
	});
	console.log(idsContrato);
	$.each(idsContrato, function(i, el){
	    $("#ids_contrato").append('<li><a class="waves-effect waves-light" onclick="cargarContrato('+el+')">'+el+'</a></li>');
	});
  });
 
  $("#miDir").html(''+Emyto.user_Address+'');
  
}

let verUsuario = function(_user_Address) {

  return new Promise(function(resolve, reject) {
    var contrato = Emyto.contract.methods.verUsuario(_user_Address).call();    
    resolve(contrato);
  });

};


function cargarContrato(_idContrato){
	Emyto.id_contrato = _idContrato;
	verContrato(_idContrato).then(function(result){
	  $("#vcid").html('Id: ' + _idContrato);
	  $("#vccomprador").html('Comprador: ' + result[0]);
	  $("#vcvendedor").html('Vendedor: ' + result[1]);
	  $("#vcagente").html('Agente: ' + result[2]);
	  $("#vccomision").html('Comision: ' + web3.fromWei(result[3], "ether") + '%');
	  $("#vcestado").html('Estado actual: ' + verEstado(result[4]));
	  $("#vctipo").html('Sos el: ' + verTipoUsuario(result[0],result[1],result[2]));
	  $("#vcdeposito").html('Deposito: ' + web3.fromWei(result[5], "ether"));
	  $("#botonesContrato").show();
	  console.log(result);
	});
}

//comprador
function depositarGarantiaEnContrato(){
	if(Emyto.user_Type != 0){
		$("#log").html('Usuario no autorizado!');
		return;
	} 
	var garantia = $("#garantia").val();
	depositarGarantiaEnContratoBC(Emyto.id_contrato,garantia).then(function(txHash) {
    hash = txHash;
    return verificarTransaccion(txHash);
  }).then(function(result){
    $("#log").html('Contaro actualizado, su comprobante:<br>'+ hash);
    return result;
  });
}
//comprador y agente
function depositarGarantiaEnVendedor(){ 
	if(Emyto.user_Type != 0 && Emyto.user_Type != 2){
		$("#log").html('Usuario no autorizado!');
		return;
	}	
	depositarGarantiaEnVendedorBC(Emyto.id_contrato).then(function(txHash) {
    hash = txHash;
    return verificarTransaccion(txHash);
  }).then(function(result){
    $("#log").html('Contaro actualizado, su comprobante:<br>'+ hash);
    return result;
  });
}
//vendedor y agente
function devolverGarantiaAlComprador(){ 
	if(Emyto.user_Type != 1 && Emyto.user_Type != 2){
		$("#log").html('Usuario no autorizado!');
		return;
	}	
	devolverGarantiaAlCompradorBC(Emyto.id_contrato).then(function(txHash) {
    hash = txHash;
    return verificarTransaccion(txHash);
  }).then(function(result){
    $("#log").html('Contaro actualizado, su comprobante:<br>'+ hash);
    return result;
  });
}
//agente
function reiniciarTransaccion(){ 
	if(Emyto.user_Type != 2){
		$("#log").html('Usuario no autorizado!');
		return;
	}
	reiniciarTransaccionBC(Emyto.id_contrato).then(function(txHash) {
    hash = txHash;
    return verificarTransaccion(txHash);
  }).then(function(result){
    $("#log").html('Contaro actualizado, su comprobante:<br>'+ hash);
    return result;
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


let depositarGarantiaEnContratoBC = function(_idContrato,_garantia) {
	return new Promise(function(resolve, reject) {
		var garantia = web3.toWei(_garantia, "ether"); 
		//Emyto.contract.methods.depositarGarantiaEnContrato(_idContrato).send({from: Emyto.user_Address, value:garantia})
		Emyto.contract.methods.depositarGarantiaEnContrato(_idContrato).send({from: Emyto.user_Address})
		.then(function(receipt){
		    resolve([receipt]);
		});
	});

};
let depositarGarantiaEnVendedorBC = function(_idContrato) {
	return new Promise(function(resolve, reject) { 
		Emyto.contract.methods.depositarGarantiaEnVendedor(_idContrato).send({from: Emyto.user_Address})
		.then(function(receipt){
		    resolve([receipt]);
		});
	});

};
let devolverGarantiaAlCompradorBC = function(_idContrato) {
	return new Promise(function(resolve, reject) { 
		Emyto.contract.methods.devolverGarantiaAlComprador(_idContrato).send({from: Emyto.user_Address})
		.then(function(receipt){
		    resolve([receipt]);
		});
	});

};
let reiniciarTransaccionBC = function(_idContrato) {
	return new Promise(function(resolve, reject) { 
		Emyto.contract.methods.reiniciarTransaccion(_idContrato).send({from: Emyto.user_Address})
		.then(function(receipt){
		    resolve([receipt]);
		});
	});

};



let verificarTransaccion = function(hash) {
  return new Promise(function(resolve, reject) {
    var estado = Emyto.web3.eth.getTransactionReceipt(hash).then(function(result){
    console.log(result);
    resolve(result);
  });
  });
};



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
function verTipoUsuario(c,v,a){
      switch(Emyto.user_Address) {
        case c.toLowerCase():
          $("#btnsComprador").show();
          Emyto.user_Type = 0;
          return("COMPRADOR");
          break;
        case v.toLowerCase():
          $("#btnsVendedor").show();
          Emyto.user_Type = 1;
          return("VENDEDOR");
          break;         
        case a.toLowerCase():
          $("#btnsAgente").show();
          Emyto.user_Type = 2;
          return("AGENTE");
          break;
        default:
          return("Error");
      }
}      
