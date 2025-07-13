import {expect, test} from "bun:test"
import { LiteSVM } from "litesvm";
import { Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import path from "path";

test("cpi", () => {
    let svm = new LiteSVM();

    let doubleContract = PublicKey.unique();
    let cpiContract = PublicKey.unique();

    svm.addProgramFromFile(doubleContract, path.join(__dirname, "./double.so"));
    svm.addProgramFromFile(cpiContract, path.join(__dirname, "./cpi.so"));

    let userAcc = new Keypair();
    let dataAcc = new Keypair();
    svm.airdrop(userAcc.publicKey, BigInt(1000000000));

    createDataAccOnChain(svm, dataAcc, userAcc, doubleContract);

    function doubleIt() {
        let ix = new TransactionInstruction({
            keys: [
                { pubkey: dataAcc.publicKey, isSigner: true, isWritable: true },
                { pubkey: doubleContract, isSigner: false, isWritable: false },
            ],
            programId: cpiContract,
            data: Buffer.from(""), 
        })
        
        let tx = new Transaction().add(ix);
        tx.recentBlockhash = svm.latestBlockhash();
        tx.feePayer = userAcc.publicKey;
        tx.sign(userAcc,dataAcc);
        svm.sendTransaction(tx);
        svm.expireBlockhash();
    }
    doubleIt();
    doubleIt();
    doubleIt(); 
    doubleIt();

    const dataAccountData = svm.getAccount(dataAcc.publicKey);
    expect(dataAccountData?.data[0]).toBe(8);
    expect(dataAccountData?.data[1]).toBe(0);
    expect(dataAccountData?.data[2]).toBe(0);
    expect(dataAccountData?.data[3]).toBe(0);

})

function createDataAccOnChain(svm: LiteSVM, dataAccount: Keypair, payer: Keypair, contractPubKey: PublicKey) {
    const blockhash = svm.latestBlockhash();
    const ixs = [
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: dataAccount.publicKey,
            lamports: Number(svm.minimumBalanceForRentExemption(BigInt(4))),
            space: 4,
            programId: contractPubKey,
        }),
    ]
	
	const tx = new Transaction();
	tx.recentBlockhash = blockhash;
    tx.feePayer = payer.publicKey;
	tx.add(...ixs);
	tx.sign(payer, dataAccount);
	svm.sendTransaction(tx);
}