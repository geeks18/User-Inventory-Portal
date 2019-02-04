// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const environmentLocal={
  production: false,
  name: 'local',
 
  getUserDetails:'http://localhost:8080/development/getuserdetails',
  signIn:'http://localhost:8080/development/signin',
  signUp:'http://localhost:8080/development/signup'
  }
  export const environmentAWS={
    production: false,
      name: 'local',
      getUserDetails:'https://dckdovuhpc.execute-api.eu-north-1.amazonaws.com/development/getuserdetails',
      signIn:'https://dckdovuhpc.execute-api.eu-north-1.amazonaws.com/development/signin',
      signUp:'https://dckdovuhpc.execute-api.eu-north-1.amazonaws.com/development/signup',
      forgotPwd:'https://dckdovuhpc.execute-api.eu-north-1.amazonaws.com/development/forgotpassword',
      changePwd:'https://dckdovuhpc.execute-api.eu-north-1.amazonaws.com/development/confirmforgotpassword',
         
    }
      
  
  export const environment=environmentAWS; 