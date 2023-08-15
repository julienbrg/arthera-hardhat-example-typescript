import { ethers } from "hardhat"
const color = require("cli-color")
const msg = color.xterm(39).bgXterm(128)

async function main() {


    // Create a wallet instance from the private key
// const wallet = new ethers.Wallet("163f5f0f9a621d72fedd85ffca3d08d131ab4e812181e0d30ffd1c885d20aac7");
                                //  "163f5f0f9a621d72fedd85ffca3d08d131ab4e812181e0d30ffd1c885d20aac7"

                //                0x239fA7623354eC26520dE878B52f13Fe84b06971

// Get the public address from the wallet
// const publicAddress = wallet.address;

// console.log("publicAddress:", publicAddress)

// console.log("publicAddress:",  await ethers.provider.getBalance(publicAddress))

// console.log("validator publicAddress:",  await ethers.provider.getBalance("0x40bd65cfc4D95844704F4b2a2c46a60f6d6CE766"))



  // Listens to every block change
  ethers.provider.on("block", (blockNumber:any) => {

    console.log(`block change detected`)




    const getBlockTimeStamp = async () => {
      const bts = (await ethers.provider.getBlock(blockNumber)).timestamp
      return bts
    }

    getBlockTimeStamp().then(bts => {
      console.log(" ")
      console.log(`Block ${msg(blockNumber)} was mined at ${bts}`)
      console.log(" ")
    })
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});