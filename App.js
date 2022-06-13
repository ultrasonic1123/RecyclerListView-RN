

import React from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native'
// import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { useState } from 'react'
import { useEffect } from 'react';

const height = Dimensions.get('window').height

const App = () => {
  const initialData = [
    {
      id: 0,
      data: "item 0"
    },
    {
      id: 1,
      data: "item 1"
    },
    {
      id: 2,
      data: "item 2"
    },
    {
      id: 3,
      data: "item 3"
    },
    {
      id: 4,
      data: "item 4"
    }]
  const [listData, setListData] = useState(initialData)
  

  const rowRenderer = ({ item }) => {
    return <View style={{ height: 100, width: "100%", backgroundColor: "chocolate", alignItems: 'center', justifyContent: 'center', borderWidth: 1 }}>
      <Text >{item.data} </Text>
    </View>
  }

  const onEndReachedHandle = () => {
    let addData = []
    for (let i = listData.length; i < listData.length + 10; i++) {
      let itemData = { id: i, data: `item ${i}` }
      addData = [...addData, itemData]
    }
    setListData([...listData, ...addData])
  }

  return (
    <View>
      <Text>
        Hello RecyclerListView
      </Text>
      <View style={{ alignItems: 'center' }}>
        <Text>
          FlatList vs RecyclerListView:
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <FlatList
          data={listData}
          renderItem={rowRenderer}
          keyExtractor={item => item.id}
          onEndReached={onEndReachedHandle}
        />
      </View>
    </View>
  )
}

export default App;
