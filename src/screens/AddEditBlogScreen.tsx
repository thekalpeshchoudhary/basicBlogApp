import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Blog, useBlogContext } from '../context/BlogContext';

export default function AddEditBlogScreen({ navigation }) {
    const editId = navigation.getParam('editId');
    const { blogs, addBlogPost, editBlogPost } = useBlogContext();
    const blogToEdit = editId ? blogs.find(eachBlog => eachBlog.id === editId) : null;
    const [blogData, setBlogData] = useState(blogToEdit ? { ...blogToEdit } : { title: '', content: '' })

    const handleClick = () => {
        if(!blogData.content || !blogData.title) return;

        blogToEdit ? editBlogPost(blogData as Blog) : addBlogPost(blogData)
        navigation.pop()
    }
    return (
        <View style={styles.viewStyle}>
            <Text>Add Blog</Text>
            <TextInput 
                style={styles.inputStyle}
                placeholder='Title'
                value={blogData.title}
                onChangeText={(val) => {
                    setBlogData({ ...blogData, title: val })
                }} />
            <TextInput 
                multiline
                numberOfLines={4}
                style={styles.inputStyle}
                placeholder='Content'
                value={blogData.content}
                onChangeText={(val) => {
                    setBlogData({ ...blogData, content: val })
                }} />
            <Button
                color={'#66A'}
                title={blogToEdit ? 'Save Changes' : 'Add'}
                onPress={handleClick} />
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: { gap: 10, padding: 10, flex: 1 },
    inputStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#AAA',
        paddingHorizontal: 20,
        fontSize: 18,
    },
    btnStyle: { flexDirection: 'row', gap: 15 }
})
