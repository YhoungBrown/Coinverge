import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%', 
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  welcomeNote: {
    fontSize: 13,
    marginBottom: -20,
    marginLeft: 10,
    fontWeight: '500'
  },
  BrandName: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fea500',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 7.5,
    marginLeft: 85,
    fontWeight: '800'
  },
  WelcomeBtn: {
    width: 250,
    height: 50,
    borderRadius: 25,
    marginBottom: 65,
    padding: 10,
    backgroundColor: 'rgba(254,165,0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  continueBtnText: {
    fontWeight: '600',
    marginRight: 3
  },
});

export default styles;
