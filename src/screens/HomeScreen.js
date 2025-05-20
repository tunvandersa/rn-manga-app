import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from '../styles/HomeScreen.styles'
import axios from 'axios';

const MangaItem = ({ item }) => {
  const imageUrl = `https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`;
  
  return (
    <TouchableOpacity style={styles.mangaItem}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.mangaImage}
        resizeMode="cover"
      />
      <Text numberOfLines={2} style={styles.mangaName}>
        {item.name}
      </Text>
      <Text style={styles.chapterInfo}>
        Chapter {item.chaptersLatest[0]?.chapter_name || 'N/A'}
      </Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMangaList = async () => {
    try {
      const response = await axios.get('https://otruyenapi.com/v1/api/home');
      const data = response.data;
      if (data.status === 'success') {
        setMangaList(data.data);
        setLoading(false);
      } else {
        setMangaList([]);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMangaList();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Có lỗi xảy ra: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Truyện Mới Cập Nhật</Text>
      <FlatList
        data={mangaList.items}
        renderItem={({ item }) => <MangaItem item={item} />}
        keyExtractor={item => item._id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default HomeScreen;