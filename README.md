# PrjMap


![alt text](/prjmap.gif "demo")


PrjMap uses the wonderful MapTasticJS lib: https://github.com/glowbox/maptasticjs

This tool allows projection mapping [key-stone] of multiple DOM Div objects. The tool will load, display and save the last position of the mapped object between browser sessions.

## Usage

- clone this repo
- navigate to ```PrjMAP``` folder 
- put images/videos [jepg, jpg, png, mp4, mov,avi] in the 
``` media ``` folder [name can be edited in js]
- load ```index.html``` 
- the two objects are the two divs that will be populated with img/vids after load
- click the button to load all/some files 

### Slides 

- use ```left/right``` arrow keys to change images 
- press ```p``` to start auto slide show [time interval can be edited in ```gallery.js```]

### Keystoning/projection mapping 

[taken from MapTastic docs]
- press ```Shift+z``` to Toggle [on/off] edit mode and reposition and keystone the divs

 ### In Edit Mode

- click or drag select and move quads/corner points
- ```SHIFT + drag``` move selected quad/corner point with 10x precision
- ```ALT + drag``` rotate and scale selected quad
- ```SHIFT + ALT + drag``` rotate and scale selected quad with 10x precision.
- Arrow keys move selected quad/corner point
- ```SHIFT + Arrow keys``` move selected quad/corner point by 10 pixels
- ```ALT + Arrow keys``` rotate and scale selected quad
- ```s``` Solo or unsolo the selected quad (hides all others). This helps to adjust quads when corner points are very close together.
- ```c``` Toggle mouse cursor crosshairs
- ```b``` Toggle display bounds/metrics
- ```r``` Rotate selected layer 90 degrees clockwise
- ```h``` Flip selected layer horizontally
- ```v``` Flip selected layer vertically


___

[Maintained by Ariel Noyman](http://arielnoyman.com)

