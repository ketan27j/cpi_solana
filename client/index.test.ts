import { expect, test } from "bun:test";
import { LiteSVM } from "litesvm";
import path from "path";
import {
	PublicKey,
	Transaction,
	SystemProgram,
	Keypair,
	LAMPORTS_PER_SOL,
    TransactionInstruction,
} from "@solana/web3.js";

test("one transfer", () => {
	const svm = new LiteSVM();
    const contractPubKey = Keypair.generate();
    svm.addProgramFromFile(contractPubKey.publicKey,path.join(__dirname, "./double.so"));
	const payer = new Keypair();
	svm.airdrop(payer.publicKey, BigInt(LAMPORTS_PER_SOL));
    const dataAccount = new Keypair();
    const blockhash = svm.latestBlockhash();
    const ixs = [
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: dataAccount.publicKey,
            lamports: Number(svm.minimumBalanceForRentExemption(BigInt(4))),
            space: 4,
            programId: contractPubKey.publicKey,
        }),
    ]
	
	const tx = new Transaction();
	tx.recentBlockhash = blockhash;
    tx.feePayer = payer.publicKey;
	tx.add(...ixs);
	tx.sign(payer, dataAccount);
	svm.sendTransaction(tx);
	const balanceAfter = svm.getBalance(dataAccount.publicKey);
	expect(balanceAfter).toBe(svm.minimumBalanceForRentExemption(BigInt(4)));

    function doubleIt() {
        const ix2 = new TransactionInstruction({
            keys: [
                { pubkey: dataAccount.publicKey, isSigner: false, isWritable: true },
            ],
            programId: contractPubKey.publicKey,
            data: Buffer.from(""), 
        })
        const blockhash2 = svm.latestBlockhash();
        const tx2 = new Transaction();
        tx2.recentBlockhash = blockhash2;
        tx2.feePayer = payer.publicKey;
        tx2.add(ix2);
        tx2.sign(payer);
        svm.sendTransaction(tx2);
        svm.expireBlockhash();
    }
    
    doubleIt();
    doubleIt();
    doubleIt();
    doubleIt();

    const newDataAcc = svm.getAccount(dataAccount.publicKey);
    expect(newDataAcc?.data.length).toBe(4);
    expect(newDataAcc?.data[0]).toBe(8);
});