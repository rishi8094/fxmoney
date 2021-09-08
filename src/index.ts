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
    this.base = base.toUpperCase();
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
  
}