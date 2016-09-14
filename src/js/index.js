
var _window,
    _duration  =   2000,
    _opacity   =   0.5,
    _left      =   100,
    _top       =   100,
    _width     =   900,
    _height    =   900;

var _durationInput,
    _opacityInput,
    _leftInput,
    _topInput,
    _widthInput,
    _heightInput;

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

function initWithOpenFin(){
    _durationInput  =   document.querySelector("#duration");
    _opacityInput   =   document.querySelector("#opacity");
    _leftInput      =   document.querySelector("#left");
    _topInput       =   document.querySelector("#top");
    _widthInput     =   document.querySelector("#width");
    _heightInput    =   document.querySelector("#height");

    document.querySelector("#resize").addEventListener('click', function(){
        _duration  =   parseFloat(_durationInput.value);
        _opacity   =   parseFloat(_opacityInput.value);
        _left      =   parseFloat(_leftInput.value);
        _top       =   parseFloat(_topInput.value);
        _width     =   parseFloat(_widthInput.value);
        _height    =   parseFloat(_heightInput.value);

        console.log("_window = ", _window);

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
        }, function(){
            console.log("Callback is called after size has finished animating");
        });

    });
}

function initNoOpenFin(){
    alert("OpenFin is not available - you are probably running in a browser.");
    // Your browser-only specific code to go here...
}