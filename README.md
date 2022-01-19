# neumorphic-product-intro
![Version](https://img.shields.io/badge/Version-v1.0.1-yellow) 
![repo](https://img.shields.io/badge/Status-Active-success)
![ES](https://img.shields.io/badge/JavaScript%20Version-ES%206-blue)

Product intro generator based on:
- ES6 classes
- Shadow DOM v1 
- Neumorphism design trend
- No-dependency pure JS.

![gokhanmeteerturk](https://user-images.githubusercontent.com/92143124/149730624-c549414a-e600-4466-ae8e-c261288e9da7.gif)


### Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://github.com/alrra/browser-logos)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://github.com/alrra/browser-logos)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://github.com/alrra/browser-logos)</br>Safari |  [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](https://github.com/alrra/browser-logos)&nbsp;</br>&nbsp;&nbsp;Edge  &nbsp;|  [<img src="https://github.com/jepso-ci/browser-logos/blob/master/images/ie.svg" alt="IE" width="24px" height="24px" />](https://github.com/jepso-ci/browser-logos)&nbsp;</br>&nbsp;&nbsp;IE  &nbsp;|
| --------- | --------- | --------- | --------- | --------- |
|&nbsp;&nbsp;&nbsp;&nbsp;63 |&nbsp;&nbsp;&nbsp;&nbsp;53 |&nbsp;&nbsp;&nbsp;10 |&nbsp;&nbsp;&nbsp;&nbsp;79| &nbsp;Nope |

## Installation

Download the js file from dist folder <b>or just use a CDN instead</b>:

```HTML+ECR
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/gokhanmeteerturk/neumorphic-product-intro@v1.0.1/dist/product-intro-main.js"></script>
```

Css code is placed dynamically in a shadow root, so you don't need to link a css file. 


## Usage

```JS
let myIntro = new ProductIntro(settings = {
    steps: [{
            selector: "#login_button",
            title: "Click Here to Login",
            content: "Start by logging in using this button right here."
        },
        {
            selector: "a.profile.active",
            title: "Your Profile",
            content: "You can always view your profile by using this button."
        },
    ],
    finishButtonText:"Finish",
    skipButtonText:"Skip"
});

myIntro.start();
```

``` finishButtonText ``` and ``` skipButtonText ``` parameters are optional, and default to "Finish", "Skip" respectively.



### Limitations:

Currently, ProductIntro only "circles" the element it locates using the selector(via svg clip path). If your selector points at a big container, this cut-out circle will have a large diameter. Since the message element is placed 'next to' this circle, a large enough circle may force this message out of the viewport.

Until new "step types" such as "rectangular cut-out" or "no cut-out" are introduced, it is recommended that you only use selectors to point at small components such as buttons or input areas. 
