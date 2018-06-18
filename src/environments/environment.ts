// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDEz-EKcSblyRInulEnUU8g6qagXiK-4xc',
    authDomain: 'jobsportal-cb848.firebaseapp.com',
    databaseURL: 'https://jobsportal-cb848.firebaseio.com',
    projectId: 'jobsportal-cb848',
    storageBucket: 'jobsportal-cb848.appspot.com',
    messagingSenderId: '1051520237224'
  },
  maps: {
    apiKey: 'AIzaSyBPp9Trq6KqZh8BK-7Q0Zc_mpzIyqJDalo',
    libraries: ['places']
  }
};
