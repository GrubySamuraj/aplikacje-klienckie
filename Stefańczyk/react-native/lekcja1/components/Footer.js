import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log("Footer")
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#0000FF" }}>
                <Text style={styles.text}> Footer </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: { fontSize: 48, }
});

export default Footer;