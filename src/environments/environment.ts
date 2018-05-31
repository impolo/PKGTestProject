// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAe-KrXVh7D2e3dhPVVVNF18JBKDlx39LM",
    authDomain: "pgktestproject.firebaseapp.com",
    databaseURL: "https://pgktestproject.firebaseio.com",
    projectId: "pgktestproject",
    storageBucket: "pgktestproject.appspot.com",
    messagingSenderId: "544361812605"
  }
};
