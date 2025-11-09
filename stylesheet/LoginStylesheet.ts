import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 10,
    flex: 1,
  },
  welcomeTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
    paddingHorizontal: 20,
  },
  textInput: {
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 2,
    fontSize: 16,
  },
  textInputTitle: {
    fontSize: 15,
    marginTop: 24,
    fontWeight: '600',
  },
  messageSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 8,
    fontWeight: '500',
  },
  welcomeMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  welcomeContainer: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 40,
    // Elevation for Android
    elevation: 8,
    // Shadow for iOS - will be overridden in component based on theme
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  startQuizButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  startQuizButtonTouchableOpacity: {
    alignSelf: 'center',
  },
});

export default styles;
