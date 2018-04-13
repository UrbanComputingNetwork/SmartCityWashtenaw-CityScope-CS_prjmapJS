var slideIndex = 0;
var playing = true;
var currentTimeout;


// make the first div
$('<div/>', {
    id: 'keystoneContainer',
}).appendTo('body');
//make second div
$('<div/>', {
    id: 'keystoneContainer2',
}).appendTo('body');
//run mapping class for both divs
Maptastic("keystoneContainer", "keystoneContainer2")




//---------------------------------------------------------------------- 
// TODO: hide chanel variable once it is working
window.document.channel = new BroadcastChannel('channel');
window.document.channel.onmessage = function (m) {
  
  let data = JSON.parse(m.data);
  
  switch(data.command) {
    case 'increment':
        console.log('i wanna increment');
        plusSlides(1); // TODO: error handle this
      break;
    case 'decrement':
        console.log('i wanna decrement');
        plusSlides(-1); // TODO: error handle this
      break;
    case 'sync':
        console.log('sync with slide No:'+ slideIndex);
        slideIndex = data.id;
        showSlides(slideIndex);
        break;
    default :
        console.log('undefined command:' + data.command);
  }

}

const sendContianer = document.querySelector('#send');
sendContianer.addEventListener('click', e => {
  let incMessage = {};
  incMessage.command = 'increment';
  window.document.channel.postMessage(JSON.stringify(incMessage));
});


//---------------------------------------------------------------------- 

//full screen when CTRL+F is pressed

function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen ||
        doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}


function handleFileSelect(evt) {
    // FileList object
    var files = evt.target.files;
    // files is a FileList of File objects. List some properties.
    var output = [];
    var video_ids = [];
    //loop through slected files 
    for (var i = 0, f; f = files[i]; i++) {

        //if img file ext.
        if (f.name.slice(-3) != "mov" && f.name.slice(-3) != "MOV" && f.name.slice(-3) != "mp4" && f.name.slice(-
            3) != "MP4" && f.name.slice(-3) != "avi" && f.name.slice(-3) != "AVI") {
            output.push("<div class=\" mySlides fade\" ><img src=\" media/" + escape(f.name) + "\" height=\" 100%\" width= \"100%\" ></div>");

        } else {

            //if movie file
            output.push(
                "<div class=\"mySlides fade\"><video controls=\"controls\" poster=\"MEDIA\" preload=\"true\" loop=\"true\" autoplay=\"true\" src=\"media/" +
                escape(f.name) + "\" id=\"video" + i +
                "\" height=\"100%\" width= \"100%\"></video></div>");
            video_id = "video" + i;
            video_ids.push(video_id);
        }
    }
    // put slides in first div
    document.getElementById('keystoneContainer').innerHTML = output.join('');
    showSlides(0);
}

//feed the inner div with the relevant slide content 
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    //hide all slides divs  at start 
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    //resert roll to 1 at end 
    if (n == slides.length) {
        slideIndex = 1
    }
    //avoid slide zero
    if (n < 1) {
        slideIndex = 1
    }
    //set this slide 
    thisSlide = slides[(slideIndex - 1)];
    //reset video at each slide to avoid differences in divs 
    if (thisSlide.querySelector('video')) {
        console.log('video');
        // thisSlide.querySelector('video').load();
        thisSlide.querySelector('video').currentTime = 0;
    }
    thisSlide.style.display = "block";
    $('#keystoneContainer2').html($(thisSlide).clone());
}

//on click go to next/prev slide 
function plusSlides(n) {
    showSlides(slideIndex += n);
    // send meesage here
}

//autoplay when press P
function autoSlideShow() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    //hide all slides divs  at start 
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++
    //resert roll to 1 at end 
    if (slideIndex == slides.length) {
        slideIndex = 1
    }
    //avoid slide zero
    if (slideIndex < 1) {
        slideIndex = 1
    }
    //set this slide 
    thisSlide = slides[(slideIndex - 1)];

    //reset video at each slide to avoid differences in divs 
    if (thisSlide.querySelector('video')) {
        console.log('video');
        thisSlide.querySelector('video').load();
    }
    thisSlide.style.display = "block";
    $('#keystoneContainer2').html($(thisSlide).clone());

    if (playing == true) {
        currentTimeout = setTimeout(autoSlideShow, 1000); // Change image every x miliseconds
    }
}

function togglePlayPause() {
    if (playing == true) {
        playing = false;
        clearTimeout(currentTimeout);
    } else {
        playing = true;
        autoSlideShow();
    }
}

/////////////////////////////////////
// INTERACTION
/////////////////////////////////////

// key listener 
document.addEventListener("keydown", function (e) {
    if (e.keyCode == 70) {
        toggleFullScreen();
    }
}, false);

//interaction and loading files 
document.getElementById('files').addEventListener('change', handleFileSelect, false);
document.body.addEventListener('keydown', (event) => {
    const keyName = event.key;
    let message = {};
    message.command = 'sync';
    if (keyName == 'ArrowLeft') {
        plusSlides(-1);
        message.id = slideIndex;
        window.document.channel.postMessage(JSON.stringify(message));
    } else if (keyName == 'ArrowRight' || keyName == 'b') {
        plusSlides(1);
        message.id = slideIndex;
        window.document.channel.postMessage(JSON.stringify(message));
    } else if (keyName == 'p') {
        togglePlayPause();
    }
}, false);
