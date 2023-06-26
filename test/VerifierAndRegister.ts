import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { ProofRegister, UltraVerifier } from "../typechain-types";

describe("TurboVerifier & ProofRegister contracts", function () {
  let verifierContract: UltraVerifier;
  let registerContract: ProofRegister;
  beforeEach(async () => {
    const verifierDeployer = await ethers.getContractFactory("UltraVerifier");
    verifierContract = await verifierDeployer.deploy();
    await verifierContract.deployed();
    const verifierAddy = verifierContract.address;
    const registerDeployer = await ethers.getContractFactory("ProofRegister");
    registerContract = await registerDeployer.deploy(verifierAddy);
    await registerContract.deployed();
  });
  describe("deployments", async function () {
    it("TurboVerifier deploys successfully", async function () {
      const verifierAddy = verifierContract.address;
      assert.notEqual(verifierAddy, ethers.constants.AddressZero);
      assert.isDefined(verifierAddy);
    });
    it("ProofRegister deploys successfully", async function () {
      const registerAddy = registerContract.address;
      assert.notEqual(registerAddy, ethers.constants.AddressZero);
      assert.isDefined(registerAddy);
    });
  });
  // TODO: rerun once latest Noir version is available, as it should fix the problem
  describe("proof verifications", async function () {
    it("verify valid proof as expected", async function () {
      // Verify valid proof generated by `nargo prove p` -- see ./src/main.nr
      const proof = `23a92ef01b54d62719525132e7272179fc83fcc910b78f00c575f0be95c397981bd35a735cdc85e0f3a12b5cd6f995c58f33ea4dd24816ee7ce79bfc9d84dee11deb102da3ac3c35fc55fa7c82ecd817f146e623dbea359e6d2152cf50be54ce2218b3a1fcd5a1919ea8039f2da1719b0277c58bddb76d3836241e8d20b969dc0e16f443d66f1d6ad2c1a0c3914011ed82425467c0d5ea46b630a2025445368903aaf47993e861ac29e23435ac489b052c5df3acd3339567aedd1aa7438db27810178b73a06b97767956f88b6803c059243cdac7dadc43b18631a8e50737aa0f0103127796d8c592e11fe6e72a3d9432a23e298daba8f275a1bb3958e755b167059e9df08d4519836d14055c553728d98dbc2fd4365cb58afb8b979767661495085392a4dfd0c6a46b1e6cee141321ce57c8e78c9add48d5473516a2e10d5c0530111015661dc96a514d91ef8d08cc63b09a725387d791107d18eacbc3215469029416af9138abe728b30491130fd95eb1a09574836db8fd2114c756d6cbda6e2b852591c4a4fac2e924918ebd97b2293eab5396f738d7892fa5047489b8e0f114f1f9764880c418052a229e9667a78e7903ab787b5719927a286b5880557b101cf79e09c2865b93178b571dcd0bff27cd902e87e300753a51ea1d1805adc5d824372f0e3262daac7625c02b55db080bea5a83225252d2506560926d398fc7140669b33ea43851e270628193ccbe9e7020289afffd4a339e33ba094c3aa8f4a10773a953c44eb4a6946221373ad2e3c4b0020a46a21f3eeaf4dcaa661de6f6e02b3263a1009ca57420512b29f18fb3d16cfeb4b70297e63b5a43aa858adbf0982972b44653858e74e63d7e10896b75b076d280de84a8c587247b4c209f85241d064fe821ecf240dc14d090fedd3655eda6ba43590556e72a2d35e5c24637e4190bac26b181fbf7f9975cc1443be191bc86b9a78c217e75102b53de1a9aac781c2dc3ab9ae5340a5e78a230f2a913e277ed3accdee4f61f410fa5c6d551197fea05b8638e6d5ec7e60cd25b5bb820706d83edacfd55f00ffdfa44c5cbe14c812d2e32b2daf9308a9c6545c5c31ff181aa2931c092dfe7c0be4d046ecbd09749072c6816c8f37d64cee858fcd8f046189131949f965eeca43f42a7051812ab1842261438c7aab861b1a21f1ace99460d597fd2b094577638223abf5341a8d8b8ef1496e94c618e82d55472a42c124f7165032d1e0dc00a424bba0298bf34535c190b182c1dcac6e3b77b9815511d42faa74fca6a8f6bfd9ce64495733fe6e3fcc5210659159c91842c0a08eddd94886296eeab89e58a1d78810bb366217c68df091af2dc7f8e7cbceb1e2571adc8e566f4255493dbfb9f50723178969d891387ef2ffccf9cb54d303c8c9290f114ec8f9c983eb53074dd0c69daa836cf5941a55424864b1bd75097597e2073913d45c03f1073f82b7d188bd6b7ee70e3fb551f0f0599cd66e9a6fbe39273fce77abc294e0a35889b82303dad7ea7d318f410db4616c084c387d4b7ba0cfbdfab1a2cb64cff179c1bf4b74285254aacda7fc3390213a774671626300725b19378b5e6084e4e8a22375a0467c7d7bdea9359aa242f29a61e8369aeb5389dd99091413ddbff5c2b86f67c12cf402131a44d5816e2b5125762ffc5fa5b0fcd71a8f4167c586eea57047f218b04be7a1296ece8d5e61c14885b0b2a37d4b8b91648f31873020d191aef3b2bd4eb1751d8277d94cda62227b39ef454f1d4e53ebd9baccb7d1ef92d5679ca263ebf678d31c71c200df72902c3e670d6401ec74cceb76b2ec2a316c55347014857dce69b8c896f4d9922970d0051e41adad8abf99a82330403ffb25ddd7a267c254ee9929e4a59551683a51c6eaa8c632d6c66c7f5d49e93764f246442503157bbc2ef2a7a3c730748c6da015c96abed669789af6fe6dc95e493e5e6de2b433b445e71c6d31e98358796bd027751d730674cb79e1a4d13f7d9bec325afbe8cc505f671369425488ab9c45a2f5807ad0757a6391a59691699ab37622bb67bb2536de79ce8c68cbd333859dd2659ecad6474c3898c15c285f53408e73f29f19055d561a0c8ea0a3508262c5022b9a133ea131c09938816cfb25d489b137295f1a80e187f745001e73d90259e226eccd82b945d4695920dd46bf558174178394634f8469c2a284fe8bc28438112f7d1abd23193e9163fe79a373ba3123666aeac4da9f2e8d673c88d135baf670ed4a7727d4bc263f774f14df973c1072eb228382b704a03b73099cab039034d14f2256ef3d2e3071070a72a5c1304eb019d58d52911502bcfb7616bb05dd43f2b027ad2fde96e0e465b88c8241aefccbacb1095b5153b99a76cacdb8488732f11701c88439a244663f7aa23e5367dcbf6f6f0f062cc74b0997a6e6978220c202a8123fb35bbeacae712c1ead2366dd98952970034a37804d84297856a32bfb40059192d7435c45f1e7c1a15b326b7798014228911bed405bb4f37d5ace6fbe72f3a262ba870b63ac2f8473ff67cd2a168df3e1912c9f5157d6335981e1c3c7e136b4afdf3f44026d177a3a5aa88d1a8bcf4a8eec4f768250b61a7a03f1159fd0a7099840be3bc5ae7339d67b26843039377c3d0947b753972a4cfa93fcaee87197db229d418e71c46b659e8718cc9277326e8056e881d3f91fe38fc938456831b6fbe71cb07574e72639936a8a07cc776dcd1ca1e88d0e0b09621d6e6805701067177d980c72c318d8f681e471aec9df9904370ba46473795fe30327302095127f6e35a9460bc969ca9cac34f939ca32e1545d6a0d4b4964ee37417c54b4ae21eea93ec28223faa8ee095f5c1f8585df0a3294f607ab366f6a3b0f91e028cd91067aefa8b1ecf5045cf63fb1bce70c507ecc2f0ad6b86e48b5962b05a93ad9022c4ce5fba65971dbfdbb38c23cd99d3dbf0e1c48b668f870f551316224b9d582536e97856a3978b0695b3e6da022c9575e3a51d46897c77a097a63fca2b2022`;
      const proofBytes = Uint8Array.from(Buffer.from(proof, "hex"));
      // console.log(proofBytes.map(b => "0x" + b.toString(16)).join(','))
      // console.log(proofBytes)
      let proofIsValid = await verifierContract.verify(proofBytes, [
        "0x26ed5e1af87ec150f8f69345f4b4db8ae49fea36516f72403ed590fa1bfe3570",
        "0x0f3fc7cbde26e9f4972e074591a3aa2e3e125e71285aad8174bd73aeb0876d5f",
      ]);
      assert(proofIsValid);
    });
    it("fails to verify invalid proof", async function () {
      // Random proof would be invalid
      const proof = `00a2d38aa82afa8730eafd384ef4abab476b66e9f91cefcd0533f6629c8822650cc00418a01f2391d760aa9400ffdfc936bd5670610c526aed3c495b12b71b9e190ec7209aa2283952209cbfa18343c2824d78b1b00731c1c16107bda6d01da60322990b319608d3f21db620c5bfb5ccc7e4eaeb8763211dfaf6c0b0be457c8c1443b34da3a5c5fcdfab6737f811e61668cf7d0ad31ab99f32af66db69b4188f22038dfef210051d4b7e12ec1d782c1d6717afa0324b2336622facdbf51f60a309731f1131e3398bcf03dbdb4b42d6632d3a6206803e20eabd2199822863edc92528184bfa098e16d8b7e18427e81bacedb775148a6d72ed59558bd14b3127da28957fee857eed2ade10d0e3bbdfa6cca5d72fbfdbbef485445d95ee31bb5e6918571fd4ecb67e5cb3b052e138575c1a84b4b488a5b50be24a1d3da687c06a7921e0c60e9148dfca37119e61fab383ef0dd498d450ec3ac3b49cd08286a98f931afed932d1e0e2500cf2e0ce44b878fce9bbdda802ae4d271f7ef3da5b815aa60f28c75d7d7eebf5673a6337d3392331178268fd1eb27768e21ff6247c834543264e65a32554fdb54623d886ff2451cff5b70ea8eb206ab7091dbe84222901e12097306163061cbd2ba6f7f5a0d98d0776f0bcb506968a2d2d25a016b58ce5cb08594d24bede7660e6bde5bfff65fb9970d1980a952de4e66898d3edc3ca0c3614541c92f6060ecbc217f19613a9f60adc54ea99614dbb61d88dec99c283b0e42489fa36c6cd16df1f03d3913e311743096f035a212341b74310af86f859d5f40a2509f5044fdb3fd191ad75ee15ba71dbbee4de28ffb0d157c511b43b13b7150e3def246140bf08ce7192c1b01643f8f3ad4c31b7c4d2b875a8adfc71297dd60ea84208e7d74552e6ee78c7d304d1d385b4cad5374682e9bdd58d754ce5340f1eb1e7ac95af3a12b832857f4fcc3f3d85b54c70c687037b2613cd5bc23e895f14fd17c3e16d0aa4bb55f9c6f0ca5de4bedc1ffd2d2b78ab65b7e20875b00e1b1dc6dc060ca5e74f6a27a9ae1c2105da76b766a1f06990216c65ad438ef7261e29e8788624579d96d664c81781f62a85447dfda66827b184dc88abb64d8a2d892b927db4bd669b92fc2888e275ad8c5625696a4b429d9cf00951b57233625abb1e038d8b9edf99e82dcc8abf51f493e6766638abd724912eb0cc679f1ed983711bb5af38f6b0a2c806c28382333c048838772dc4f75c8dc5d342c5c8c13255dd14fe98ff4b23cf84562d4715a91a4240f51fc58f48dc48eae52098fb63e6b493136581891bfea052fa393be4b63037094285b79e22a41545c34d78af5331225312ff0ceaa6eed158a880e23296417d270b4bf53264854fb19e1282b35cbafe0c156e63b3a7ff3c03ef59e6815944d24ba74245a2cc4a3b472e52554c82460dd60fa5dfa028f0b77a98a241aa3c16388e7cf4b5007ec985e245b5942a306ba5bb0690852718ba8fdcf492939a926976b63b8f5dac7e0b5f9d9addf7ba74dc65132172d90014988796107c20177d52c9345db69773066053aed4f321c50e87719704c0f2f78d1eb0e44705b4e3f0bb2e6e9b2deffacd09f29b2655583438ab0c8417757cd10ec53c44451cd85d98ed0f60e9f9082da76fae5afe78f905a000d469`;
      const proofBytes = Uint8Array.from(Buffer.from(proof, "hex"));
      let proofIsValid = await verifierContract.verify(proofBytes, [
        "0x1cc39cc5398172f4f7cdd483e2aba5bc1fc1c28826d0ea5ca6183301fc3439c6",
        "0x0fdf13cc2206bf0fcc38f3fbc1d4cfa3bb54890840d52a03c9511ec6a1ff06ce",
      ]);
      assert(!proofIsValid);
    });
  });
});
