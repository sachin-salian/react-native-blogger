import AsyncStorage from "@react-native-async-storage/async-storage";

class DataStore {
  // To store key/value pairs in the AsyncStorage
  storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  };

  // To get value from async storage
  getData = async (key: string) => {
    try {
      const value = AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  // To remove item from async storage
  removeValue = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  };
}

const dataStore = new DataStore();
export default dataStore;
