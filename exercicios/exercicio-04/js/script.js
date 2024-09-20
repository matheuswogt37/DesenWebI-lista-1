function noCamera() {
    document.getElementById("video").classList.add("hidden");
    document.getElementById("upload").classList.remove("hidden");
}

function noVideo() {
    document.getElementById("video").classList.add("hidden");
    document.getElementById("canva").classList.remove("hidden");
}

async function accessCamera() {
    const constraints = {
        video: true, // ou { facingMode: 'user' } para câmera frontal
        audio: false,
    };
    if (navigator.mediaDevices?.getUserMedia) {
        // if (!navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                const video = document.getElementById("video");
                const canvas = document.getElementById("canvas");
                const context = canvas.getContext("2d");
                video.srcObject = stream;
                video.play();
                
                document
                .getElementById("btnPicture")
                .addEventListener("click", () => {
                    canvas.width = video.width;
                    canvas.height = video.height;
                    
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imgPath = canvas.toDataURL('img/imgTemp');
                    const photo = document.getElementById("photo");
                    photo.src = imgPath;
                    photo.style.display = 'block';
                    noVideo();
                    });
            })
            .catch((error) => {
                console.error("Error - ", error);
            });
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
    } else {
        console.log("navigator.mediaDevices.getUserMedia() is not supported");
        noCamera();
    }
}

accessCamera();
