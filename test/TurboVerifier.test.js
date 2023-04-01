const { ethers } = require("hardhat");
const { assert, expect } = require('chai')

describe("TurboVerifier", function () {
  let contract;
  beforeEach(async () => {
    const verifierDeployer = await ethers.getContractFactory("TurboVerifier")
    const verifierDeployed = await verifierDeployer.deploy()
    contract = await verifierDeployed.deployed()
  })
  describe('deployment', async function () {
    it('deploys successfully', async function () {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })
})
