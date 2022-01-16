//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTix is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private _metadata;

    constructor(
        string memory name,
        string memory symbol,
        string memory eventURI
    ) public ERC721(name, symbol) {
        _metadata = eventURI;
    }

    function metadata() public view returns (string memory) {
        return _metadata;
    }

    function awardItem(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        // require(msg.value == 0.01 ether);
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
