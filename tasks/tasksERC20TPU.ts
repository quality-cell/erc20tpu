import { task } from "hardhat/config"

task("mint", "")
    .addParam("contract", "Create token")
    .addParam("amount", "Amount of ether to be transferred")
    .addParam("account", "Owner's address")
    .addParam("mul", "ten to the power")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        await erc20.mint(taskArgs.account, hre.ethers.utils.parseUnits(String(taskArgs.amount), taskArgs.mul))

        console.log("Task is done")
})

task("name", "Get token name")
    .addParam("contract", "Сontract address")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        const name = await erc20.name()

        console.log(name)
})

task("symbol", "Get token symbol")
    .addParam("contract", "Сontract address")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        const symbol = await erc20.symbol()

        console.log(symbol)
})

task("totalSupply", "Get the total supply of tokens")
    .addParam("contract", "Сontract address")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        const totalSupply = await erc20.totalSupply()

        console.log(totalSupply)
})

task("decimals", "Get decimals of tokens")
    .addParam("contract", "Сontract address")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        const decimals = await erc20.decimals()

        console.log(decimals)
})

task("balanceOf", "Get user token balance")
    .addParam("contract", "Сontract address")
    .addParam("account", "User address")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        const balanceOf = await erc20.balanceOf(taskArgs.account)

        console.log(balanceOf)
})

task("transfer", "Perform token transfer")
    .addParam("contract", "Сontract address")
    .addParam("recipient", "Address where funds are credited")
    .addParam("amount", "The number of tokens to be transferred")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        await erc20.transfer(taskArgs.recipient, taskArgs.amount)

        console.log("Task is done")
})

task("allowance", "Get the balance of the user's tokens that he was allowed to spend")
    .addParam("contract", "Сontract address")
    .addParam("owner", "Address of the owner of the tokens")
    .addParam("spender", "The address of the user that the owner of the tokens allowed to spend them")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        const allowance = await erc20.allowance(taskArgs.owner, taskArgs.spender)

        console.log(allowance)
})

task("approve", "Allow the user to spend your tokens")
    .addParam("contract", "Сontract address")
    .addParam("spender", "The address of the user who is given permission")
    .addParam("amount", "Amount of ether to be transferred")
    .addParam("mul", "ten to the power")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        await erc20.approve(taskArgs.spender, hre.ethers.utils.parseUnits(String(taskArgs.amount), taskArgs.mul))

        console.log("Task is done")
})

task("transferFrom", "Allow the user to spend your tokens")
    .addParam("contract", "Сontract address")
    .addParam("sender", "Address where tokens are debited from")
    .addParam("recipient", "Address where funds are credited")
    .addParam("amount", "Amount of ether to be transferred")
    .addParam("mul", "ten to the power")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        await erc20.transferFrom(taskArgs.spender, taskArgs.recipient, hre.ethers.utils.parseUnits(String(taskArgs.amount), taskArgs.mul))

        console.log("Task is done")
})

task("increaseAllowance", "increase the balance that the spender is allowed to spend")
    .addParam("contract", "Сontract address")
    .addParam("spender", "The address of the user who is given permission")
    .addParam("addedValue", "Funding amount to be added to allowance")
    .addParam("mul", "ten to the power")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        await erc20.increaseAllowance(taskArgs.spender, hre.ethers.utils.parseUnits(String(taskArgs.addedValue), taskArgs.mul))

        console.log("Task is done")
})

task("decreaseAllowance", "decrease the balance that the spender is allowed to spend")
    .addParam("contract", "Сontract address")
    .addParam("spender", "The address of the user who is given permission")
    .addParam("subtractedValue", "Amount of funding to be withdrawn from allowance")
    .addParam("mul", "ten to the power")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        await erc20.decreaseAllowance(taskArgs.spender, hre.ethers.utils.parseUnits(String(taskArgs.subtractedValue), taskArgs.mul))

        console.log("Task is done")
})

task("burn", "Burn tokens")
    .addParam("contract", "Сontract address")
    .addParam("amount", "Amount of tokens to be burned")
    .addParam("mul", "ten to the power")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        await erc20.burn(hre.ethers.utils.parseUnits(String(taskArgs.subtractedValue), taskArgs.mul))

        console.log("Task is done")
})

task("burnFrom", "Burn tokens from allowance")
    .addParam("contract", "Сontract address")
    .addParam("account", "Address where tokens are debited from")
    .addParam("amount", "Amount of tokens to be burned")
    .addParam("mul", "ten to the power")
    .setAction(async (taskArgs, hre) => {
        const erc20 = await hre.ethers.getContractAt("ERC20TPU", taskArgs.contract)
        
        await erc20.burnFrom(taskArgs.account, hre.ethers.utils.parseUnits(String(taskArgs.amount), taskArgs.mul))

        console.log("Task is done")
})

