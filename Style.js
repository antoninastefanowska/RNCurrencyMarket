import { StyleSheet } from 'react-native';

export const GRADIENT_COLORS = ['#59ffee', '#242a78'];

export default StyleSheet.create({
    container: {
        padding: 5,
        flex: 1
    },

    elementContainer: {
        margin: 5,
        padding: 5,
        backgroundColor: '#e3fffe',
        shadowColor: '#000000',
        shadowOffset: {
            x: 5,
            y: 5
        },
        shadowRadius: 5
    },

    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    verticalContainer: {
        margin: 2,
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
    },

    cell: {
        margin: 2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    label: {
        fontSize: 15,
        flex: 1,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        margin: 3
    },

    bigLabel: {
        fontSize: 17
    },

    smallLabel: {
        fontSize: 12,
    },

    greenArrow: {
        color: '#21ff9f',
        margin: 3
    },

    redArrow: {
        color: '#ff2155',
        margin: 3
    },

    input: {
        padding: 3
    },

    picker: {
        flex: 3,
        alignItems: 'center'
    },

    convertArrow: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center'
    },

    datePicker: {
        alignSelf: 'stretch',
        margin: 5
    }
});