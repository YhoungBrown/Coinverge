import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '3%',
    },
    arrowback: {
        position: 'absolute',
        left: 13,
        top: 40
    },
    activityIndicator: {
        alignItems: 'center',
        position: 'absolute',
        top: 300,
        left: 150,
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    btn: {
        width: 145,
        height: 40,
        padding: 5,
        borderRadius: 15
    },
    btnText: {
        fontWeight: "500",
        alignSelf: 'center'
    },
    percentageChangeOuterContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10
    },
    percentageChangeContainer: {
        width: 80,
        height: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: -10,
        padding: 1,
        paddingHorizontal: 1.5,
        marginLeft: 6
    },
    percentageChangeText: {
        fontSize: 8,
        marginTop: -2,
        fontWeight: "800"
    },
    modalCancelButton: {
        borderWidth: 1, 
        paddingVertical: 15,
        borderRadius: 10, 
        marginTop: 15, 
        alignItems: 'center',
    },
    actionBtnText : {
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalTextInput: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    modalActionOpacity: {
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInnerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContentContainer: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
})

export default styles;