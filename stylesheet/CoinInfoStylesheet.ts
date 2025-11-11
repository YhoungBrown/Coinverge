import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        marginVertical: 10 
    },
    image: {
        width: 35, 
        height: 35, 
        marginRight: 10
    },
    coinTitle: {
        fontSize: 15, 
        fontWeight: "bold",
    },
    rank: {
        color: "#888", 
        fontSize: 11
    },
    currentPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentPrice: {
        fontSize: 22,
        fontWeight: "bold",
    },
    subTitle: {
        fontWeight: "600", 
        fontSize: 16,
        marginTop: 8
    },
    marketInfoText: {
        fontSize: 13
    },
    lastUpdate: {
        fontSize: 12, 
        marginTop: 10, 
        marginBottom: 25,
        color: "#888" ,
    },
})

export default styles;