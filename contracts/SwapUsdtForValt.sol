// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ValtSwap is Ownable, Pausable, ReentrancyGuard {
    IERC20 public usdt;
    IERC20 public valt;

    uint256 public maxSwapAmount = 100_000 * 1e18;
    uint256 public rate = 1e8; // 1:1 default (8 decimal scaling)

    mapping(address => bool) public isOrganizer;
    event OrganizerAdded(address organizer);
    event OrganizerRemoved(address organizer);
    event TokensSwapped(
        address indexed user,
        uint256 usdtAmount,
        uint256 valtAmount
    );
    event UsdtReceived(address indexed from, uint256 amount);
    event EmergencyWithdrawal(address token, uint256 amount);
    event MaxSwapAmountUpdated(uint256 newLimit);
    event RateUpdated(uint256 newRate);

    constructor(address _usdtAddress, address _valtAddress) {
        require(_usdtAddress != address(0), "Invalid USDT address");
        require(_valtAddress != address(0), "Invalid VALT address");

        usdt = IERC20(_usdtAddress);
        valt = IERC20(_valtAddress);
    }

    function swapUsdtForValt(
        uint256 usdtAmount,
        address organizer
    ) external whenNotPaused nonReentrant {
        require(usdtAmount > 0, "Amount must be > 0");
        require(usdtAmount <= maxSwapAmount, "Exceeds max swap limit");
        require(isOrganizer[organizer], "Invalid organizer");

        uint256 valtAmount = (usdtAmount * rate) / 1e18;

        // Transfer USDT from user to selected organizer
        usdt.transferFrom(msg.sender, organizer, usdtAmount);
        emit UsdtReceived(msg.sender, usdtAmount);

        // Send VALT to user from this contract
        require(
            valt.balanceOf(address(this)) >= valtAmount,
            "Insufficient VALT"
        );
        valt.transfer(msg.sender, valtAmount);

        emit TokensSwapped(msg.sender, usdtAmount, valtAmount);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function addOrganizer(address organizer) external onlyOwner {
        require(organizer != address(0), "Invalid address");
        isOrganizer[organizer] = true;
        emit OrganizerAdded(organizer);
    }

    function replaceOrganizer(
        address oldOrganizer,
        address newOrganizer
    ) external onlyOwner {
        require(isOrganizer[oldOrganizer], "Old organizer not found");
        require(newOrganizer != address(0), "Invalid new organizer address");

        isOrganizer[oldOrganizer] = false;
        emit OrganizerRemoved(oldOrganizer);

        isOrganizer[newOrganizer] = true;
        emit OrganizerAdded(newOrganizer);
    }

    function removeOrganizer(address organizer) external onlyOwner {
        require(isOrganizer[organizer], "Organizer not found");
        isOrganizer[organizer] = false;
        emit OrganizerRemoved(organizer);
    }

    function emergencyWithdraw(
        address token,
        uint256 amount
    ) external onlyOwner {
        IERC20(token).transfer(msg.sender, amount);
        emit EmergencyWithdrawal(token, amount);
    }

    function setMaxSwapAmount(uint256 _newLimit) external onlyOwner {
        require(_newLimit > 0, "Limit must be > 0");
        maxSwapAmount = _newLimit;
        emit MaxSwapAmountUpdated(_newLimit);
    }

    function setRate(uint256 _newRate) external onlyOwner {
        require(_newRate > 0, "Rate must be > 0");
        require(_newRate < 1e12, "Rate too high");
        rate = _newRate;
        emit RateUpdated(_newRate);
    }
}
