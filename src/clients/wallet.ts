import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { NodanaConfig } from "@/utils";

export class WalletClient {
  constructor(private readonly config: NodanaConfig) {}

  async fetchBalance(wallet: string): Promise<number> {
    try {
      const connection = new Connection(
        clusterApiUrl(this.config.network),
        "confirmed"
      );
      const balance = await connection.getBalance(new PublicKey(wallet));
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      throw error;
    }
  }

  async requestAirDrop(wallet: string, sol: number): Promise<string> {
    try {
      const connection = new Connection(
        clusterApiUrl(this.config.network),
        "confirmed"
      );
      const txhash = await connection.requestAirdrop(
        new PublicKey(wallet),
        sol * LAMPORTS_PER_SOL
      );
      if (sol > 1) {
        return "Not allowed to airdrop more than 1 SOL";
      }
      return `Airdropped ${sol} successfully ✅ | txhash: ${txhash}`;
    } catch (error) {
      throw error;
    }
  }
}
