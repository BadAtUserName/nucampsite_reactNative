//import { useState } from 'react';
//import { CAMPSITES } from '../shared/campsites';
//import { CAMPSITES } from '../shared/campsites';
//import { PROMOTIONS } from '../shared/promotions';
//import { PARTNERS } from '../shared/partners';
import React from 'react'; //this line is not in the nucamp exercise code
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';


const FeaturedItem = (props) => {
  const { item } = props
  if (props.isLoading) {
    return <Loading />
  }
  if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    )
  }
  if (item) {
    return (
      <Card containerStyle={{ padding: 0 }}>
        <Card.Image source={{ uri: baseUrl + item.image }}>
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 20
              }}
            >
              {item.name}
            </Text>
          </View>
        </Card.Image>
        <Text style={{ margin: 20 }}>{item.description}</Text>
      </Card>
    );
  }
  return <View />;
};

const HomeScreen = () => {
  console.log('PARTNERS', partners)
  //const [campsites, setCampsites] = useState(CAMPSITES);
  //const [promotions, setPromotions] = useState(PROMOTIONS);
  //const [partners, setPartners] = useState(PARTNERS);
  const campsites = useSelector((state) => state.campsites)
  const promotions = useSelector((state) => state.promotions)
  const partners = useSelector((state) => state.partners)

  // Add console.log statements to check the contents of the state variables
  console.log('Campsites:', campsites);
  console.log('Promotions:', promotions);
  console.log('Partners:', partners);

  const featCampsite = campsites.campsitesArray.find((item) => item.featured);
  const featPromotion = promotions.promotionsArray.find((item) => item.featured);
  const featPartner = partners.partnersArray.find((item) => item.featured);

  return (
    <ScrollView>
      <FeaturedItem
        item={featCampsite}
        isLoading={campsites.isLoading}
        errMess={campsites.errMess}
      />
      <FeaturedItem
        item={featPromotion}
        isLoading={promotions.isLoading}
        errMess={promotions.errMess}
      />
      <FeaturedItem
        item={featPartner}
        isLoading={partners.isLoading}
        errMess={partners.errMess}
      />
    </ScrollView>
  );
};

export default HomeScreen;
