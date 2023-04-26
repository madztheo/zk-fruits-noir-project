const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("TurboVerifier & ProofRegister contracts", function () {
  let verifierContract;
  let registerContract;
  beforeEach(async () => {
    const verifierDeployer = await ethers.getContractFactory("TurboVerifier");
    const verifierDeployed = await verifierDeployer.deploy();
    verifierContract = await verifierDeployed.deployed();
    const verifierAddy = verifierContract.address;
    const registerDeployer = await ethers.getContractFactory("ProofRegister");
    const registerDeployed = await registerDeployer.deploy(verifierAddy);
    registerContract = await registerDeployed.deployed();
  });
  describe("deployments", async function () {
    it("TurboVerifier deploys successfully", async function () {
      const verifierAddy = verifierContract.address;
      assert.notEqual(verifierAddy, 0x0);
      assert.notEqual(verifierAddy, "");
      assert.notEqual(verifierAddy, null);
      assert.notEqual(verifierAddy, undefined);
    });
    it("ProofRegister deploys successfully", async function () {
      const registerAddy = registerContract.address;
      assert.notEqual(registerAddy, 0x0);
      assert.notEqual(registerAddy, "");
      assert.notEqual(registerAddy, null);
      assert.notEqual(registerAddy, undefined);
    });
  });
  // TODO: rerun once latest Noir version is available, as it should fix the problem
  describe("proof verifications", async function () {
    it("verify valid proof as expected", async function () {
      // Verify valid proof generated by `nargo prove p` -- see ./src/main.nr
      const proof = `00c1d38aa82afa8730eafd384ef4abab476b66e9f91cefcd0533f6629c8822650cc00418a01f2391d760aa9400ffdfc936bd5670610c526aed3c495b12b71b9e190ec7209aa2283952209cbfa18343c2824d78b1b00731c1c16107bda6d01da60322990b319608d3f21db620c5bfb5ccc7e4eaeb8763211dfaf6c0b0be457c8c1443b34da3a5c5fcdfab6737f811e61668cf7d0ad31ab99f32af66db69b4188f22038dfef210051d4b7e12ec1d782c1d6717afa0324b2336622facdbf51f60a309731f1131e3398bcf03dbdb4b42d6632d3a6206803e20eabd2199822863edc92528184bfa098e16d8b7e18427e81bacedb775148a6d72ed59558bd14b3127da28957fee857eed2ade10d0e3bbdfa6cca5d72fbfdbbef485445d95ee31bb5e6918571fd4ecb67e5cb3b052e138575c1a84b4b488a5b50be24a1d3da687c06a7921e0c60e9148dfca37119e61fab383ef0dd498d450ec3ac3b49cd08286a98f931afed932d1e0e2500cf2e0ce44b878fce9bbdda802ae4d271f7ef3da5b815aa60f28c75d7d7eebf5673a6337d3392331178268fd1eb27768e21ff6247c834543264e65a32554fdb54623d886ff2451cff5b70ea8eb206ab7091dbe84222901e12097306163061cbd2ba6f7f5a0d98d0776f0bcb506968a2d2d25a016b58ce5cb08594d24bede7660e6bde5bfff65fb9970d1980a952de4e66898d3edc3ca0c3614541c92f6060ecbc217f19613a9f60adc54ea99614dbb61d88dec99c283b0e42489fa36c6cd16df1f03d3913e311743096f035a212341b74310af86f859d5f40a2509f5044fdb3fd191ad75ee15ba71dbbee4de28ffb0d157c511b43b13b7150e3def246140bf08ce7192c1b01643f8f3ad4c31b7c4d2b875a8adfc71297dd60ea84208e7d74552e6ee78c7d304d1d385b4cad5374682e9bdd58d754ce5340f1eb1e7ac95af3a12b832857f4fcc3f3d85b54c70c687037b2613cd5bc23e895f14fd17c3e16d0aa4bb55f9c6f0ca5de4bedc1ffd2d2b78ab65b7e20875b00e1b1dc6dc060ca5e74f6a27a9ae1c2105da76b766a1f06990216c65ad438ef7261e29e8788624579d96d664c81781f62a85447dfda66827b184dc88abb64d8a2d892b927db4bd669b92fc2888e275ad8c5625696a4b429d9cf00951b57233625abb1e038d8b9edf99e82dcc8abf51f493e6766638abd724912eb0cc679f1ed983711bb5af38f6b0a2c806c28382333c048838772dc4f75c8dc5d342c5c8c13255dd14fe98ff4b23cf84562d4715a91a4240f51fc58f48dc48eae52098fb63e6b493136581891bfea052fa393be4b63037094285b79e22a41545c34d78af5331225312ff0ceaa6eed158a880e23296417d270b4bf53264854fb19e1282b35cbafe0c156e63b3a7ff3c03ef59e6815944d24ba74245a2cc4a3b472e52554c82460dd60fa5dfa028f0b77a98a241aa3c16388e7cf4b5007ec985e245b5942a306ba5bb0690852718ba8fdcf492939a926976b63b8f5dac7e0b5f9d9addf7ba74dc65132172d90014988796107c20177d52c9345db69773066053aed4f321c50e87719704c0f2f78d1eb0e44705b4e3f0bb2e6e9b2deffacd09f29b2655583438ab0c8417757cd10ec53c44451cd85d98ed0f60e9f9082da76fae5afe78f905a000d469`;
      const proofBytes = Uint8Array.from(Buffer.from(proof, "hex"));
      // console.log(proofBytes.map(b => "0x" + b.toString(16)).join(','))
      // console.log(proofBytes)
      let proofIsValid = await verifierContract.verify(proofBytes);
      assert(proofIsValid);
    });
    it("fails to verify invalid proof", async function () {
      // Random proof would be invalid
      const proof = `69`;
      const proofBytes = Uint8Array.from(Buffer.from(proof, "hex"));
      let proofIsValid = await verifierContract.verify(proofBytes);
      assert(!proofIsValid);
    });
  });
});
