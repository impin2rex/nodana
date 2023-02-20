import { Network, Nodana } from "@/index";

const nodana = new Nodana({ network: Network.Devnet });

describe("test_cases", () => {
  it("test", async () => {
    const balance = await nodana.wallet.fetchBalance(
      "2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc"
    );
    console.log(balance);
  });
});
