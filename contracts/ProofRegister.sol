// SPDX-License-Identifier: GPL-2.0-only

pragma solidity >=0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface Verifier {
    function verify(
        bytes calldata _proof,
        bytes32[] calldata _publicInputs
    ) external view returns (bool);
}

contract ProofRegister is Ownable {
    event ProofRegistered(bytes32 indexed _matchee1, bytes32 indexed _matchee2);
    event WhitelistUpdated(address indexed _addy, bool indexed _approved);

    Verifier verifier;
    mapping(address => bool) whitelist;

    constructor(address _addy) {
        verifier = Verifier(_addy);
    }

    function verifyAndRegister(
        bytes calldata _proof,
        bytes32[] calldata _publicInputs,
        bytes32 _matchee1,
        bytes32 _matchee2
    ) public {
        if (verifier.verify(_proof, _publicInputs)) {
            emit ProofRegistered(_matchee1, _matchee2);
        }
    }

    function updateWhitelist(address _addy, bool _approved) public onlyOwner {
        whitelist[_addy] = _approved;
        emit WhitelistUpdated(_addy, _approved);
    }
}
