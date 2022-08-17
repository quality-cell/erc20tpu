import { expect, use } from "chai"
import { ethers, waffle } from "hardhat"
import { prepareERC20Tokens, prepareSigners } from "./utils/prepare"

use(waffle.solidity)

describe("ERC20 tpu contract", function () {
    beforeEach(async function () {
        await prepareSigners(this)
        await prepareERC20Tokens(this, this.bob)
    })

    it("Mint", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 6)
        await this.token1.mint(this.bob.address, transferAmount)

        const balance = await this.token1.balanceOf(this.bob.address)
        expect(balance).to.equal(transferAmount)

        await expect(this.token1.connect(this.alice).mint(this.bob.address, transferAmount)).to.be.revertedWith(
            "Invalid address"
        )
    })

    it("Transfer", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 6)
        await this.token1.mint(this.bob.address, transferAmount)

        const initialOwnerBalance = await this.token1.balanceOf(this.bob.address)

        const transferAmount1 = ethers.utils.parseUnits("10", 6)
        await this.token1.transfer(this.misha.address, transferAmount1)

        const balance = await this.token1.balanceOf(this.misha.address)
        expect(balance).to.equal(transferAmount1)

        await expect(this.token1.connect(this.alice).transfer(this.bob.address, 1)).to.be.revertedWith(
            "Invalid amount"
        )

        expect(await this.token1.balanceOf(this.bob.address)).to.equal(initialOwnerBalance.sub(transferAmount1))
    })

    it("Approve", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 6)
        await this.token1.mint(this.bob.address, transferAmount)

        const transferToMishaAmount = ethers.utils.parseUnits("10", 6)        
        await this.token1.approve(this.misha.address, transferToMishaAmount)

        const balance = await this.token1.allowance(this.bob.address, this.misha.address)
        expect(balance).to.equal(transferToMishaAmount)
    })

    it("TransferFrom", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 6)
        await this.token1.mint(this.bob.address, transferAmount)

        const initialOwnerBalance = await this.token1.balanceOf(this.bob.address)

        const transferToMishaAmount = ethers.utils.parseUnits("10", 6)
        await expect(this.token1.transferFrom(this.bob.address, this.misha.address, transferToMishaAmount)).to.be.revertedWith(
            "Invalid amount"
        )

        await this.token1.approve(this.misha.address, transferToMishaAmount)
        await expect(this.token1.transferFrom(this.bob.address, this.misha.address, transferAmount)).to.be.revertedWith(
            "Invalid amount"
        )

        await this.token1.connect(this.bob).transferFrom(this.bob.address, this.misha.address, transferToMishaAmount)
        await expect(this.token1.transferFrom(this.bob.address, this.misha.address, transferToMishaAmount)).to.be.revertedWith(
            "Invalid amount"
        )

        const transferToTemaAmount = ethers.utils.parseUnits("10", 6)
        await this.token1.approve(this.tema.address, transferToMishaAmount)
        await this.token1.connect(this.bob).transferFrom(this.bob.address, this.tema.address, transferToMishaAmount)

        const finalOwnerBalance = await this.token1.balanceOf(this.bob.address)
        expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(transferToTemaAmount).sub(transferToMishaAmount))

        const mishaBalance = await this.token1.balanceOf(this.misha.address)
        expect(mishaBalance).to.equal(transferToMishaAmount)

        const temaBalance = await this.token1.balanceOf(this.tema.address)
        expect(temaBalance).to.equal(transferToTemaAmount)
    })

    it("increaseAllowance", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 6)
        await this.token1.mint(this.bob.address, transferAmount)

        const transferAmount1 = ethers.utils.parseUnits("10", 6)
        await this.token1.increaseAllowance(this.misha.address, transferAmount1)

        const balance = await this.token1.allowance(this.bob.address, this.misha.address)
        expect(balance).equal(transferAmount1)
    })

    it("decreaseAllowance", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 6)
        await this.token1.mint(this.bob.address, transferAmount)

        const transferAmount1 = ethers.utils.parseUnits("10", 6)
        await this.token1.increaseAllowance(this.misha.address, transferAmount1)

        const balance = await this.token1.allowance(this.bob.address, this.misha.address)
        const transferAmount2 = ethers.utils.parseUnits("1", 6)

        await this.token1.decreaseAllowance(this.misha.address, transferAmount2)
        await expect(this.token1.decreaseAllowance(this.misha.address, transferAmount1)).to.be.revertedWith(
            "Invalid amount"
        )

        const balance2 = await this.token1.allowance(this.bob.address, this.misha.address)
        expect(balance2).to.equal(balance.sub(transferAmount2))
    })

    it("burn", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 6)
        await this.token1.mint(this.bob.address, transferAmount)

        const transferAmount1 = ethers.utils.parseUnits("10", 6)
        await this.token1.burn(transferAmount1)

        const balance = await this.token1.balanceOf(this.bob.address)
        expect(balance).equal(transferAmount.sub(transferAmount1))

        await expect(this.token1.burn(transferAmount)).to.be.revertedWith(
            "Invalid amount"
        )
    })

    it("burnFrom", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 6)
        await this.token1.mint(this.bob.address, transferAmount)

        const transferAmount1 = ethers.utils.parseUnits("10", 6)
        await this.token1.increaseAllowance(this.misha.address, transferAmount1)
        
        const transferAmount2 = ethers.utils.parseUnits("1", 6)
        await this.token1.connect(this.misha).burnFrom(this.bob.address, transferAmount2)
        
        const balance = await this.token1.allowance(this.bob.address, this.misha.address)
        expect(balance).to.equal(transferAmount1.sub(transferAmount2))

        await expect(this.token1.connect(this.misha).burnFrom(this.bob.address, transferAmount)).to.be.revertedWith(
            "Invalid amount"
        )
    })

    it("Test for event 'Transfer'", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 6)
        await this.token1.mint(this.bob.address, transferAmount)

        const transferAmount1 = ethers.utils.parseUnits("10", 6)
        const connectedContract = await this.token1.connect(this.bob)

        await expect(connectedContract.transfer(this.misha.address, transferAmount1))
            .to.emit(this.token1, "Transfer")
            .withArgs(this.bob.address, this.misha.address, transferAmount1)
    })

    it("Test for event 'Approval'", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 6)
        await this.token1.mint(this.bob.address, transferAmount)

        const transferAmount1 = ethers.utils.parseUnits("10", 6)
        const connectedContract = await this.token1.connect(this.bob)

        await expect(connectedContract.approve(this.misha.address, transferAmount1))
            .to.emit(this.token1, "Approval")
            .withArgs(this.bob.address, this.misha.address, transferAmount1)
    })
})

