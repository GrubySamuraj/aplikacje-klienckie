import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log("Header")
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#FF0000" }}>
                <Text style={styles.text}> Header </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 48,
    }
});

export default Header;