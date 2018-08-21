const EthereumTx = require('ethereumjs-tx');
const EthereumUtils = require('ethereumjs-util');

const code = require('../build/ERC820Registry.sol').ERC820RegistryByteCode;
const ERC820Registry = require('../build/contracts').ERC820Registry;

const generateDeployTx = () => {
  const rawTx = {
    nonce: 0,
    gasPrice: 100000000000,
    gasLimit: 800000,
    value: 0,
    data: code,
    v: 27,
    r: '0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798',
    s: '0x0aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  };
  const tx = new EthereumTx(rawTx);
  const res = {
    sender: EthereumUtils.toChecksumAddress(
      `0x${tx.getSenderAddress().toString('hex')}`
    ),
    rawTx: `0x${tx.serialize().toString('hex')}`,
    contractAddr: EthereumUtils.toChecksumAddress(
      `0x${EthereumUtils.generateAddress(
        `0x${tx.getSenderAddress().toString('hex')}`,
        0
      ).toString('hex')}`
    ),
  };
  return res;
};

const deploy = async (web3, account) => {
  const res = generateDeployTx();

  const deployedCode = await web3.eth.getCode(res.contractAddr);

  if (deployedCode.length <= 3) {
    await web3.eth.sendTransaction({
      from: account,
      to: res.sender,
      value: '100000000000000000' /* web3.utils.toWei(0.1) */,
    });
    await web3.eth.sendRawTransaction(res.rawTx);
  }
  return new ERC820Registry(web3, res.contractAddr);
};

module.exports.generateDeployTx = generateDeployTx;
module.exports.deploy = deploy;
