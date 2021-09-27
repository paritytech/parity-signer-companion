const colors = {
  orange: '#D73400',
  pink: '#FF4077',
  grayLightest: '#CCCCCC',
  grayLight: '#C0C0C0',
  gray: '#9A9A9A',
  darkLight: '#262626',
  dark: '#151515',
  black: '#000000',
}

export const theme = {
  maxWidth: '600px',
  maxHeight: '600px',
  rem: '20px',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '0.9rem',
  smallFontSize: '0.75rem',
  titleFontSize: '1.4rem',
  lineHeight: '1.25',
  transition: '0.1s',
  shadow: '0px 4px 10px #000000;',

  buttonTextColor: colors.dark,
  buttonBgHoverColor: colors.grayLightest,
  hightlight: 'rgba(255, 255, 255, 0.1)',

  // Colors from Signer App
  alertBgColor: '#444444',
  appBgColor: colors.dark,
  buttonBgColor: colors.grayLight,
  cardBgColor: colors.darkLight,
  osBgColor: colors.black,
  darkBorderColor: colors.black,
  lightBorderColor: '#666666',
  signalBorderColor: '#8E1F40',
  errorSignalColor: colors.orange,
  mainSignalColor: colors.pink,
  fadedTextColor: colors.gray,
  mainTextColor: colors.grayLight,
}