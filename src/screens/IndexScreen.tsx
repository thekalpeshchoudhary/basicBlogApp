import React from 'react'
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useBlogContext } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import Feather from '@expo/vector-icons/Feather';

export default function IndexScreen({ navigation }) {
  const { blogs } = useBlogContext();

  return (
    <View style={
      { gap: 10, padding: 10, flex: 1 }
    }>
      <Text style={{ fontSize: 20, fontWeight:600 }}>
        All Blogs
      </Text>
      <FlatList
        data={blogs}
        keyExtractor={i => i.id}
        renderItem={(({ item }) => {
          return <BlogCard navigation={navigation} {...item} />
        })}
      />
    </View>
  )
}


IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('AddEditBlog')}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
}