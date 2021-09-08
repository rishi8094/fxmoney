import FXMoney from '../src';

describe('check to see correct rates are returned', () => {
  it('returns the correct rate against the base', () => {
    let fxmoney = new FXMoney('GBP', {
      'GBP': 1,
      'USD': 1.38,
      'EUR': 1.16
    });
    expect(fxmoney.getRate('GBP', 'USD')).toBe(1.38);
  });

  it('returns the correct rate for base against base', () => {
    let fxmoney = new FXMoney('GBP', {
      'GBP': 1,
      'USD': 1.38,
      'EUR': 1.16
    });
    expect(fxmoney.getRate('GBP', 'GBP')).toBe(1);
  });

  it('returns the rate for 2 non base currencies', () => {
    let fxmoney = new FXMoney('GBP', {
      'GBP': 1,
      'USD': 1.38,
      'EUR': 1.16
    });
    expect(parseFloat(fxmoney.getRate('EUR', 'USD').toFixed(2))).toBe(1.19);
  });

  it('correctly adjusts the base rate to be 1', () => {
    let fxmoney = new FXMoney('GBP', {
      'GBP': 1.9
    });
    expect(fxmoney.getRate('GBP', 'GBP')).toBe(1);
  });

  it('throw an error for a non existant "from" currency', () => {
    let fxmoney = new FXMoney('GBP', {
      'GBP': 1.9
    });
    expect(()=>fxmoney.getRate('EUR', 'GBP')).toThrow('Cannot get rate for non existant currency EUR (from)');
  });

  it('throw an error for a non existant "to" currency', () => {
    let fxmoney = new FXMoney('GBP', {
      'GBP': 1.9
    });
    expect(()=>fxmoney.getRate('GBP', 'EUR')).toThrow('Cannot get rate for non existant currency EUR (to)');
  });
});