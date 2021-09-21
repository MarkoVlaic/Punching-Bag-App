import AsyncStorage from '@react-native-async-storage/async-storage';

// A module that keeps track of the session data and writes it to memory
export default class SessionStore {
  constructor(timestamp) {
    // console.log('created a store with timestamp', timestamp);
    this.timestamp = timestamp;
    this.data = {};
  }

  /**
   * Store the value so it is identifiable by the key
   * @param {string} key the key under which the value is stored
   * @param {object} value the value to store
   */
  setItem(key, value) {
    this.data[key] = value;
  }

  /**
   * Persist the session data in memory using the given id and items
   */
  async write() {
    // Retrieve the array of all stored session timestamps and append the one we are saving
    const sessionsString = await AsyncStorage.getItem('@sessions');
    // console.log('string', sessionsString);
    let sessions = JSON.parse(sessionsString);
    // console.log('parsed', sessions);
    if (!sessions) {
      sessions = [];
    }
    sessions.push(this.timestamp);
    // console.log('saving sessions', sessions);
    const dataString = JSON.stringify(this.data);

    await AsyncStorage.setItem('@sessions', JSON.stringify(sessions));
    await AsyncStorage.setItem(`${this.timestamp}`, dataString);
  }
}
