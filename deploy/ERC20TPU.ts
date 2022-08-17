import { HardhatRuntimeEnvironment } from 'hardhat/types';

module.exports = async function (hre: HardhatRuntimeEnvironment) {
    console.log(`ChainId: ${await hre.getChainId()}`)

    const { deployments, getNamedAccounts, ethers } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();
    const balance = await ethers.provider.getBalance(deployer)

    console.log(`Deployer: ${deployer} , balance: ${ethers.utils.formatEther(balance)} `)

    const name = 'ERC20TPU'
    const symbol = 'TPU'
    const owner = await ethers.provider._getAddress(deployer)

    await deploy('ERC20TPU', {
        args: [
            name,
            symbol,
            owner,
        ],
        from: deployer,
        log: true,
    });
};

module.exports.tags = ["ERC20TPU"];