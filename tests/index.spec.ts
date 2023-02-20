import { Network, Nodana } from "@/index";

const nodana = new Nodana({ network: Network.Devnet });

describe("test_cases", () => {
  it("fetch balance", async () => {
    const balance = await nodana.wallet.fetchBalance(
      "2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc"
    );
    console.log(balance);
  });

  it("request airdrop", async () => {
    const txhash = await nodana.wallet.requestAirDrop(
      "2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc",
      2
    );
    console.log(txhash);
  });
});
