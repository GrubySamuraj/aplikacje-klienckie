import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Item extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: this.props.color }}>
                <Text style={[styles.text, { fontSize: parseInt(this.props.fontSize) }]}>Item={this.props.content} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        padding: 10
    }
});

export default Item;