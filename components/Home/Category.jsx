import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native';

export default function Category({category}) {
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Dog')

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        try {
            setCategoryList([]);
            let banners = [];
            const snap = await getDocs(collection(db, 'category'));

            snap.forEach((doc) => {
                const data = doc.data();
                banners.push(data);
            });


            setCategoryList(banners);
        } catch (error) {
            console.error("Error fetching banners: ", error);
        }
    };

    const renderItem = ({ item }) => {
        return (

            <TouchableOpacity style={{ flex: 1 }} onPress={()=>{
                setSelectedCategory(item?.name)
                category(item?.name)
            }}>


                <View style={[styles.container , selectedCategory==item?.name && styles.selectedCategory]} >

                    <Image
                        source={{ uri: item?.image }}
                        style={styles.containerImage}
                        resizeMode="cover"
                    />

                </View>

                <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center' }}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{
            margin: '10 10'
        }}>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 20, fontFamily: 'outfit-medium' }}>
                    Category
                </Text>
            </View>

            <FlatList
                data={categoryList}
                numColumns={4}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.LIGHT_PRIMARY,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.PRIMARY,
        margin: 5
    },

    containerImage: {
        height: 40,
        width: 40,
        borderRadius: 6
    },
    selectedCategory:{
     backgroundColor:Colors.SECONDARY    ,
     borderColor:Colors.SECONDARY
    }
})