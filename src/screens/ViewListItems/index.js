import React, {useState, useEffect} from 'react';
import { View, FlatList } from 'react-native'
import Item from '../../components/Item';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import { openDatabase } from "react-native-sqlite-storage";

const shopperDB = openDatabase({name: 'Shopper.db'});
const itemsTableName = 'items';
const listItemsTableName = 'list_items';


const ViewListItemsScreen = props => {

const post = props.route.params.post;

const navigation = useNavigation();

const [items, setItems] = useState([]);

useEffect(() => {
  const listener = navigation.addListener('focus', () => {
    // declare an empty array that will store the results of the
    // SELECT
    let results = [];
    // declare a transaction that will execute the SELECT
    shopperDB.transaction(txn => {
      // execute SELECT
      txn.executeSql(
        `SELECT items.id, name, price, quantity FROM ${itemsTableName},
        ${listItemsTableName} WHERE items.id = item_id AND list_id = ${post.id}`,
        [],
        // callback function to handle the results from the SELECT
        (_, res) => {
          // get number of rows of data selected
          let len = res.rows.length;
          console.log('Length of items ' + len);
          // if more than one row was returned
          if (len > 0){
            // loop through the rows
            for (let i = 0; i < len; i++){
              // push a row of data at a time onto the results array
              let item = res.rows.item(i);
              results.push({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                list_id: post.id,
              });
            }
            // assign results array to items state variable
            setItems(results);
          } else {
            // if no rows of data were returned,
            // set items state variable to an empty array
            setItems([]);
          }
        },
        error => {
          console.log('Error getting items ' + error.message);
        },
      )
    });
  });
  return listener;
});

  return (
    <View style={styles.container}>
       <FlatList 
        data={items}
        renderItem={({item}) => <Item post={item} />}
        keyExtractor={item => item.id}
        />
    </View>
  );
};

export default ViewListItemsScreen;