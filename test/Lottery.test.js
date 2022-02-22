const assert = require('assert');
const ganache = require('ganache-cli');
const { beforeEach, describe } = require('mocha');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

// console.log(require('../compile'))

const compiledObject = require('../compile');
const abi = compiledObject.abi;
const bytecode = compiledObject.evm.bytecode;

let lottery;
let accounts;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();
    console.log(bytecode.object)
    lottery = await new web3.eth.Contract(abi,{ from: accounts[0], gas: '1000000' })
        .deploy({data: bytecode.object})
        .send({ from: accounts[0], gas: '1000000' })

})


describe('Lottery Contract', async ()=>{
    it('deploys a contract', ()=>{
        assert.ok(lottery.options.address)
    });
});