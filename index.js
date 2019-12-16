
function cargarEmyto(pkey){  
  //let account = web3.eth.getAccounts((err, res) => {return res[0]});
  const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d360b73eb9f548e9b3295ef139906865");
  const web3 = new Web3(provider);
  console.log(web3.version);

  //let key = '17A80A3A16562334EC3F059BCEA46299F2371A96AFD4163FC3DDBF5992103B32';
  let key = pkey;
  let hexKey ="0x"+key;
  let acc = web3.eth.accounts.privateKeyToAccount(hexKey);
  let account = acc.address;
  let privateKey1 = new ethereumjs.Buffer.Buffer(key, 'hex');
  const contract_Address = "0x1BD87C90De5a672fD21F318ff4e02f49D52dDC77";

  const abi =[
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
          "internalType": "address",
          "name": "comprador",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "vendedor",
          "type": "address"
        },
        {
          "internalType": "address",
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
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "usuarios",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
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
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];

  web3.eth.defaultAccount = account;
  const contract = new web3.eth.Contract(abi, contract_Address);


  web3.eth.net.isListening()
     .then(() => console.log('web3 is connected'))
     .catch(e => console.log('Wow. Something went wrong'));


  verUltimoContarto(0).then(function(result){
    
    document.getElementById("ucid").innerHTML='Id: ' + result[0];
    document.getElementById("uccomprador").innerHTML='Comprador: ' + result[1];
    document.getElementById("ucvendedor").innerHTML='Vendedor: ' + result[2];
    document.getElementById("ucagente").innerHTML='Agente: ' + result[3];
    document.getElementById("uccomision").innerHTML='Comision: ' + result[4]/1000000000000000000 + '%';
    document.getElementById("uccomision").innerHTML='Estado actual: ' + verEstado(result[5]);
    console.log(result);

  });

}

let verUltimoContarto = function() {

  return new Promise(function(resolve, reject) {
    var nombre = contract.methods.verUltimoContarto(_idContrato).call();    
    resolve(nombre);
  });

};

let verContrato = function(_idContrato) {

  return new Promise(function(resolve, reject) {
    var nombre = contract.methods.verContrato(_idContrato).call();    
    resolve(nombre);
  });

};

let nuevoContrato = function(_comprador,_vendedor,_agente,_comision) {

  var hash_ver;
  return new Promise(function(resolve, reject) {
    const  idContrato = contract.methods.nuevoContrato(_comprador,_vendedor,_agente,_comision).encodeABI();

    web3.eth.getTransactionCount(account, (err, txCount) => {
      // Build the transaction
      const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       contract_Address,
        value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
        gasLimit: web3.utils.toHex(2100000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
        data:idContrato  
      }
      //console.log(idContrato);
      // Sign the transaction
      const tx = new ethereumjs.Tx(txObject);
      tx.sign(privateKey1);

      const serializedTx = tx.serialize();
      const raw = '0x' + serializedTx.toString('hex');
      // Broadcast the transaction
      const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
        document.getElementById("log").innerHTML="Enviado...Espere un momento"+ tx;
        hash_ver = tx;
        resolve(hash_ver);
      });
    });    
  });

};

let verificarTransaccion = function(hash) {
  return new Promise(function(resolve, reject) {
    var estado = web3.eth.getTransactionReceipt(hash).then(function(result){
    console.log(result);
    resolve(result);
  });
  });
};


function agregarContrato(){
  var hash;
  var comprador = document.getElementById('comprador').value;
  var vendedor = document.getElementById('vendedor').value;
  var agente = document.getElementById('agente').value;
  var comision = document.getElementById('comision').value;

  nuevoContrato(comprador,vendedor,agente,comision).then(function(txHash) {
    hash = txHash;
    return verificarTransaccion(txHash);
  }).then(function(result){
    //var x = 0;
    //while(result == null){result = verificarTransaccion(hash); x++;}
    document.getElementById("contrato").innerHTML='Contrato: ' + result;
    document.getElementById("log").innerHTML="Nombre actualizado su comprobante:<br>"+ hash;
    //console.log(result);
    //console.log(x);
    return result;
  });
}

function verEstado(estado){
      switch(estado) {
        case 0:
          return("ESPERANDO EL PAGO");
          break;
        case 1:
          return("ESPERANDO EL ENVIO");
          break;          
        case 2:
          return("COMPLETO");
          break;
        default:
          return("-");
      }
}      
