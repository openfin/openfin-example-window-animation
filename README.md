# OpenFin How To: Animate a window

The use of animations in your windows can really bring your applications to life. The OpenFin Runtime provides a very simple API for creating complex, beautiful window animations.

You may:

- Animate position
- Animate size
- Animate opacity
- Interrupt animations
- Combine animations
- Get notified when an animation is completed

### Position
To animate a window from the top-left corner of the screen to (400, 400) over 2000 milliseconds,

```
wnd.moveTo(0, 0);
wnd.animate({
	position:  {
	left: 400,
	top: 400,
	duration: 2000
	}
});
```


### Size
To change the size of a window from 300px x 300px to 600px x 600px over 2000 milliseconds.

```
wnd.resizeTo(300, 300);
 
wnd.animate({
    size:  {
        width: 600,
        height: 600,
        duration: 2000
    }
});
```

### Opacity
To change the opacity of a window from 1 (opaque) to 0 (transparent).

```
wnd.updateOptions({
    opacity: 1
});
 
wnd.animate({
    opacity:  {
        opacity: 0
        duration: 2000
    }
});
```
### Interrupt animations
If you want to perform multiple animations, you may need to interrupt the previous animation so that the next one can begin. To do so you must set the interrupt option for the last animation to true.

```
wnd.updateOptions({
    opacity: 1
});
 
wnd.animate({
    opacity:  {
        opacity: 0
        duration: 2000
    }
});
 
wnd.animate({
    opacity:  {
        opacity: 0
        duration: 2000
    }
}, {
    interrupt: true
});
```

Otherwise, if interrupt is set to false, the animation will be queued and completed only after the current animation and all other previous queued animations have completed.

### Combine animations
The runtime also allows you to perform multiple animations at the same time. For example, to animate all three animations.

```
wnd.animate({
    opacity:  {
        opacity: 0
        duration: 2000
    },
    position: {
        left: 300,
        top: 300,
        duration: 4000
    },
    size: {
        width: 600,
        height: 600,
        duration: 8000
    }
});

```

### Get notified when an animation is completed
The animate method allows you to specify a callback as the third argument. This callback is invoked after the longest animation has completed or if the animate method was interrupted.

```
wnd.animate({
    opacity:  {
        opacity: 0
        duration: 2000
    },
    position: {
        left: 300,
        top: 300,
        duration: 4000
    },
    size: {
        width: 600,
        height: 600,
        duration: 8000
    }
}, function () {
    console.log("Callback is called after size has finished animating");
});

```

### Install and run

This is a vanilla JavaScript app free from frameworks and build systems, though you may add them as you see fit.

It has a simple Node/Express server for local development.

Clone the repo and run

```
$ npm install
```

Navigate to the root folder where 'server.js' resides in your command line tool and run:

```
$ npm start
```

This should start a simple Node server at [http://localhost:9071](http://localhost:9071), then launch the app using the [node openfin launcher](https://www.npmjs.com/package/openfin-launcher).

## License
MIT

The code in this repository is covered by the included license.  If you run this code, it may call on the OpenFin RVM or OpenFin Runtime, which are subject to OpenFin’s [Developer License](https://openfin.co/developer-agreement/). If you have questions, please contact support@openfin.co”

## Support
Please enter an issue in the repo for any questions or problems. Alternatively, please contact us at support@openfin.co 
