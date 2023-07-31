import color from "cli-color"
var msg = color.xterm(39).bgXterm(128);

async function deploy() {

  const Keita = await ethers.getContractFactory("Keita");
  const keita = await Keita.deploy();
  await keita.waitForDeployment();

  console.log('\nKeita contract deployed at', msg(await keita.getAddress()));
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});