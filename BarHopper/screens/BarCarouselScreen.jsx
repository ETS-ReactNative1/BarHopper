import React, { createRef, useEffect, useState, useRef } from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import CardCarousel from '../components/CardCarousel';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
const axios = require('axios');

export default function BarCarouselScreen({ route }) {


    const { checkBoxState, locationInfo } = route.params;

    const [nearbyBars, setNearbyBars] = useState([]);


    useEffect(() => {

        try {
            let music_filter_string;
            if (checkBoxState.music) {
                music_filter_string = `&filter_by_music=${checkBoxState.music}`
            } else {
                music_filter_string = ""
            }
            let vibe_filter_string;
            if (checkBoxState.vibes) {
                vibe_filter_string = `&filter_by_vibe=${checkBoxState.vibe}`
            } else {
                vibe_filter_string = ""
            }
            let line_filter_string;
            if (checkBoxState.line) {
                line_filter_string = `&filter_by_line=${checkBoxState.line}`
            } else {
                line_filter_string = ""
            }


            const barsConfig = {
                method: 'get',
                url: `https://c6jxkilx8a.execute-api.us-east-1.amazonaws.com/dev/bars?lat=${locationInfo.latitude}&long=${locationInfo.longitude}&radius=1500${music_filter_string}${line_filter_string}${vibe_filter_string}`,
                headers: {
                    'X-Amz-Date': '20211113T172707Z',
                    Authorization:
                        'AWS4-HMAC-SHA256 Credential=AKIAYS3YCLSS436J4VVF/20211113/us-east-1/execute-api/aws4_request, SignedHeaders=host;x-amz-date, Signature=be161e0053c676970d25d52a5fcce10e67e7f3eb038bb383da77c2dc959ac12b'
                }
            };

            axios(barsConfig)
                .then(function (response) {
                    // console.log(JSON.stringify(response.data));
                    setNearbyBars(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (e) {
            console.log(e);
        }
    }, []);


    if (nearbyBars.length !== 0) {

        return (

            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <CardCarousel header="Your Filter" subheader="Hoboken, NJ" barsData={nearbyBars} />


                </ScrollView>
            </View>
        );
    }
    else {
        return <Text>Loading...</Text>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    }
});
