import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-paper';

import {types} from '../config/const';

const DataList = ({data, onDelete}) => {
  const renderItem = ({item, index}) => (
    <View style={styles.nodeItemContainer}>
      <Text variant="titleMedium">{item.name}</Text>
      <Text variant="titleMedium">{types[+item.type - 1]?.value}</Text>
      <Text variant="titleMedium">{item.parent}</Text>

      <Button
        mode="contained"
        onPress={() => onDelete(index)}
        disabled={item.type === 1 || item.type === 2}>
        X
      </Button>
    </View>
  );

  const renderSeparator = () => <View style={styles.divider} />;

  const renderHeader = () => (
    <View elevation={1} style={styles.nodeListHeader}>
      <Text variant="titleMedium">NAME</Text>
      <Text variant="titleMedium">TYPE</Text>
      <Text variant="titleMedium">PARENT</Text>
      <Text variant="titleMedium">ACTION</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  nodeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  nodeListHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
  },
});

export default DataList;
