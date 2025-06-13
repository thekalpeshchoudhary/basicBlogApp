import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useBlogContext } from '../context/BlogContext';
import Feather from '@expo/vector-icons/Feather';

type BlogCardProps = {
  title: string;
  id: string;
  navigation: any;
}

export default function BlogCard({ id, title, navigation }: BlogCardProps) {
  const { deleteBlogPost } = useBlogContext();

  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Blog', { id })
    }}>
      <View style={styles.viewStyle}>
        <Text style={styles.titleStyle}>{title}</Text>
        <View style={styles.iconContainer}>
          <Feather name="edit-2" size={20} color="black" onPress={() => {
            navigation.navigate('AddEditBlog', { editId: id })
          }} />
          <AntDesign name="closecircleo" size={20} color="black" onPress={() => {
            deleteBlogPost(id)
          }} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    margin:1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#DDD',
    borderRadius: 10,
    borderColor: '#CDC',
    borderWidth:2,
  },
  titleStyle: { fontSize: 16, fontWeight: 500 },
  iconContainer: { flexDirection: 'row', gap: 15 }
})