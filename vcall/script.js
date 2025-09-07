const joinBtn = document.getElementById("joinBtn");
const nameInput = document.getElementById("nameInput");
const welcomeDiv = document.getElementById("welcome");
const videosDiv = document.getElementById("videos");
const localVideo = document.getElementById("localVideo");
const remoteVideos = document.getElementById("remoteVideos");
const controlsDiv = document.getElementById("controls");
const muteBtn = document.getElementById("muteBtn");
const cameraBtn = document.getElementById("cameraBtn");

const chatContainer = document.getElementById("chatContainer");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

let localStream;
const peers = {};
let isMuted = false;
let cameraOff = false;

const ROOM_ID = "FamilyRoomNepal2025"; // fixed room
const peer = new Peer(undefined, { host:'peerjs.com', port:443, secure:true });

peer.on('open', id => console.log('My Peer ID:', id));

joinBtn.onclick = async () => {
  if(!nameInput.value) { alert("Enter your name"); return; }

  welcomeDiv.style.display = "none";
  videosDiv.style.display = "flex";
  controlsDiv.style.display = "block";
  chatContainer.style.display = "block";

  localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:true});
  localVideo.srcObject = localStream;

  remoteVideos.appendChild(localVideo);

  // Receive calls
  peer.on('call', call => {
    call.answer(localStream);
    const remoteVid = document.createElement('video');
    remoteVid.autoplay = true;
    call.on('stream', stream => { remoteVid.srcObject = stream; });
    remoteVideos.appendChild(remoteVid);
  });

  // Receive chat messages
  peer.on('connection', conn => {
    conn.on('data', msg => addMessage(msg));
  });

  // Connect to room peer (fixed room)
  const roomPeer = new Peer(ROOM_ID, { host:'peerjs.com', port:443, secure:true });
  roomPeer.on('open', () => {
    roomPeer.listAllPeers(peersInRoom => {
      peersInRoom.forEach(peerId => {
        if(peerId !== ROOM_ID && peerId !== peer.id) callPeer(peerId);
      });
    });
  });

  // Controls
  muteBtn.onclick = () => {
    isMuted = !isMuted;
    localStream.getAudioTracks()[0].enabled = !isMuted;
    muteBtn.textContent = isMuted ? "Unmute" : "Mute";
  };

  cameraBtn.onclick = () => {
    cameraOff = !cameraOff;
    localStream.getVideoTracks()[0].enabled = !cameraOff;
    cameraBtn.textContent = cameraOff ? "Turn Camera On" : "Turn Camera Off";
  };

  sendBtn.onclick = sendMessage;
  chatInput.addEventListener("keypress", e => { if(e.key==='Enter') sendMessage(); });
};

function callPeer(peerId) {
  const call = peer.call(peerId, localStream);
  const remoteVid = document.createElement('video');
  remoteVid.autoplay = true;
  call.on('stream', stream => { remoteVid.srcObject = stream; });
  remoteVideos.appendChild(remoteVid);

  const conn = peer.connect(peerId);
  conn.on('open', () => { peers[peerId] = conn; });
}

function sendMessage() {
  const msg = nameInput.value + ": " + chatInput.value;
  addMessage(msg);
  for(let pid in peers) peers[pid].send(msg);
  chatInput.value = "";
}

function addMessage(msg) {
  const div = document.createElement("div");
  div.textContent = msg;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
