# Typed APIs 
> :exclamation: **Work in progress**  
  
## Intro
**Typed APIs** provides uniform interfaces to use some of the most common web APIs. Its written in `Typescript` to provide type checking and better code readability and is `Promise` based to overcome the inconsistent nature of the current APIs that are using callbacks.  
  
### Features
 - On demand `script` loading, libraries are loaded asynchronously when need to be used  
 - `Promise` based uniform API with with type definition support   

## Usage
### Installation - [package/typed-apis](https://www.npmjs.com/package/typed-apis)
```  
npm install typed-apis --save  
  
yarn add typed-apis
```  

### Examples  
> Google OAuth2 client sign-in
```javascript  
import {Google} from 'typed-apis'  
  
Google.load({apiKey: 'public-api-key'}).then(Google => {     
    Google.getAuth2().signIn().then(GoogleUser => {    
        console.log('GoogleUser', GoogleUser)  
 })})  
```
