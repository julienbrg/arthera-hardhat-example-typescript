import fs from 'fs'
import color from "cli-color"
import {subscribersContractAddress, subscribersContractAbi, keitaContractAddress} from './utils'
var msg = color.xterm(39).bgXterm(128);

// You must use the 1st validator private key to create a plan
async function createPlan() {
 
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




    const CAP_FREQUENCY_NONE = 0;
    const CAP_FREQUENCY_HOURLY = 1;
    const CAP_FREQUENCY_DAILY = 2;

    const [payer] = await ethers.getSigners();
    const balance = await await ethers.provider.getBalance(signerAddress);
    console.log('balance:', balance);

    const Subscribers = await ethers.getContractFactory("Subscribers");
    const subscribers = subscriberContract;

    let FixedSubscriptionPriceProvider = await ethers.getContractFactory("FixedSubscriptionPriceProvider");
    const priceProvider = await FixedSubscriptionPriceProvider.deploy();
    await subscribers.connect(payer).setPriceProvider(priceProvider.address);

    // create user plan
    let tx = await subscribers.connect(payer).createPlan(
        "User Plan", "The 1$ user plan that covers basic use cases", 30, 1_000_000, 100, CAP_FREQUENCY_NONE, 0, false,
        { gasLimit: 1_000_000 }
    );
    let result = await tx.wait();
    const userPlanId = result.events[0].args['planId'].toNumber();
    console.log("Created user plan with id="+userPlanId);

    // create dapp plan
    tx = await subscribers.connect(payer).createPlan(
        "DApp Plan", "A plan dedicated to DApps", 30, 100_000_000, 1000, CAP_FREQUENCY_NONE, 0, true,
        { gasLimit: 1_000_000 }
    );
    result = await tx.wait();
    const dappPlanId = result.events[0].args['planId'].toNumber();
    console.log("Created DApp plan with id="+dappPlanId);

    tx = await subscribers.connect(payer).setActive(dappPlanId, true);
    console.log("Activated DApp plan with id="+dappPlanId);

    tx = await subscribers.connect(payer).setActive(userPlanId, true);
    console.log("Activated user plan with id="+userPlanId);








  const getSubscriptionDataTx = await subscriberContract.getSubscriptionData(signerAddress)
  console.log("getSubscriptionDataTx:", getSubscriptionDataTx)

  const getSubscriptionTokenIdTx = await subscriberContract.getSubscriptionTokenId(signerAddress)
  console.log("getSubscriptionTokenIdTx:", getSubscriptionTokenIdTx)

  const planId = getSubscriptionDataTx[0]
  console.log("planId:", planId)

  console.log('hasActiveSubscription:', await subscriberContract.hasActiveSubscription(keitaContractAddress))
}

createPlan().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});