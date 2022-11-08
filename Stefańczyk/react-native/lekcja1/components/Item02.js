import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Item extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: this.props.color, justifyContent: "center" }}>
                <Text style={[styles.text, { color: this.props.fontColor }]}>Item {this.props.number} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        padding: 10,
        fontSize: 50,
        textAlign: 'center'
    }
});

export default Item;