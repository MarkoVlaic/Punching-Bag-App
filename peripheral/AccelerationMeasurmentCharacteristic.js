var Characteristic = require('bleno').Characteristic;

class AccelerationMeasurmentCharacteristic extends Characteristic {
  constructor(options) {
    super(options);
  }

  onSubscribe(maxSize, updateValueCallback) {
    const sendData = () => {
      const x = Math.random() * 10;
      const y = Math.random() * 10;
      const z = Math.random() * 10;

      const data = [x, y, z];
      const buf = Buffer.alloc(3 * 4);

      for(let i=0;i<data.length;i++) {
        buf.writeFloatLE(data[i], i*4);
      }

      console.log(`sending... (${x}, ${y}, ${z})`);

      updateValueCallback(buf);

      this.updateTimeout = setTimeout(() => sendData(), this.calculateRandomTimeout());
    }
    
    this.updateTimeout = setTimeout(() => sendData(), this.calculateRandomTimeout());
  }

  calculateRandomTimeout() {
    const base = 2000;
    const dev = 800;
    const sign = Math.random() > 0.5 ? 1 : -1;

    return base + sign * dev * Math.random();
  }

  onUnsubscribe() {
    clearTimeout(this.updateTimeout);
  }
}

module.exports = {AccelerationMeasurmentCharacteristic};