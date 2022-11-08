import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Item from "./components/Item";
export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Item color="#FF0000" content="Header" fontSize="50" />
                <Item color="#FFFF00" content="Content" fontSize="50" />
                <Item color="#FF00FF" content="Footer" fontSize="50" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff00',
    },
});