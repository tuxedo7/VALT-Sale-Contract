// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestUSDT is ERC20 {
    constructor() ERC20("TestUSDT", "TUSDT") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function decimals() public pure override returns (uint8) {
        return 18; // or set to 6 to simulate real USDT behavior
    }
}
