import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Item from "./components/Item02";
export default class App extends React.Component {
    constructor() {
        super();
        this.data = [
            {
                id: 0,
                color: "#00FF00",
                color2: "#00FFF0"
            },
            {
                id: 1,
                color: "#2eaf04",
                color2: "#8ebfF4"
            },
            {
                id: 2,
                color: "#7b9ea3",
                color2: "#0bb52d"
            },
            {
                id: 3,
                color: "#c59f43",
                color2: "#b515Fa"
            },
            {
                id: 4,
                color: "#cb2103",
                color2: "#7bfa51",
            },
            {
                id: 5,
                color: "#b14bb5",
                color2: "#1f4a0f",
            },
        ]
    }
    render() {
        return (
            <>

                <View style={styles.container}>
                    {this.data.map((item, key) => {
                        return <Item key={key} color={item.color} color2={item.color2} number={item.id} />
                    })}
                </View>

            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff00',
        flexDirection: "row"
    },
});