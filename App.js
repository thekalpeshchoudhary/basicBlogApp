import React from 'react';
import { createAppContainer } from "react-navigation";
import { BlogProvider } from './src/context/BlogContext';
import BlogScreen from './src/screens/BlogScreen';
import AddEditBlogScreen from './src/screens/AddEditBlogScreen';

const { createStackNavigator } = require("react-navigation-stack");
const { default: IndexScreen } = require("./src/screens/IndexScreen");

const navigator = createStackNavigator({
  Index:IndexScreen,
  AddEditBlog:AddEditBlogScreen,
  Blog:BlogScreen,
},{
  initialRouteName:'Index',
  defaultNavigationOptions:{
    title:'Blogs'
  }
})

const App = createAppContainer(navigator)
export default ()=>{
  return <BlogProvider>
    <App/>
  </BlogProvider>
}