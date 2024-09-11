
//import { COMMENTS } from '../shared/comments';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Rating, Input } from 'react-native-elements';
import { postComment } from '../features/comments/commentsSlice';
import * as Animatable from 'react-native-animatable'

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);

    const dispatch = useDispatch();
    
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')

    //handle form submission
    const handleSubmit = () => {
        const newComment = {
            author, 
            rating, 
            text,            
            campsiteId: campsite.id
        }

        // Dispatch the postComment thunk with the new comment as the payload
        dispatch(postComment(newComment));

        //Close the modal
        setShowModal(!showModal)
    }

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    };
    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                
                {/* Replace Text with RNE Rating component */}
                <Rating
                    readonly
                    startingValue={item.rating}  // Set the rating value
                    imageSize={10}  // Set star size
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }}  // Apply inline styles
                />
    
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    return (

        <Animatable.View
            animation='fadeInUp'
            duration={2000}
            delay={1000}
        >

                <FlatList
                    data={comments.commentsArray.filter(
                        (comment) => comment.campsiteId === campsite.id
                    )}
                    renderItem={renderCommentItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{
                        marginHorizontal: 20,
                        paddingVertical: 20
                    }}
                    ListHeaderComponent={<>
                        <RenderCampsite
                            campsite={campsite}
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                            onShowModal={() => setShowModal(!showModal)} />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>} />
            
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>

                    {/* Rating Component from React Native Elements NEED MORE PROPS */}
                    {/* Rating Component */}
                    <Rating 
                        showRating
                        startingValue={rating}
                        imageSize={40}
                        onFinishRating={(rating)=> setRating(rating)}
                        style={{paddingVertical: 10}}/>

                        {/* Input Component for Author */}
                        <Input 
                            placeholder="Author"
                            value={author}
                            onChangeText={(text) => setAuthor(text)}
                            leftIcon={{type: 'font-awesome', name:'user-o'}}
                            leftIconContainerStyle={{Input, paddingRight: 10}}/>

                        {/* Input Component for Comment */}
                        <Input 
                            placeholder="Comment"
                            value={text}
                            onChangeText={(text) => setText(text)} //Handle text input
                            leftIcon={{type: 'font-awesome', name:'comment-o'}}
                            leftIconContainerStyle={{Input, paddingRight: 10}}/>

                    {/* Submit button */}
                    <View style={{margin: 10}}>
                        <Button
                            title="Submit"
                            color="#5637DD"
                            onPress={() => {
                                handleSubmit();  // Call handleSubmit
                                resetForm();     // Call resetForm after submission
                        }}
                        />
                    </View>

                    
                    <View style={{margin: 10}}>
                        <Button 
                        onPress={() => {
                            setShowModal(!showModal);
                            resetForm();
                            
                        }}
                        color='#808080'
                        title='Cancel'/>
                    </View>
                </View>
            </Modal>
        </Animatable.View> 




    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    }, 
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;