var storage = firebase.storage();
var storageRef = storage.ref();

const constraints = {
    audio: false,
    video: { 
        width: 480, 
        height: 640, 
        facingMode: { exact: "environment" }, 
        // frameRate: { ideal: 20, max: 30 } 
    }
};

const video = document.querySelector("#video");
const img = document.querySelector("#img");
// const btn = document.querySelector("#capture");
const canvas = document.createElement("canvas");

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
});

video.onclick = function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    // Other browsers will fall back to image/png
    img.src = canvas.toDataURL("image/webp");
    $("#img").show();
    $('#video').hide();
    //downloadURI(img.src,Date.now()+'.png');
    
    canvas.toBlob((blob)=>{
        let fileName = moment().format('YYMMDD_hhmmss_SSS')+'.jpeg'
        storageRef.child('image/'+fileName).put(blob);
    })
};

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
    alert(name);
  }