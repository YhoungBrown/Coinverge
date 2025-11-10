import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    singleProductContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
        marginBottom: 8,
        paddingHorizontal: "1%"
    },
    coinNameAndImageContainer: {
        flexDirection: 'row',
        alignItems: "center"
    },
    coinName: {
        marginLeft: 12,
        fontWeight: "500"
    },
    percentageChangeContainer: {
        flexDirection: 'row',
        alignItems: "center"
    },
    percentageChangedText: {
        fontSize: 9,
        marginLeft: 5
    },
    currentPrice: {
        fontWeight: "600",
        marginLeft: 'auto'
    },
})

export default styles;