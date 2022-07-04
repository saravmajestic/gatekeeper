// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GateKeeper is ERC721 {
    struct LicenseAttributes {
        string productID;
        string productLicenseKey;
        string meta;
    }
    mapping(uint256 => LicenseAttributes) public nftHolderAttributes;
    mapping(address => uint256[]) public nftHolders;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event LicenseMinted(address sender, uint256 tokenId, string productId);

    constructor() ERC721("GateKeeper", "License") {
        _tokenIds.increment();
    }

    function mintLicenseNFT(
        string memory _productId,
        string memory _licenseKey,
        string memory _meta
    ) external {
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        nftHolderAttributes[newItemId] = LicenseAttributes({
            productID: _productId,
            productLicenseKey: _licenseKey,
            meta: _meta
        });

        console.log(
            "Minted NFT w/ tokenId %s and productID %s",
            newItemId,
            _productId
        );

        nftHolders[msg.sender].push(newItemId);

        // Increment the tokenId for the next person that uses it.
        _tokenIds.increment();
        emit LicenseMinted(msg.sender, newItemId, _productId);
    }

    function getUserLicenses()
        external
        view
        returns (LicenseAttributes[] memory)
    {
        uint256[] memory tokenIds = nftHolders[msg.sender];
        if (tokenIds.length > 0) {
            LicenseAttributes[]
                memory allLicensesAttributes = new LicenseAttributes[](
                    tokenIds.length
                );
            for (uint256 i = 0; i < tokenIds.length; i++) {
                uint256 tokenId = tokenIds[i];
                allLicensesAttributes[i] = nftHolderAttributes[tokenId];
            }
            return allLicensesAttributes;
        }

        LicenseAttributes[] memory emptyStruct = new LicenseAttributes[](0);
        return emptyStruct;
    }
}
