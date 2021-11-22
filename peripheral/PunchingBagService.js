var bleno = require('bleno');
var { AccelerationMeasurmentCharacteristic } = require('./AccelerationMeasurmentCharacteristic');

console.log(AccelerationMeasurmentCharacteristic)

const AMCharacteristic = new AccelerationMeasurmentCharacteristic({
  uuid: '3dd9c059a11945bca777a288e6eb97be',
  properties: ['notify'],
});

var punchingBagService = new bleno.PrimaryService({
  uuid: 'cdf11c5d62f347389c7c7c7833971d2d',
  characteristics: [AMCharacteristic]
}); 

module.exports = punchingBagService; 