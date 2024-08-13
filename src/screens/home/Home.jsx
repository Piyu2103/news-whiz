import React, { useEffect, useState,useCallback } from 'react';
import { StyleSheet, Text, View, Image, FlatList,TouchableOpacity } from 'react-native';
import { setGetNewsApiPageNumber } from '../../core/redux/store/slice/home/actions';
import { useSelector,useDispatch } from 'react-redux';
import { getLatestNews } from '../../services/home/api';
import {SwipeListView} from 'react-native-swipe-list-view';

const Home = () => {
    const latestNewsData = useSelector(state => state?.home?.getLatestNews?.data);
    const newsApiPageNumber = useSelector(state => state?.home?.setGetNewsApiPageNumber);
    const [displayedNews, setDisplayedNews] = useState([]);
    const [syncPressed,setSyncPressed]=useState(false);
    const [newsIndex, setNewsIndex] = useState(0);
    const [batchSize,setBatchSize]=useState(5);
    const dispatch = useDispatch()
    const [pinnedNews, setPinnedNews] = useState([]);

    useEffect(() => {
        if (latestNewsData?.articles) {
            // Initialize displayed news with the first batch
            setDisplayedNews(latestNewsData.articles.slice(0, 10));
            setNewsIndex(10);
        }
    }, [latestNewsData]);

    const handleDelete = (rowMap,index) => {
        // Remove the item at index and add one new item
        const newDisplayedNews = displayedNews.filter((_, i) => i !== index);
        if (latestNewsData?.articles) {
            const nextIndex = newsIndex + batchSize;
            const newBatch = latestNewsData.articles.slice(newsIndex, nextIndex);
            if (newBatch.length > 0) {
                newDisplayedNews.push(newBatch[0]); // Add one new item
                setDisplayedNews(newDisplayedNews);
                setNewsIndex(nextIndex);
            }
        }
        rowMap[index]?.closeRow();
    };

    const handlePin = (rowMap,index) => {
        // Pin the item, i.e., don't refresh it
        const itemToPin = displayedNews[index];
        setPinnedNews([itemToPin]);
        setBatchSize(4);

        // Remove pinned item from displayed news
        const newDisplayedNews = displayedNews.filter((_, i) => i !== index);
        setDisplayedNews(newDisplayedNews);

        rowMap[index]?.closeRow();
    };

    const getNewBatch = async ()=>{
        await getLatestNews(newsApiPageNumber);
        dispatch(setGetNewsApiPageNumber(parseInt(newsApiPageNumber)+1));
        setNewsIndex(0);
    }

    const loadMoreNews = () => {
        if (latestNewsData?.articles) {
            setSyncPressed(true);
            // Calculate the next index
            const newIndex = newsIndex + batchSize;
            
            // Slice the next batch of news
            const newBatch = latestNewsData.articles.slice(newsIndex, newIndex);
            
            if (newBatch.length > 0) {
                // Append the new batch to the existing news
                setDisplayedNews(prevNews => [...newBatch]);
                
                // Update the index for the next batch
                setNewsIndex(newIndex);
            }
        }
    };

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.hiddenContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(rowMap,data.index)}>
                <Text style={styles.hiddenText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pinButton} onPress={() => handlePin(rowMap,data.index)}>
                <Text style={styles.hiddenText}>Pin</Text>
            </TouchableOpacity>
        </View>
    );

    
    useEffect(() => {
        if(newsIndex){
            if(newsIndex==100){
                try{
                   getNewBatch()
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
            }else{
                const interval = setInterval(async() => {
                    if (latestNewsData?.articles) {
                        // Get the next batch of news
                        const newBatch = latestNewsData.articles.slice(newsIndex, newsIndex + batchSize);
                        if (newBatch.length > 0) {
                            setDisplayedNews(prevNews => [...newBatch]); // Add new batch to the top
                            setNewsIndex(prevIndex => prevIndex + batchSize); // Update index for the next batch
                            
                        }
                    }
                }, 10000); // 10 seconds interval
                if(syncPressed){
                    clearInterval(interval);
                    setSyncPressed(false);
                }
                // Clean up interval on component unmount
                
                return () =>{
                    clearInterval(interval);
                } 
            }
            
        }
    }, [latestNewsData, newsIndex,syncPressed,batchSize]);

    const dateFormat = (inputDate) => {
        const dateObj = new Date(inputDate);
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); 
        const day = dateObj.getDate().toString().padStart(2, '0');

        return `${year}/${month}/${day}`;
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.titleView}>
                    <Text style={styles.sourceText}>{item?.source?.name}</Text>
                    <Text style={styles.dateText}>{dateFormat(item?.publishedAt)}</Text>
                </View>
                <View style={styles.contentView}>
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>{item?.title}</Text>
                        <Text style={styles.authorText}>{item?.author}</Text>
                    </View>
                    <Image source={{ uri: item.urlToImage }} style={styles.image} />
                </View>
            </View>
        );
    };

    const FlatListDivider = () => {
        return <View style={styles.divider} />;
    };

    return (
        <View style={styles.container}>
            <View style={[styles.titleView,{marginHorizontal:16, backgroundColor:'#fff', paddingVertical:16}]}>
                <Image source={require('../../assets/icon.png')} style={{width:111, height:31}} />
                <TouchableOpacity style={{}} onPress={() => loadMoreNews()}>
                <Image source={require('../../assets/sync.png')} style={{width:42, height:31,marginRight:16}} />
                </TouchableOpacity>
            </View>
            <FlatListDivider/>
            <SwipeListView
                data={pinnedNews?.length?[...pinnedNews,...displayedNews]:displayedNews}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-150}
                keyExtractor={(item, index) => index.toString()}
                disableRightSwipe
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingTop: 20, // Add some space at the top for the header
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    sourceText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    dateText: {
        color: 'gray',
        fontSize: 14,
    },
    contentView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 8,
        resizeMode: 'cover',
        backgroundColor: '#e0e0e0', // Fallback color while loading
    },
    textContainer: {
        flex: 1,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#000000',
    },
    authorText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'gray',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
    },
    hiddenContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        height: '100%',
        backgroundColor: 'transparent', 
        marginRight: 16,
        padding: 16,
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: '70%',
        marginRight: 10,
    },
    pinButton: {
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: '70%',
    },
    hiddenText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

