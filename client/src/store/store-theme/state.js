export default function () {
  return {
    themes: {
      sky: {
        name: 'sky',
        // primary: '#1C72B5',
        primary: '#FD898C',
        secondary: '#F7C7CB',
        // secondary: '#7ca5c4',
        dark: '#0D1A24',
        info: '#7dc9e0',
        bgImage: require('../../assets/images/themes/bg-custom.png'),
        // bgImage: require('../../assets/images/themes/bg-sky.jpg'),
        isActive: true
      },
      moon: {
        name: 'moon',
        primary: '#C04D68',
        secondary: '#c28392',
        dark: '#382037',
        info: '#907894',
        bgImage: require('../../assets/images/themes/bg-moon.jpg'),
        isActive: false
      },
      nature: {
        name: 'nature',
        primary: '#7ABA8B',
        secondary: '#608B84',
        dark: '#0F292B',
        info: '#BADB94',
        bgImage: require('../../assets/images/themes/bg-nature.jpg'),
        isActive: false
      }
    }
  }
}
