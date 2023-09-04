import fs from 'fs'
import color from "cli-color"
var msg = color.xterm(39).bgXterm(128);
import {keitaContractAddress} from './utils'

async function dance() {

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

  // Calling the dance() function
  const keita = new ethers.Contract(keitaContractAddress, keitaContractAbi.abi, signer)
  const keitaOwner = await keita.owner()
  console.log("keitaOwner:", keitaOwner)
  console.log("signerAddress:", signerAddress)
  const balBefore = await ethers.provider.getBalance(signerAddress)
  console.log('Balance before the dance:', Number(balBefore))

  const dance = await keita.dance({gasLimit:420000})
  await dance.wait(1)
  // console.log('\nDance call:', dance);

  const balAfter = await ethers.provider.getBalance(signerAddress)
  console.log('Balance  after the dance:', Number(balAfter))
  console.log('\nTotal amount of AA spent (tx fee):', msg(Number(balBefore-balAfter)))
  console.log('\nIncremented. ✅ \n\nThe value of wins is now', Number(await keita.wins()), '\n\nTx hash:', msg(dance.hash));
}

dance().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});