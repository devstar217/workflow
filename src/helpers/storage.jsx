import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'yourKey';

const initNode = {
  type: 1,
  parent: null,
  name: 'Init',
};

const endNode = {
  type: 2,
  parent: null,
  name: 'End',
};

export const saveData = async data => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getData = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const parsedData = data ? JSON.parse(data) : [initNode, endNode];
    return parsedData;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};
