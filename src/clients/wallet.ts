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
}
