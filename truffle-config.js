const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      // port: 7545,
      // port: 8545,     // ganache-cli
      port: 9545,        // truffle develop
      network_id: "*" // Match any network id
    }
  }
};
