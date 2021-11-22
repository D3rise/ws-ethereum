const { Web3Contract } = require("./contract");
const { ShopsModule } = require("./modules/shops/shops.module");
const { UsersModule } = require("./modules/users/users.module");

class API {
  constructor(web3Endpoint) {
    this.web3 = new Web3Contract(web3Endpoint);
    this.contract = this.web3.contract;
    this._initClasses();
  }

  async authenticate(username, password, secret) {
    const address = await this.contract.methods.getUserAddress(username).call();
    const { web3 } = this.web3;

    await web3.eth.personal.unlockAccount(address, password);

    const secretHash = web3.utils.sha3(secret);
    const success = await this.contract.methods
      .authenticateUser(username, secretHash)
      .call();

    if (success) {
      this.web3.changeUser(address);
      return address;
    }
  }

  _initClasses() {
    this.users = new UsersModule(this.web3);
    this.shops = new ShopsModule(this.web3);
  }
}

module.exports = { API };