pragma solidity ^0.5.8;
import "./LotteryContract.sol";

contract LotteryFactory {
    LotteryContract[] children;
    uint8 child_count;
    modifier NotChildless {require(child_count > 0, "Contract has no children");  _;}

    constructor() public {
        child_count = 0;
        create_child();
    }
    function create_child() public {
        child_count += 1;
        children.push(new LotteryContract(random()));
    }
    function get_latest_child() public view returns (LotteryContract) {
        return children[child_count-1];
    }
    function get_num_children() public view returns (uint256) {
        return child_count;
    }
    function random() public view returns (uint8) { return uint8(uint256(keccak256(abi.encode(block.timestamp)))%9 + 1); }
}