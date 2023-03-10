#!/usr/bin/env node

import { WalletClient } from "@/clients";
import { Network, NodanaSettings } from "@/types";
import { NodanaConfig } from "@/utils";

export class Nodana {
  readonly config: NodanaConfig;
  readonly wallet: WalletClient;
  constructor(settings: NodanaSettings) {
    this.config = new NodanaConfig(settings);
    this.wallet = new WalletClient(this.config);
  }
}

/**
 *  return the arguments of the command except node and index.ts
 */
const getArgs = () => {
  // We retrieve all the command argumnts except the first 2
  const args = process.argv.slice(2);
  return args;
};

/**
 * Command Help
 */
const printCommandHelp = () => {
  const help = `
nodana

SOLANA CLI command to retrieve information.

Example:

$ nodana --wallet-balance <WALLET_ADDR>

$ nodana --airdrop 1 <WALLET_ADDR>

`;
  console.log(help);
};

const symbols = getArgs();

// Print help if no arguments
if (symbols.length === 0) {
  printCommandHelp();
  process.exit(0);
}

if (process.argv[2] === "--wallet-balance") {
  const wallet = process.argv[3];
  if (!wallet) {
    console.log("Please provide a wallet address");
    process.exit(0);
  }
  console.log(`Retrieving balance of wallet: ${wallet}`);
  const nodana = new Nodana({ network: Network.Devnet });
  nodana.wallet.fetchBalance(process.argv[3]).then(console.log);
}

if (process.argv[2] === "--airdrop") {
  const sol = process.argv[3];
  if (!sol) {
    console.log("Please provide amount");
    process.exit(0);
  }
  const wallet = process.argv[4];
  if (!wallet) {
    console.log("Please provide a wallet address");
    process.exit(0);
  }
  if (parseFloat(sol) > 1) {
    console.log("Not allowed to airdrop more than 1 SOL");
    process.exit(0);
  }
  console.log(`Airdrop 🚀 to wallet: ${wallet}`);
  const nodana = new Nodana({ network: Network.Devnet });
  nodana.wallet.requestAirDrop(wallet, parseFloat(sol)).then(console.log);
}

export * from "@/types";
