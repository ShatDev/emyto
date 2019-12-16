pragma solidity ^0.5.0;

contract Escrow{
    
    enum Estado {ESPERANDO_PAGO, ESPERANDO_ENVIO, COMPLETO}
    
    modifier soloCompradorConAgente(uint idContrato){ require(msg.sender == contratos[idContrato].comprador || msg.sender == contratos[idContrato].agente,"Usuarios Invalido."); _; }
    modifier soloVendedorConAgente(uint idContrato){ require(msg.sender == contratos[idContrato].vendedor || msg.sender == contratos[idContrato].agente,"Usuarios Invalido."); _; }
    modifier soloComprador(uint idContrato){ require(msg.sender == contratos[idContrato].comprador,"Usuarios Invalido."); _; }
    modifier soloVendedor(uint idContrato){ require(msg.sender == contratos[idContrato].vendedor,"Usuarios Invalido."); _; }    
    modifier soloAgente(uint idContrato){ require(msg.sender == contratos[idContrato].agente,"Usuarios Invalido."); _; }    
    modifier soloEmyto(){ require(msg.sender == emyto,"Usuarios Invalido."); _; }
    modifier enEstado(uint idContrato, Estado estadoEsperado){ require(contratos[idContrato].estadoActual == estadoEsperado,"Estado Invalido."); _; }
    
    struct Contrato {
        uint idContrato;
        address payable comprador;
        address payable vendedor;
        address payable agente;
        uint256 comision;
        mapping (address => uint256) depositos;
        Estado estadoActual;
    }
    uint num_contrato;
    
    address payable emyto;
    uint256 comision_emyto;

    mapping (address => uint[]) public usuarios;
    mapping (uint => Contrato) public contratos;
    
    constructor(address payable _emyto, uint256 _comision_emyto) public{
        emyto = _emyto;
        comision_emyto = _comision_emyto;
        num_contrato = 0;
    }
    
    //Contrato
    function nuevoContrato(address payable _comprador, address payable _vendedor, address payable _agente, uint256 _comision) public returns (uint) {
        contratos[num_contrato] = Contrato(num_contrato, _comprador, _vendedor, _agente, _comision, Estado.ESPERANDO_PAGO);
        
        usuarios[_comprador].push(num_contrato);
        usuarios[_vendedor].push(num_contrato);
        usuarios[_agente].push(num_contrato);
        
        num_contrato = num_contrato + 1;
        return num_contrato;
    }
    
    function verContrato(uint _idContrato) public view returns (address, address, address, uint256, Estado) {
        return (contratos[_idContrato].comprador, contratos[_idContrato].vendedor, contratos[_idContrato].agente, contratos[_idContrato].comision, contratos[_idContrato].estadoActual);
    }
    
    function verUltimoContarto() public view returns (uint, address, address, address, uint256, Estado) {
        uint index = num_contrato-1;
        return (index, contratos[index].comprador, contratos[index].vendedor, contratos[index].agente, contratos[index].comision, contratos[index].estadoActual);
    } 
    
    //Usuarios
    function verUsuario(address dir) public view returns (uint[] memory) {
        return usuarios[dir];
    }    
    
    function matar() soloEmyto public {
          selfdestruct(emyto);
    }
    
    // comprador
    function depositarGarantiaEnContrato(uint _idContrato) soloCompradorConAgente(_idContrato) enEstado(_idContrato, Estado.ESPERANDO_PAGO) public payable{
        //Comisiones
        uint256 dineroVendedor = msg.value*(100000000000000000000-contratos[_idContrato].comision-comision_emyto)/100000000000000000000; 
        uint256 dineroAgente = msg.value*contratos[_idContrato].comision/100000000000000000000;
        uint256 dineroEmyto = msg.value*comision_emyto/100000000000000000000;

        contratos[_idContrato].agente.transfer(dineroAgente);
        emyto.transfer(dineroEmyto);

        //Deposito en contrato
        contratos[_idContrato].depositos[contratos[_idContrato].vendedor] = contratos[_idContrato].depositos[contratos[_idContrato].vendedor] + dineroVendedor;

        contratos[_idContrato].estadoActual = Estado.ESPERANDO_ENVIO;
    }

    function depositarGarantiaEnVendedor(uint _idContrato) soloCompradorConAgente(_idContrato) enEstado(_idContrato, Estado.ESPERANDO_ENVIO) public{
        
        //Deposito en vendedor
        uint256 dineroVendedor = contratos[_idContrato].depositos[contratos[_idContrato].vendedor];
        contratos[_idContrato].depositos[contratos[_idContrato].vendedor] = 0;

        contratos[_idContrato].vendedor.transfer(dineroVendedor);

        contratos[_idContrato].estadoActual = Estado.COMPLETO;
    }
    
    // vendedor
    function devolverGarantiaAlComprador(uint _idContrato) soloVendedorConAgente(_idContrato) enEstado(_idContrato, Estado.ESPERANDO_ENVIO) public{
        //Deposito en comprador
        uint256 dinero = contratos[_idContrato].depositos[contratos[_idContrato].vendedor];
        contratos[_idContrato].depositos[contratos[_idContrato].vendedor] = 0;

        contratos[_idContrato].comprador.transfer(dinero);

        contratos[_idContrato].estadoActual = Estado.COMPLETO;
    }
    
    // agente
    function reiniciarTransaccion(uint _idContrato) soloAgente(_idContrato) public{
        //Reinicio el contrato
        contratos[_idContrato].estadoActual = Estado.ESPERANDO_ENVIO;

        //Devuelvo el deposito al comprador
        devolverGarantiaAlComprador(_idContrato);

        contratos[_idContrato].estadoActual = Estado.ESPERANDO_PAGO;
    }    
    
}