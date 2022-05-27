const socket = io("/");
const myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});
const clientSelfVideo = document.createElement("video");
const videoContainer = document.getElementById("video-container");
const peers = {};

// Muting the video of your own (rendered self)
clientSelfVideo.muted = true;

// Getting Video (from camera)
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(clientSelfVideo, stream);

    myPeer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userID) => {
      connectToNewUser(userID, stream);
    });
  });

socket.on("user-disconnected", (userID) => {
  if (peers[userID]) peers[userID].close();
});

myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

function connectToNewUser(userID, stream) {
  const call = myPeer.call(userID, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });

  peers[userID] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoContainer.append(video);
}
