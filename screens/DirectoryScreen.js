//import { useState } from 'react';
//import { CAMPSITES } from '../shared/campsites';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable'

const DirectoryScreen = ({ navigation }) => {
    const campsites = useSelector((state) => state.campsites);

    const renderDirectoryItem = ({ item: campsite }) => {
        return (
            <Animatable.View
                animation='fadeInRightBig'
                duration={20000}>
            <Tile
                title={campsite.name}
                caption={campsite.description}
                featured
                onPress={() =>
                    navigation.navigate('CampsiteInfo', { campsite })
                }
                imageSrc={{ uri: baseUrl + campsite.image }}
            />
            </Animatable.View>
        );
    };
    return (
        <FlatList
            data={campsites.campsitesArray}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default DirectoryScreen;
