import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

import {types} from '../config/const';

const InputForm = ({onSave, data}) => {
  const [inputData, setInputData] = useState({
    name: null,
    type: null,
    parent: null,
  });

  const handleSave = () => {
    const {name, type, parent} = inputData;

    if (!name) {
      showAlert('Name is required');
    } else if (!type) {
      showAlert('Type is required');
    } else if (!parent) {
      showAlert('Parent is required');
    } else {
      const isNameExist = data.some(item => item.name === name);

      if (isNameExist) {
        showAlert('Name already exists');
      } else {
        onSave(inputData);
        clearInputData();
      }
    }
  };

  const showAlert = message => {
    Alert.alert(message);
  };

  const clearInputData = () => {
    setInputData({name: null, type: null, parent: null});
  };

  const renderInput = (label, key, onChange, data = []) => (
    <View>
      <Text style={styles.label}>{label}</Text>
      {key !== 'name' ? (
        <SelectList setSelected={onChange} data={data} />
      ) : (
        <TextInput value={inputData[key]} onChangeText={onChange} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderInput('Name:', 'name', text =>
        setInputData({...inputData, name: text}),
      )}
      {renderInput(
        'Type:',
        'type',
        val => setInputData({...inputData, type: +val}),
        types.filter(item => item.key !== 1 && item.key !== 2),
      )}
      {renderInput(
        'Parent:',
        'parent',
        value => setInputData({...inputData, parent: value}),
        data
          .filter(item => item.type !== 2)
          .map(item => ({key: item.name, value: item.name})),
      )}

      <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  saveButton: {
    marginTop: 10,
  },
  label: {
    margin: 8,
    fontSize: 16,
  },
});

export default InputForm;
