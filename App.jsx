import React, {useEffect, useState} from 'react';
import {
  Divider,
  Provider as PaperProvider,
  Text,
  Button,
} from 'react-native-paper';
import {StyleSheet, View, Modal, ScrollView} from 'react-native';

import InputForm from './src/components/InputComponent';
import NodeList from './src/components/NodeListComponent';
import NodeComponent from './src/components/NodeComponent';

import {getData, saveData} from './src/helpers/storage';

const App = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getData();
    setData(res);
  };

  const handleSave = async newData => {
    await saveData([...data, newData]);
    loadData();
  };

  const handleDelete = async index => {
    const newData = data.filter((_, i) => i !== index);
    await saveData(newData);
    loadData();
  };

  return (
    <PaperProvider style={styles.container}>
      <View style={styles.nodeContainer}>
        <View style={styles.drawContainer}>
          <Text variant="headlineMedium">Nodes:</Text>
          <Button mode="contained" onPress={() => setIsModalVisible(true)}>
            Draw
          </Button>
        </View>
        <Divider />
        <NodeList data={data} onDelete={handleDelete} />
      </View>
      <Divider />
      <InputForm onSave={handleSave} data={data} />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <ScrollView
            contentContainerStyle={styles.circleContainer}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <NodeComponent nodes={data} />
          </ScrollView>
          <View style={styles.modalClose}>
            <Button mode="contained" onPress={() => setIsModalVisible(false)}>
              Return
            </Button>
          </View>
        </View>
      </Modal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  nodeContainer: {
    flex: 1,
    marginTop: 100,
    margin: 10,
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  modalClose: {
    width: 200,
    alignSelf: 'center',
  },
});

export default App;
