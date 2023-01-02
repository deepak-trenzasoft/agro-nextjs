import '../src/styles/index.scss'
import '../src/styles/main.css'

import Script from "next/script";
import Head from "next/head";

import React, { useState, useEffect } from 'react';

// //import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// //import 'bootstrap/dist/js/bootstrap.js';
// import $ from 'jquery';
// import Popper from 'popper.js';


function MyApp({ Component, pageProps }) {

  useEffect(()=>{
      import("bootstrap/dist/js/bootstrap");
  },[])

  return (
    <> 
         <Head> 
            <link    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossOrigin="anonymous"
            />
        </Head>    <Script
          id="bootstrap-cdn"
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />     <Component {...pageProps} /></> );
}

export default MyApp