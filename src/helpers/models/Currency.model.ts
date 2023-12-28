import axios from "axios";

export class Currency {
  public name!: string;
  public rate!: number;

  constructor(name: string = "EUR") {
    this.name = name.toUpperCase();
  }

  /**
   * Get exchange rate of a currency
   * @param base Source currency name
   */
  public async getExchangeRate(base: string = "EUR"): Promise<void> {
    this.rate = await axios
      .get(`https://api.coinbase.com/v2/exchange-rates?currency=${base}`)
      .then((res) => {
        const { rates } = res.data.data;
        if (!rates[this.name]) {
          throw new Error();
        } else {
          return rates[this.name];
        }
      })
      .catch((err) => {
        throw new Error("Currency name is invalid");
      });
  }
}
