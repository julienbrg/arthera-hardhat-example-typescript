import fs from 'fs'
import color from "cli-color"
import {subscribersContractAddress, subscribersContractAbi, keitaContractAddress} from './utils'
var msg = color.xterm(39).bgXterm(128);

async function checkSubsContractOwner() {
 
  const [signer] = await ethers.getSigners()
  const signerAddress = await signer.getAddress()

  console.log("signerAddress:", signerAddress)
  console.log("subscriberContractAddress:", subscribersContractAddress)

  const subscriberContract = new ethers.Contract(subscribersContractAddress, subscribersContractAbi, signer)

  const subsContractOwner = await subscriberContract.owner()
  console.log("subsContractOwner:", subsContractOwner)

  const subsContractOwnerBal = await ethers.provider.getBalance(subsContractOwner)
  console.log("subsContractOwnerBal:", subsContractOwnerBal)

}

checkSubsContractOwner().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});