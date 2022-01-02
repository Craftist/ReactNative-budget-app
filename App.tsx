import {StatusBar} from 'expo-status-bar';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from "react";
import {Table, Row, Rows} from 'react-native-table-component';
import {NavigationState, SceneMap, SceneRendererProps, TabBar, TabView} from "react-native-tab-view";
import Budget from "./views/Budget";
import Crypto from "./views/Crypto";


export default function App() {
    type State = NavigationState<{
        key: string;
        title: string;
    }>;

    const [state, setState] = useState({
        index: 1,
        routes: [
            { key: 'budget', title: 'Budget' },
            { key: 'crypto', title: 'Crypto' },
        ]
    });

    const handleIndexChange = (index: number) => setState({index, routes: state.routes});
    const renderTabBar = (props: SceneRendererProps & {navigationState: State}) => (
        <TabBar
            {...props}
            scrollEnabled />
    );
    const renderScene = SceneMap({
        budget: Budget,
        crypto: Crypto,
    });

    return (
        <View style={styles.container}>
            <TabView style={{width: "100%"}}
                     onIndexChange={handleIndexChange}
                     navigationState={state}
                     renderScene={renderScene}
                     renderTabBar={renderTabBar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});
