import { Platform } from 'react-native';

let Authenticator: any;
let useAuthenticator: any;

if (Platform.OS === 'web') {
  // Web-specific imports
  const AmplifyUIReact = require('@aws-amplify/ui-react');
  Authenticator = AmplifyUIReact.Authenticator;
  useAuthenticator = AmplifyUIReact.useAuthenticator;

  // Import Amplify UI styles for the web
  require('@aws-amplify/ui-react/styles.css');

  // Apply RTL styles for the web
  const body = document.querySelector('body');
  if (body) {
    body.style.direction = 'rtl';
    body.style.textAlign = 'right';
  }
  const root = document.querySelector('div');
  if (root) {
    root.style.justifyContent = 'center';
  }

} else {
  // Native-specific imports
  const AmplifyUIReactNative = require('@aws-amplify/ui-react-native');
  Authenticator = AmplifyUIReactNative.Authenticator;
  useAuthenticator = AmplifyUIReactNative.useAuthenticator;
}

export { Authenticator, useAuthenticator };
