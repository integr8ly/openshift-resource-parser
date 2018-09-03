# OpenShift Resource Parser

A library for retrieving and parsing various OpenShift resources.
You will need to set configuration when creating a new instance.

```
const config = {
  mockData: <enable_mock_data>
  clientId: '<openshift_oauthclient_id>',
  accessTokenUri: '<openshift_access_token_uri>',
  authorizationUri: '<openshift_authorize_uri>',
  redirectUri: '<openshift_redirect_uri>',
  scopes: [<user scopes>],
  masterUri: '<openshift_master_uri>'
};
```

For example, with a local openshift cluster:

```js
const config = {
  clientId: 'my-app',
  accessTokenUri: 'https://localhost:8443/oauth/token',
  authorizationUri: 'https://localhost:8443/oauth/authorize',
  redirectUri: 'http://myapp.example.com/oauth/callback',
  scopes: ['user:full'],
  masterUri: 'https://localhost:8443'
};

const parser = new OpenShiftResourceParser(config);
```

When you attempt to use the library, and a user has not authorized yet, the OAuth flow will start automatically.
However, if you want to *manually* start the OAuth flow, you can call the following:

```js
parser.startOAuth()
```

You will need to add an oauth callback route (e.g. `/oauth/callback`) to your App.
This route should call the below code to finish the oauth flow to get an access token:

```js
parser.finishOAuth().then(function (data) {
  // retrieve access token if you need it for other things
  console.log('access token', data.user.access_token);

  // redirect to the original url before oauth flow started
  const url = new URL(data.then);
  history.push(url.pathname);
});
```

To logout, call the below function:

```js
parser.logout();
```

* Documentation - See the `docs/` directory.
* Testing - Run `yarn run test`.
