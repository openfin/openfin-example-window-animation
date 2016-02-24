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
            initWithOpenFin();
        })
    }catch(err){
        initNoOpenFin();
    }
};

function initWithOpenFin(){
    alert("OpenFin is available");
    // Your OpenFin specific code to go here...
}

function initNoOpenFin(){
    alert("OpenFin is not available - you are probably running in a browser.");
    // Your browser-only specific code to go here...
}