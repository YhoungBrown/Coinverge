import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        paddingHorizontal: '10%' 
    },
    bioSection: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePixContainer: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    profilePix: {
        fontSize: 65,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
        marginLeft: '15%',
        lineHeight: 65
    },
    bioTitle: {
        marginTop: '6%',
        fontWeight: "800",
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lineBreaker: {
        width: '100%',
        height: 0.3
    },
    settingsCard: {
        flexDirection: "row",
        paddingVertical: 20,
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    themeSwitchingText: {
        fontSize: 15,
    },
})

export default styles;