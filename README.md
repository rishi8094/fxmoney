# FXMoney
Based on the deprecated [money.js](http://openexchangerates.github.io/money.js/), this library aims to bring both node & TS support including additional functionalities.

FXMoney is a simple JS/TS library to deal with money conversions.

## Installation

```
$ npm install fxmoney # or yarn add fxmoney
```

## Usage

### Setup
Initialise the `FXMoney` instance. Specify the base currency e.g `GBP` and then set the rates with respect to GBP as the primary currency.
```ts
const fx = new FXMoney('GBP', {
  'GBP': 1,
  'USD': 1.38,
  'EUR': 1.16
})
```

### Conversions
```ts
fx.convert(5, {from: "GBP", to: "USD"})
// Returns {"amount": "6.90", "intAmount": 690, "rawAmount": 6.8999999999999995, "from": "GBP", "to": "USD"}
```

### Get Rates
```ts
fx.getRate({from: "GBP", to: "USD"})
// Returns 1.38
```

## License:
FXMoney is maintained by Rishi and released under the MIT license. See LICENSE for details.
