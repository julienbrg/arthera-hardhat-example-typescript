import { ethers, network } from "hardhat"
const color = require("cli-color")
const msg = color.xterm(39).bgXterm(128)

async function main() {

  console.log('\nListening to', msg(network.name) + '...')

  // Listens to every block change
  ethers.provider.on("block", (blockNumber:any) => {

    const getBlockTimeStamp = async () => {
      const bts = (await ethers.provider.getBlock(blockNumber)).timestamp
      return bts
    }

    getBlockTimeStamp().then(bts => {
      console.log(`\nBlock ${msg(blockNumber)} was mined at ${bts}`)
    })
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});