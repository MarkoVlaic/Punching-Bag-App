var bleno = require('bleno');
const punchingBagService = require('./PunchingBagService');

var serviceUUIDs = ['cdf11c5d62f347389c7c7c7833971d2d'];

console.log('Entered the BLE server') 

bleno.on('stateChange', function(state) {
  console.log('state change: ', state);

  if(state === 'poweredOn') {
    bleno.startAdvertising('Punching Bag', [punchingBagService.uuid]);
  } else {
    console.log('stopping');
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', (err) => {
  if(!err) {
    console.log('started advertising');

    bleno.setServices([
      punchingBagService
    ]);
  }
});
