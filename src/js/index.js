function init(){
    console.log("Dom Loaded ", this);
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
}