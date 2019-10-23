pragma solidity ^0.5.8;

contract LotteryContract {
    address payable contract_owner;
    uint8 magic_number;
    uint8[] guesses_made;
    uint balance;
    event child_killed();

    modifier OwnerOnly{require(msg.sender == contract_owner, "Must be the owner of the contract");_;}
    modifier MinAnte{require(msg.value >= 0.25 ether, "Minimum ante for the contract is 0.25 ETH");_;}

    constructor(uint8 _magic_number) public {
        magic_number = _magic_number;
        balance = 0;
    }
    function make_guess(uint8 player_guess) public payable MinAnte {
        // record last guesses
        guesses_made.push(player_guess);
        // collect guess ante
        balance += msg.value;
        // check to see if the guess is correct
        if (player_guess == magic_number) {
            contract_owner = msg.sender;
            kill_contract();
        }
    }
    function get_magic_number() public view returns (uint8) { return magic_number; }
    function get_num_guesses() public view returns (uint256) { return guesses_made.length; }
    function get_balance_in_contract() public view returns (uint) { return balance; }
    function() external payable{}
    function kill_contract() public OwnerOnly{
        // event triggers child creation from front end
        emit child_killed();
        selfdestruct(contract_owner);
    }
}
