import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import List from '../../components/List';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const ListsScreen = props => {

  const navigation = useNavigation();

  const [lists, setLists] = useState(
    [
      {
        id: 1,
        name: 'Grocery List',
        store: 'ACME',
        date: '2022-12-12',
      },
      {
        id: 2,
        name: 'Back to School List',
        store: 'Target',
        date: '2022-02-10',
      },
    ]
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
        data={lists}
        renderItem={({item}) => <List post={item} />}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Add List')}
            >
                <Text style={styles.buttonText}>Add List</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ListsScreen;