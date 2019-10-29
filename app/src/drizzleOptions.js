import LotteryFactory from './contracts/LotteryFactory.json';

const options = {
    contracts: [LotteryFactory],
    web3: {
        fallback: {
            type: "ws",
            // url: "ws://127.0.0.1:7545", // Ganache App
            // url: "ws://127.0.0.1:8545", // Metamask & Ganache-cli
            url: "ws://127.0.0.1:9545", // Truffle Develop
        },
    }
};

export default options;