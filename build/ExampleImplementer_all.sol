
//File: contracts/ERC820ImplementerInterface.sol
pragma solidity ^0.4.24;

contract ERC820ImplementerInterface {
    bytes32 constant ERC820_ACCEPT_MAGIC = keccak256(abi.encodePacked("ERC820_ACCEPT_MAGIC"));

    /// @notice Indicates whether the contract implements the interface `interfaceHash` for the address `addr`.
    /// @param addr Address for which the contract will implement the interface
    /// @param interfaceHash keccak256 hash of the name of the interface
    /// @return ERC820_ACCEPT_MAGIC only if the contract implements `ìnterfaceHash` for the address `addr`.
    function canImplementInterfaceForAddress(address addr, bytes32 interfaceHash) public view returns(bytes32);
}

//File: contracts/ExampleImplementer.sol
pragma solidity ^0.4.24;




contract ExampleImplementer is ERC820ImplementerInterface {
    function canImplementInterfaceForAddress(address addr, bytes32 interfaceHash) public view returns(bytes32) {
        return ERC820_ACCEPT_MAGIC;
    }
}
