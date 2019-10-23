var LotteryFactory = artifacts.require("./LotteryFactory.sol");
var LotteryContract = artifacts.require("./LotteryContract.sol");

var assert = require('assert');
var web3 = require('web3');

contract('ContractFactory', (accounts) => {
    describe('Effectively Complete Lottery', async () => {
        before(async () => {
            this.lottery_factory = await LotteryFactory.deployed();
            // call its child
            this.latest_child = await this.lottery_factory.get_latest_child();
            this.child_contract = await LotteryContract.at(this.latest_child)
        })
        it('Initiate First Lottery', async () => {
            var count = await this.lottery_factory.get_num_children();
            assert.equal(count, 1, "Count is not 1");
        })
        it('Retrieve Magic Number', async () => {
            this.magic_number = await this.child_contract.get_magic_number();
            assert("Magic Number should be in range [1-9]: ", this.magic_number > 0 && this.magic_number < 10);
        })
        it('Make 2 failing guesses', async () => {
            await this.child_contract.make_guess(this.magic_number+1, {from: accounts[0], value: web3.utils.toWei('0.25', 'ether') });
            await this.child_contract.make_guess(this.magic_number-1, {from: accounts[1], value: web3.utils.toWei('0.35', 'ether') });

            var total_guesses = await this.child_contract.get_num_guesses();
            assert.equal(total_guesses, 2, "Total Guesses should = 2");
        })
        it('Make a winning guess', async () => {
            await this.child_contract.make_guess(this.magic_number+1, {from: accounts[2], value: web3.utils.toWei('0.25', 'ether') });
        })
        it('Check lottery factory', async () => {
            await this.child_contract.make_guess(this.magic_number+1, {from: accounts[2], value: web3.utils.toWei('0.25', 'ether') });
        })
        it('Check LotteryFactory has 1 child', async () => {
            this.num_of_children = await this.lottery_factory.get_num_children();
            assert.equal(this.num_of_children, 1, "LotteryContract does not have 1 child");
        })
    })

    describe('Create another Lottery', async () => {
        before(async () => {
            this.lottery_factory = await LotteryFactory.deployed();
        })
        it('Create a new child', async ()=> {
            await this.lottery_factory.create_child();
        })
        it('Check LotteryFactory has 2 children', async () => {
            this.num_of_children = await this.lottery_factory.get_num_children();
            assert.equal(this.num_of_children, 2, "LotteryContract does not have 2 children");
        })
    })
})