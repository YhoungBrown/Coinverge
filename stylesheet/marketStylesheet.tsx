import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
         flex: 1,
         padding: '4.5%'
    },
     textInput: {
        padding: 14,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 15,
        borderWidth: 1,
        fontSize: 16,
    },
    singleCoinOpacity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.32

    },
    coinName: {
        fontWeight: "500"
    },
    percentageChangeContainer: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: -4
    },
    percentageChangedText: {
        fontSize: 9,
        marginLeft: 5
    },
    currentPrice: {
        fontWeight: "600",
        marginLeft: 'auto',
        fontSize: 12
    },
})

export default styles;