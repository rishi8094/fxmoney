export interface FXMoneyRates {
  [key: string]: number;
}

export interface FXMoneySettings { 
  from: string;
  to: string;
}

export interface FXMoneyConversion {
  from: string;
  to: string;
  amount: string;
  intAmount: number;
  rawAmount: number;
}

export default class FXMoney {
  base: string;
  rates: FXMoneyRates;
  settings: FXMoneySettings;

  constructor(base: string, rates: FXMoneyRates, settings?: FXMoneySettings) {
    this.base = base;
    this.rates = rates;
    this.settings = {
      from: settings ? settings.from : this.base,
      to: settings ? settings.to : this.base
    }

    // Ensure the base rate is always 1.
    if (this.rates[base]){
      this.rates[base] = 1;
    }
  }

  private formatConversion(amount: number, to: string, from: string): FXMoneyConversion {
    // Truncating the number to the nearest hundredth helps preserve the currency formatting, e.g 1.23456789 -> 1.23.
    return {
      from: from,
      to: to,
      amount: (Math.trunc(amount*100)/100).toFixed(2),
      intAmount: Math.trunc(amount*100),
      rawAmount: amount
    }
  }

  convert(amount: number, args: { from?: string; to?: string; customRates?: FXMoneyRates}): FXMoneyConversion {
    const rates = args.customRates || this.rates;
    const from = args.from || this.settings.from;
    const to = args.to || this.settings.to;

    // Multiply the amount by the exchange rate.
    const finalAmount = amount * this.getRate({from: from, to: to, customRates: rates});
    return this.formatConversion(finalAmount, to, from);
  }

  getRate(args: {from: string; to: string; customRates?: FXMoneyRates}): number {
    const rates = args.customRates || this.rates;
    const from = args.from;
    const to = args.to;
    
    // Check if the from currency is valid and exists in the rates.
    if (!rates[from]) {
      throw new Error(`Cannot get rate for non existant currency ${from} (from)`);
    }

    // Check if the to currency is valid and exists in the rates.
    if (!rates[to]) {
      throw new Error(`Cannot get rate for non existant currency ${to} (to)`);
    }

    // Check if the from currency is the same as the base currency.
    if (from === this.base) {
      return rates[to];
    }

    // Check if the to currency is the same as the base currency.
    if (to === this.base) {
      return 1 / rates[from];
    }

    // Otherwise, return the rate between the two currencies. This is calculated by the inverse of the form rate.
    // relative to the exchange rate of between currencies.
    return (1 / rates[from]) * rates[to];
  }
}