import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Item extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    click() {
        alert(JSON.stringify(this.props, 0, 10));
    }
    render() {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.click() }}>
                <View style={{ flex: 1, backgroundColor: this.props.color, justifyContent: "center" }}>
                    <Text style={[styles.text, { color: this.props.fontColor }]}> {this.props.number} </Text>
                </View>
            </TouchableOpacity>
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