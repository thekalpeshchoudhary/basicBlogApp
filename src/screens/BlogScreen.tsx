import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useBlogContext } from '../context/BlogContext';
import Feather from '@expo/vector-icons/Feather';

export default function BlogScreen({ navigation }) {
    const id = navigation.getParam('id');
    const { blogs } = useBlogContext();
    const blog = blogs.find(eachBlog => eachBlog.id === id)

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.titleStyle}>{blog.title}</Text>
            <Text style={styles.contentStyle}>{blog.content}</Text>
        </View>
    )
}

BlogScreen.navigationOptions = ({ navigation }) => {
    const id = navigation.getParam('id');

    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AddEditBlog',{editId:id})}>
                <Feather name="edit-2" size={20} color="black" />
            </TouchableOpacity>
        ),
    };
}

const styles = StyleSheet.create({
    viewStyle: { gap: 10, padding: 10, flex: 1 },
    titleStyle: { fontSize: 24, fontWeight: 500 },
    contentStyle: { fontSize: 18, fontWeight: 400 },
})
