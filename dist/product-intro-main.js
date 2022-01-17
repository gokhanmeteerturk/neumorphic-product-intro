var tut_css=`.product-intro-inner-container{font-size:16px;position:absolute;display:block;width:280px;max-width:100%;height:auto;border-radius:12px;z-index:9999;transition:top .35s ease,left .35s ease}.product-intro-main-container{opacity:0;animation:tut_appear_w_delay .2s ease-out forwards;animation-delay:1.2s;padding:18px;border-radius:12px}.product-intro-inner-container::after{content:'';position:absolute;top:0;left:0;animation:tut_bubble 1s ease-in forwards;z-index:-1;background:linear-gradient(275deg,rgba(var(--oy),var(--oy),var(--oy),var(--ox)) 0,rgba(var(--oz),var(--oz),var(--oz),var(--ox)) 100%)}:root{--overaftertop:-1000px;--overafterleft:-1000px;--overafterwidth:0px;--overafterheight:0px}#product-intro-over::after{content:'';display:block;position:absolute;top:var(--overaftertop);left:var(--overafterleft);width:var(--overafterwidth);height:var(--overafterheight);background-color:rgba(90,90,90,.3);clip-path:url(#clip3)}.tut_button{display:inline-block;background-color:transparent;margin:4px;border:none;border-radius:4px;padding:0 8px;min-width:32px;height:32px;line-height:32px;vertical-align:top;text-align:center;box-shadow:rgba(90,90,90,.3) 3px 3px 6px 0,rgba(255,255,255,.45) -3px -3px 6px 0;transition:box-shadow .3s ease,border-radius .3s ease}.tut_button:hover{border-radius:8px;box-shadow:rgba(90,90,90,.4) 6px 6px 10px 0,rgba(255,255,255,.55) -6px -6px 10px 0;cursor:pointer}.tut_button:active{border-radius:12px;box-shadow:rgba(90,90,90,.4) inset 3px 3px 6px 0,rgba(255,255,255,.55) inset -3px -3px 6px 0;cursor:pointer}.tut_button svg{display:block;margin:0 auto}@keyframes tut_appear_w_delay{from{opacity:0;background-color:transparent}to{opacity:1;background-color:rgba(224,224,224,.4)}}@property --ox{syntax:'<number>';inherits:false;initial-value:0.0}@property --oy{syntax:'<integer>';inherits:false;initial-value:90}@property --oz{syntax:'<integer>';inherits:false;initial-value:255}@keyframes tut_bubble{0%{opacity:0;box-shadow:3px 3px 6px rgba(90,90,90,.1),-3px -3px 6px rgba(255,255,255,.1);margin:20px 100px;width:calc(100% - 200px);height:calc(100% - 40px);border-radius:60px;--ox:0.0;--oy:90;--oz:255}40%{opacity:.2;border-radius:60px}80%{opacity:1;box-shadow:6px 6px 10px rgba(90,90,90,.3),-6px -6px 10px rgba(255,255,255,.45);margin:0;width:calc(100% + 0px);height:calc(100% + 0px);--ox:0.1;--oy:90;--oz:255;border-radius:40px}100%{opacity:1;box-shadow:6px 6px 10px rgba(90,90,90,.3),-6px -6px 10px rgba(255,255,255,.45);margin:0;width:calc(100% + 0px);height:calc(100% + 0px);border-radius:12px;--ox:0.05;--oy:255;--oz:90}}`;

class ProductIntro{
    constructor(settings={steps:[], finishButtonText:"Finish", skipButtonText:"Finish"}){
        
        if(!settings.hasOwnProperty('finishButtonText')){
            settings.finishButtonText = "Finish";
        }
        if(!settings.hasOwnProperty('skipButtonText')){
            settings.skipButtonText = "Skip";
        }
        this._steps=settings.steps;
        this.currentStepIndex = 0;
        this.finishButtonText=settings.finishButtonText;
        this.skipButtonText=settings.skipButtonText;
        this.productintrodom = document.createElement('DIV');
        this.productintroshadowroot = document.createElement('DIV');
        this.productintroshadowroot.id="productintroshadowroot";
    }
    start(){
        console.log(this.productintrodom);
        this.productintrodom.id="product-intro-dom";
        document.body.appendChild(this.productintrodom);
        let shadowPot = this.productintrodom.attachShadow({mode: 'open'});
        shadowPot.innerHTML=`<style>${tut_css}</style>`;
        shadowPot.appendChild(this.productintroshadowroot);
/*
        let stylesheet = document.createElement('link');
        stylesheet.setAttribute('rel', 'stylesheet');
        stylesheet.setAttribute('href', 'product-intro.css');
		
        shadowPot.appendChild(stylesheet);
*/
        if(this._steps.length>=1){
            this.showStep(0);
        }

    }

    _scrollTo(el){
        let viewportObj = this._getRealViewportValues();
        let vh = viewportObj.vh;
    
        let ePos = this._elPositions(el);
        if(ePos.top + ePos.height > vh+window.scrollY || window.scrollY > ePos.top){
            window.scrollTo({
                top: Math.max(ePos.top - (vh/2), 0),
                behavior: 'smooth',
            })
        }
    }
    showStep(stepIndex){
        this.currentStepIndex = stepIndex;
        let step = this._steps[stepIndex];
        let element=document.querySelector(step.selector);

        this._scrollTo(element);

        step.circleValues=this._circleThis(element);

        let totalindex = this._steps.length;
        this.showMessageFor(step, stepIndex, totalindex);
    }
    nextStep(){
        if(this._steps.length - 1 == this.currentStepIndex){
            this.complete();
        }
        else{
            this.showStep(this.currentStepIndex+1);
        }

    }
    
    _tutUpdate(el,x){
        var cVal=this._getCircleValues(x);
        this._circleThis(x);
        this._sensiblePositioning(el,cVal);
    }
    complete(){
        var containerElement = this.productintroshadowroot.querySelector('#product-intro-main-container');
        if(containerElement){
            this.productintroshadowroot.removeChild(containerElement);
        }
        var overElement = this.productintroshadowroot.querySelector('#product-intro-over');
        if(overElement){
            this.productintroshadowroot.removeChild(overElement);
        }

        this._removeWindowListeners();

    }
    previousStep(){
        this.showStep(Math.max(this.currentStepIndex-1, 0));
    }
    showMessageFor(step, stepIndex, totalStepsCount){
        let currentStep = step;
        currentStep.element = document.querySelector(step.selector);
        var title= currentStep.title;
        var content = currentStep.content;
        var cVal = currentStep.circleValues;
        
        var oldContainer = this.productintroshadowroot.querySelector('#product-intro-main-container');
        if(oldContainer){
            this.productintroshadowroot.removeChild(oldContainer);
        }
        
        var messageElement = document.createElement('DIV');
        messageElement.className='product-intro-inner-container';
        messageElement.id="product-intro-main-container";
        var messageContainer = document.createElement('DIV');
        messageContainer.className='product-intro-main-container';
        messageElement.appendChild(messageContainer);
        messageContainer.innerHTML=`<span style="float:right;font-weight:bold;">${stepIndex+1}/${totalStepsCount}</span><span style="font-weight:600;margin:8px 0;">${title}</span><p>${content}</p>`;
        var nextSvg = `
        <svg height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path fill="#000" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path>
        </svg>`;

        if(stepIndex+1 == totalStepsCount){
            nextSvg = this.finishButtonText;
        }
        messageContainer.innerHTML+=`
            <div class="navigate">
                <button class="tut_button tut_skip">${this.skipButtonText}</button>
                <button class="tut_button tut_left">
                    <svg height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path fill="#000" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path>
                    </svg>
                </button>
                <button class="tut_button tut_right">
                    ${nextSvg}
                </button>
            </div>`;
        this.productintroshadowroot.appendChild(messageElement);
        var that = this;
        messageElement.querySelector('.tut_right').addEventListener("click", function() {
            that.nextStep();
        });
        messageElement.querySelector('.tut_left').addEventListener("click", function() {
            that.previousStep();
        });
        messageElement.querySelector('.tut_skip').addEventListener("click", function() {
            that.complete();
        });

        this._sensiblePositioning(messageElement, cVal);

        this._removeWindowListeners();

        this.productintroshadowroot.setAttribute('pr-scrollSet', 'true');
        window.addEventListener('scroll',function productIntroScroll(event){
            if(!that.productintroshadowroot.hasAttribute('pr-scrollSet')){
                window.removeEventListener('scroll', productIntroScroll);
            }
            else{
                that._tutUpdate(messageElement, currentStep.element);
            }
        });

        window.addEventListener('resize',function productIntroResize(event){
            if(!that.productintroshadowroot.hasAttribute('pr-resizeSet')){
                window.removeEventListener('resize', productIntroResize);
            }
            else{
                that._tutUpdate(messageElement, currentStep.element);
            }
        });
        this.productintroshadowroot.setAttribute('pr-resizeSet', 'true');
    }
    _removeWindowListeners(){
        if(this.productintroshadowroot.hasAttribute('pr-resizeSet')){
            this.productintroshadowroot.removeAttribute('pr-resizeSet');
        }
        if(this.productintroshadowroot.hasAttribute('pr-scrollSet')){
            this.productintroshadowroot.removeAttribute('pr-scrollSet');
        }
    }
    _circleThis(el){
    
        var viewportObj = this._getViewportValues();
        var vw = viewportObj.vw;
        var vh = viewportObj.vh;
    
        var circleValues = this._getCircleValues(el);
    
        var centerAtX= this._floatTwo(100*circleValues.x/vw); // center x position as a percentage of the viewport width;
        var centerAtY= this._floatTwo(100*circleValues.y/vh); // center y position as a percentage of the viewport height;
        
        var svgW=vw;
        var svgH=vh;
    
        var circleOuterD=circleValues.diameter + 16;
        var circleOuterR=circleOuterD / 2;
        var circleOuterT=circleValues.y - circleOuterR;
        var circleOuterL=circleValues.x - circleOuterR;
    
        var pathD=`M 0 0 H ${svgW} V ${svgH} H 0 L 0 0 M ${circleValues.x} ${circleValues.y} m -${circleValues.radius}, 0 a ${circleValues.radius},${circleValues.radius} 0 1,0 ${circleValues.diameter},0 a ${circleValues.radius},${circleValues.radius} 0 1,0 -${circleValues.diameter},0`;
    
        var path2D=`M ${circleOuterR} ${circleOuterR} m -${circleValues.radius}, 0 a ${circleValues.radius},${circleValues.radius} 0 1,0 ${circleValues.diameter},0 a ${circleValues.radius},${circleValues.radius} 0 1,0 -${circleValues.diameter},0`;
    
        var path2D="M" + circleOuterR + "," + circleOuterR + "m" + (circleOuterR) + ",0" + "a" + circleOuterR + "," + circleOuterR + " 0 1,1 " + (-circleOuterR * 2) + ",0" + "a" + circleOuterR + "," + circleOuterR + " 0 1,1 " + (circleOuterR * 2) + ",0";
        
        var svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 ${svgW} ${svgH}">
            <defs>
                <clipPath id="clip2" clip-rule="evenodd">
                    <path d="${pathD}"/>
                </clipPath>
            </defs>
        </svg>`;
    
        var svg2 = `
        <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 ${circleOuterD} ${circleOuterD}">
            <defs>
                <clipPath id="clip3" clip-rule="evenodd">
                    <path d="${path2D}"/>
                </clipPath>
            </defs>
        </svg>`;
        var svgcontainer = this.productintroshadowroot.querySelector('#svgcontainer');
        if(!svgcontainer){
            var svgcontainer = document.createElement('DIV');
            svgcontainer.id="svgcontainer";
            svgcontainer.style='position:absolute;width:1px;height:1px;overflow:hidden;z-index:-2;opacity:0;';
            this.productintroshadowroot.appendChild(svgcontainer);
        }
        svgcontainer.innerHTML=svg + svg2;
    
        var over = this.productintroshadowroot.querySelector('#product-intro-over');
        if(over){
            this.productintroshadowroot.removeChild(over);
        }
        var over = document.createElement('DIV');
        over.id="product-intro-over";
        over.style=`position:absolute;top:0;left:0;z-index:9996;width:${vw}px;height:${vh}px;background:#fff;background: radial-gradient(ellipse at ${centerAtX}% ${centerAtY}%, rgba(224,224,224,0.85) 20%, rgba(224,224,224,0.2) 100%);clip-path:url(#clip2);pointer-events:painted;`;
        document.documentElement.style.setProperty("--overaftertop", circleOuterT+"px");
        document.documentElement.style.setProperty("--overafterleft", circleOuterL+"px");
        document.documentElement.style.setProperty("--overafterwidth", circleOuterD+"px");
        document.documentElement.style.setProperty("--overafterheight", circleOuterD+"px");
        
        this.productintroshadowroot.appendChild(over);
        return circleValues;
    }

    _getCircleValues(el){
        var viewportObj = this._getViewportValues();
        var vw = viewportObj.vw;
        var vh = viewportObj.vh;
    
        var circleValues = {}
        var ePos=this._elPositions(el);
    
        circleValues.diameter=ePos.diameter + 20; // pixels
        circleValues.radius= circleValues.diameter/2;
    
        circleValues.x=ePos.left + ePos.width/2; // pixels, CENTER!
        circleValues.y=ePos.top + ePos.height/2; // pixels, CENTER!
        circleValues.spaceAtLeft =circleValues.x - circleValues.radius;
        circleValues.spaceAtRight = (vw - circleValues.x) - circleValues.radius;
        circleValues.spaceAtTop = circleValues.y - circleValues.radius;
        circleValues.spaceAtBottom =(vh - circleValues.y) - circleValues.radius;
        return circleValues;
    }

    _floatTwo(x){
        return Math.round(x*100)/100;
    }

    _sensiblePositioning(messageElement, cVal){
        var viewportObj = this._getRealViewportValues();
        var vw = viewportObj.vw;
        var vh = viewportObj.vh;
        var mPos = this._elPositions(messageElement);
        var preferredVerticalPosition = "start";
        var preferredHorizontalPosition = "start";
        if(cVal.x <= vw/2){
            preferredHorizontalPosition = "end";
        }
        if(cVal.y <= vh/2){
            preferredVerticalPosition = "end";
        }
    
        this._setStart(messageElement, mPos.width, vw, cVal.spaceAtLeft - 10, cVal.spaceAtRight - 10, "horizontal", preferredHorizontalPosition);
        this._setStart(messageElement, mPos.height, vh, cVal.spaceAtTop - 10, cVal.spaceAtBottom - 10, "vertical", preferredVerticalPosition);
    
    }

    _elPositions(el){
        var elViewportOffset = el.getBoundingClientRect();
        var elPositionsObj={}
        
        elPositionsObj.top = this._floatTwo(this._getTop(el));
        elPositionsObj.left = this._floatTwo(this._getLeft(el));
        elPositionsObj.bottom = this._floatTwo(document.body.scrollHeight - elPositionsObj.top - elViewportOffset.height);
        elPositionsObj.right = this._floatTwo(document.body.scrollWidth - elPositionsObj.left - elViewportOffset.width);
    
        elPositionsObj.width = elViewportOffset.width;
        elPositionsObj.height = elViewportOffset.height;
    
        elPositionsObj.diameter = this._floatTwo(Math.sqrt((elPositionsObj.width*elPositionsObj.width)+(elPositionsObj.height*elPositionsObj.height)));
    
    
        return elPositionsObj;
    }

    _getTop(el){
        return el.offsetTop + (el.offsetParent && this._getTop(el.offsetParent));
    }

    _getLeft(el){
        return el.offsetLeft + (el.offsetParent && this._getTop(el.offsetParent));
    }

    _setStart(messageElement, messageSize, vs, startSpace, endSpace, direction, preferredPosition){
        var bodyScrollSize = document.body.scrollWidth;
        if(direction=="vertical"){
            startScroll = window.scrollY;
            bodyScrollSize = document.body.scrollHeight;
        }
    
        var startValue=0;
        var startScroll = window.scrollX;
        if(direction=="vertical"){
            startScroll = window.scrollY;
        }
    
        endSpace = vs + startScroll - bodyScrollSize + endSpace;
    
        
        if(preferredPosition == "start"){
            if(startSpace - startScroll > messageSize){
                startValue=startSpace - messageSize;
            }
            else if(endSpace + startScroll > messageSize){
                startValue=vs - endSpace + startScroll;
            }
        }
        else{
            if(endSpace + startScroll > messageSize){
                startValue=vs - endSpace + startScroll;
            }
            else if(startSpace - startScroll > messageSize){
                startValue=startSpace - messageSize;
            }
        }
        if(direction=="vertical"){
            messageElement.style.top=Math.min(startValue, bodyScrollSize-messageSize).toString() + "px";
        }
        else{
            messageElement.style.left=startValue.toString() + "px";
        }
    }

    _getRealViewportValues(){
        var ruler = document.createElement('DIV');
        ruler.style = 'width:100vw;height:100vh;position:fixed;top:0px;left:0;background:red;';
        document.body.appendChild(ruler);
        var viewportObj={vw:parseFloat(window.getComputedStyle(ruler).width), vh:parseFloat(window.getComputedStyle(ruler).height)};
        document.body.removeChild(ruler);
        return viewportObj;
    }

    _getViewportValues(){
        var viewportObj={vw:parseFloat(document.body.scrollWidth), vh:parseFloat(document.body.scrollHeight)};
        return viewportObj;
    }
    


}
