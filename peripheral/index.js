var bleno = require('bleno');
var serviceUUIDs = ['cdf11c5d62f347389c7c7c7833971d2d'];

bleno.on('stateChange', function(state) {
  console.log('state change: ', state);

  if(state === 'poweredOn') {
    bleno.startAdvertising('Punching Bag', serviceUUIDs);
  } else {
    console.log('stopping');
    bleno.stopAdvertising();
  }
});
