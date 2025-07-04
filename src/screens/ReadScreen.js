
import { View, Text, FlatList, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ReadScreen = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listImage, setListImage] = useState([]); 

  const route = useRoute();
  const chapter_api_data = route.params;

  const fetchManga = async () => {
    try {
      const response = await axios.get(chapter_api_data);

      if (response.data.status === 'success') {
        const data = response.data.data;
        const domain = data.domain_cdn;
        const path = data.item.chapter_path;

        const initialImages = data.item.chapter_image.map((item) => ({
          uri: `${domain}/${path}/${item.image_file}`,
          ratio: 0, 
        }));
        setListImage(initialImages);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManga();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đợi chút, truyện đang được tải ...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Lỗi: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={listImage}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ width: screenWidth, alignItems: 'center' }}>
            {item.ratio === 0 ? (
             
              <View
                style={{
                  width: screenWidth,
                  height: screenHeight,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f0f0f0', // Nền màu xám nhạt
                }}
              >
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            ) : null}
            <Image
              source={{ uri: item.uri }}
              style={{
                width: screenWidth,
                height: screenWidth * item.ratio,
                resizeMode: 'contain',
              }}
              onLoad={(event) => {
                
                const { width, height } = event.nativeEvent.source;
                const newRatio = height / width;

                setListImage((prevList) => {
                  const newList = [...prevList];
                  newList[index] = { ...newList[index], ratio: newRatio };
                  return newList;
                });
              }}
              onError={(error) => {
                console.error('Lỗi tải ảnh:', error.nativeEvent.error);
              }}
            />
          </View>
        )}
        initialNumToRender={3}
        windowSize={5}
        maxToRenderPerBatch={5}
      />
    </View>
  );
};

export default ReadScreen;