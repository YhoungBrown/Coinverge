import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '3%',
        flex: 1
    },
    walletAmountSection: {
        width: '100%',
        height: '25%',
        backgroundColor: 'transparent',
        borderWidth: 0.8,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: '5%'
    },
    yourAssetsBackground: {
        height: 35,
        marginTop: 25,
        padding: 5,
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: '5%'
    },
    yourWallet: {
        fontSize: 15,
        fontWeight: "600"
    },
    changeTime: {
        paddingHorizontal: '5%',
        fontSize: 11,
        marginLeft: -10
    },
     percentageChangedText: {
        fontSize: 9,
        marginLeft: 5
    },
    AmountContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 2,
        backgroundColor: 'transparent'

    },
    currencySymbol: {
        fontSize: 17,
        marginRight: 3
    },
    AmountFigure: {
        fontSize: 25,
        fontWeight: "600"
    },
    activityIndicator: {
        alignItems: 'center',
        position: 'absolute',
        top: 300,
        left: 150,
        flex: 1
    },
    favouriteCategoryText: {
        fontSize: 15,
        fontWeight: "600"
    },
    favouriteCategory: {
        alignItems:'center',
        marginTop: 10,
        marginRight: 'auto',
        paddingVertical: 5

    },
    chartContainer: {
         flex: 1, 
         maxHeight: 100,
         marginBottom: 10
    },

})

export default styles;