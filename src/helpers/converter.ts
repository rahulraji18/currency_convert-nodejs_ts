import { Converter } from "./models/Converter.model";
import { Currency } from "./models/Currency.model";

export const converter = async (amount:any, source:any, target:any):Promise<any>=> {
   const currencySource = new Currency(source);
  const currencyTarget = new Currency(target);
  // Get exchange rate for the target currency
  await currencyTarget.getExchangeRate(currencySource.name);

  // Instantiation of Converter class
  const converter = new Converter(amount, currencySource, currencyTarget);
  converter.setConversion();

  // Display result of conversion
  console.log(converter.toString());
  return converter
}