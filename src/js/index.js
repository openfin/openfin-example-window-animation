
var _window,
    _state,
    _duration  =   2000,
    _opacity   =   0.85,
    _left      =   100,
    _top       =   100,
    _width     =   900,
    _height    =   900;

var _durationInput,
    _opacityInput,
    _leftInput,
    _topInput,
    _widthInput,
    _heightInput,
    _interruptInput;

document.addEventListener("DOMContentLoaded", function(){
    init();
});

function init(){
    /* Code common to both OpenFin and browser to go above.
     Then the specific code for OpenFin and browser only to be
     targeted in the try/catch block below.
     */
    try{
        fin.desktop.main(function(){
            _window = fin.desktop.Window.getCurrent();
            initWithOpenFin();
        })
    }catch(err){
        initNoOpenFin();
    }
};

function finishCallback(){
    console.log("finished ");
    _state.innerHTML = "Animation finished";
};

function errorCallback(){
    console.log("Errored ");
    _state.innerHTML = "Animation error";
};



function runAnimation(randomise){
    if (randomise){
        _durationInput.value = parseInt( parseFloat(_durationInput.min) + ((Math.random() * parseFloat(_durationInput.max))));
        //_opacityInput.value = parseInt( parseFloat(_opacityInput.min) + (Math.random() * parseFloat(_opacityInput.max)));
        _leftInput.value = parseInt( parseFloat(Math.random() * parseFloat(_leftInput.max)));
        _heightInput.value = parseInt( parseFloat((Math.random() * parseFloat(_heightInput.max))) );
    }

    _duration  =   parseFloat(_durationInput.value);
    _opacity   =   parseFloat(_opacityInput.value);
    _left      =   parseFloat(_leftInput.value);
    _top       =   parseFloat(_topInput.value);
    _width     =   parseFloat(_widthInput.value);
    _height    =   parseFloat(_heightInput.value);
    _interrupt =   _interruptInput.checked;

    console.log("_duration ", _duration);
    console.log("_opacity ", _opacity);
    console.log("_left ", _left);
    console.log("_top ", _top);
    console.log("_height ", _height);
    console.log("_width ", _width);
    console.log("_interrupt ", _interrupt);

    _state.innerHTML = "Animation starting";

    _window.animate({
            opacity:  {
                opacity: _opacity,
                duration: _duration
            },
            position: {
                left: _left,
                top: _top,
                duration: _duration
            },
            size: {
                width: _width,
                height: _height,
                duration: _duration
            }
        },
        {
            interrupt: _interrupt // This option interrupts the current animation. When false it pushes this animation onto the end of the animation queue.
        },
        finishCallback, errorCallback);
}

function initWithOpenFin(){
    _state          =   document.querySelector("#state");
    _durationInput  =   document.querySelector("#duration");
    _opacityInput   =   document.querySelector("#opacity");
    _leftInput      =   document.querySelector("#left");
    _topInput       =   document.querySelector("#top");
    _widthInput     =   document.querySelector("#width");
    _heightInput    =   document.querySelector("#height");
    _interruptInput =   document.querySelector("#interrupt");

    document.querySelector("#resize").addEventListener('click', function(){
        runAnimation(false);
    });

    document.querySelector("#random").addEventListener('click', function(){
        runAnimation(true);
    });


}

function initNoOpenFin(){
    alert("OpenFin is not available - you are probably running in a browser.");
}