// migrating the appropriate contracts
var BuyerRole = artifacts.require('./BuyerRole.sol');
var PharmaRole = artifacts.require('./PharmaRole.sol');
var RegulatorRole = artifacts.require('./RegulatorRole.sol');
var SupplyChain = artifacts.require('./SupplyChain.sol');

module.exports = function (deployer) {
  deployer.deploy(BuyerRole);
  deployer.deploy(PharmaRole);
  deployer.deploy(RegulatorRole);
  deployer.deploy(SupplyChain);
};
