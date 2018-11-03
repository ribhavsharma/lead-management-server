const uiConfig = {
    'signInSuccessUrl': '/',
    'callbacks': {
        'signInSuccess': function(user, credential, redirectUrl) {
            // Redirect to signInSuccessUrl
            return true;
        }
    },
    'signInOptions': [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            authMethod: 'https://accounts.google.com',
            clientId: CLIENT_ID
        },
    ],
    'credentialHelper': CLIENT_ID && CLIENT_ID != 'YOUR_OAUTH_CLIENT_ID' ?
        firebaseui.auth.CredentialHelper.GOOGLE_YOLO : firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);
