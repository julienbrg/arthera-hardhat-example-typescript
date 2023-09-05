import fs from 'fs'
import color from "cli-color"
import {subscribersContractAddress, subscribersContractAbi, keitaContractAddress} from './utils'
var msg = color.xterm(39).bgXterm(128);

async function whitelist() {
 
  console.log("keitaContractAddress:", keitaContractAddress)

  const [signer] = await ethers.getSigners()
  const signerAddress = await signer.getAddress()

  // Get the Keita contract ABI
  const abiDir = __dirname + '/../artifacts/contracts';
  const abiFromArtifacts = abiDir + "/" + "Keita.sol" + "/" + "Keita" + ".json"  
  let keitaContractAbi;
  try {
    keitaContractAbi = JSON.parse(fs.readFileSync(abiFromArtifacts,{encoding:'utf8', flag:'r'}));
  } catch (error) {
    console.log(error)
    return;
  }

  const keita = new ethers.Contract(keitaContractAddress, keitaContractAbi.abi, signer)
  console.log('\n\nWins:', Number(await keita.wins()))
  const keitaOwner = await keita.owner()
  console.log("keitaOwner:", keitaOwner)

  console.log("signerAddress:", signerAddress)
  console.log("subscriberContractAddress:", subscribersContractAddress)

  const subscriberContract = new ethers.Contract(subscribersContractAddress, subscribersContractAbi, signer)

  const getSubscriptionDataTx = await subscriberContract.getSubscriptionData(signerAddress)
  console.log("getSubscriptionDataTx:", getSubscriptionDataTx)

  const getSubscriptionTokenIdTx = await subscriberContract.getSubscriptionTokenId(signerAddress)
  console.log("getSubscriptionTokenIdTx:", getSubscriptionTokenIdTx)

  const planId = getSubscriptionDataTx[0]
  console.log("planId:", planId)

  console.log('hasActiveSubscription:', await subscriberContract.hasActiveSubscription(keitaContractAddress))

  const happyUser = "0x90f83754A72A476f260c014cd908801b81e9a817"
  
  ///// call /////

  // const bl = await subscriberContract.blacklistAccount(happyUser)
  const wl = await subscriberContract.whitelistAccount(keitaContractAddress, happyUser)
  await wl.wait(1)

  const whitelistTx = await subscriberContract.isWhitelisted(keitaContractAddress, happyUser)
  console.log("User is whitelisted:", whitelistTx)
}

whitelist().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});