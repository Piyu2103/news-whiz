import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useNavigation} from "@react-navigation/native"
import { getLatestNews } from '../../../services/home/api';
import { useDispatch, useSelector } from "react-redux"
import { setGetNewsApiPageNumber } from '../../../core/redux/store/slice/home/actions';
import Toast from 'react-native-toast-message';

 const  Splash = () => {
  const navigation=useNavigation();
  const newsApiPageNumber = useSelector(state => state?.home?.setGetNewsApiPageNumber);
  const latestNewsData = useSelector(state => state?.home?.getLatestNews?.data);
  const dispatch = useDispatch()

  useEffect(()=>{
    const latestNewsApiCall=async()=>{
      try{
        const res=getLatestNews(newsApiPageNumber);
        dispatch(setGetNewsApiPageNumber((newsApiPageNumber)+1));
      }catch{
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again later.',
          position: 'bottom',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });        
      }
    }
    latestNewsApiCall();
  },[])


  useEffect(()=>{
    if(latestNewsData){
      setTimeout(()=>{
        navigation.navigate('Home')
      },2000)
    }
  },[latestNewsData])

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={require('../../../assets/icon.png')} style={styles.image} />
      </View>
    </View>
  );
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20b2aa',
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
  },
  iconContainer: {
    
  },
  image: {
    height: 400,
    width: 400,
  },
});