import FXMoney from '../src';

describe('check to see correct conversions are returned', () => {
  it('returns the correct conversion against the base', () => {
    let fxmoney = new FXMoney('GBP', {
      'GBP': 1,
      'USD': 1.38,
      'EUR': 1.16
    });
    expect(fxmoney.convert(5, "GBP", "USD")).toStrictEqual({"amount": "6.90", "intAmount": 690, "rawAmount": 6.8999999999999995, "from": "GBP", "to": "USD"});
  });

  it('returns the correct conversion for base against the base', () => {
    let fxmoney = new FXMoney('GBP', {
      'GBP': 1,
      'USD': 1.38,
      'EUR': 1.16
    });
    expect(fxmoney.convert(5, "GBP", "GBP")).toStrictEqual({"amount": "5.00", "intAmount": 500, "rawAmount": 5.0, "from": "GBP", "to": "GBP"});
  });

  it('returns the correct conversion against non base', () => {
    let fxmoney = new FXMoney('GBP', {
      'GBP': 1,
      'USD': 1.38,
      'EUR': 1.16
    });
    expect(fxmoney.convert(7, "USD", "EUR")).toStrictEqual({"amount": "5.88", "intAmount": 588, "rawAmount": 5.884057971014493, "from": "USD", "to": "EUR"});
  });

  it('throws an error for a non existant "from" currency', () => {
    let fxmoney = new FXMoney('GBP', {
      'GBP': 1.9
    });
    expect(()=>fxmoney.getRate('EUR', 'GBP')).toThrow('Cannot get rate for non existant currency EUR (from)');
  });

  it('throws an error for a non existant "to" currency', () => {
    let fxmoney = new FXMoney('GBP', {
      'GBP': 1.9
    });
    expect(()=>fxmoney.getRate('GBP', 'EUR')).toThrow('Cannot get rate for non existant currency EUR (to)');
  });

});