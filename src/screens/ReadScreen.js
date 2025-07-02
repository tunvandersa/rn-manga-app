import { View, Text, FlatList, Image, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ReadScreen = () => {
    const [chapter, setChapter] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [listImage, setListImage] = useState([]);

    const route = useRoute();

    const chapter_api_data = route.params;

    const fetchManga = async () => {
        try {
            const response = await axios.get(chapter_api_data); // Giả sử chapter_api_data là một URL string

            if (response.data.status === 'success') {
                const data = response.data.data;
                const domain = data.domain_cdn;
                const path = data.item.chapter_path;

                const images = data.item.chapter_image.map(item =>
                    `${domain}/${path}/${item.image_file}`
                );

                setListImage(images);
                setLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchManga();
    }), [];
    if (loading) {
        return (
            <View>
                <Text>Đang tải...</Text>
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
        <View>
            <FlatList
                data={listImage}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width: screenWidth, height: screenHeight, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: item }}
                                style={{
                                    width: screenWidth,
                                    height: screenHeight,
                                }}
                                resizeMode="contain"
                            />
                        </View>
                    );
                }}
            />

        </View>
    )
}

export default ReadScreen