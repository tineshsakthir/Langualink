// // import { useEffect, useRef, useState } from "react";
// // import { useSearchParams } from "react-router-dom";
// // import { Socket, io } from "socket.io-client";
// // import { Video, VideoOff, Mic, MicOff, Phone } from "lucide-react"; // Import icons

// // const URL = "https://langualink-1-1.onrender.com";

// // export const Room = ({
// //     name,
// //     language,
// //     localAudioTrack,
// //     localVideoTrack
// // }: {
// //     name: string,
// //     language: string,
// //     localAudioTrack: MediaStreamTrack | null,
// //     localVideoTrack: MediaStreamTrack | null,
// // }) => {
// //     const [searchParams, setSearchParams] = useSearchParams();
// //     const [lobby, setLobby] = useState(true);
// //     const [socket, setSocket] = useState<null | Socket>(null);
// //     const [sendingPc, setSendingPc] = useState<null | RTCPeerConnection>(null);
// //     const [receivingPc, setReceivingPc] = useState<null | RTCPeerConnection>(null);
// //     const [remoteVideoTrack, setRemoteVideoTrack] = useState<MediaStreamTrack | null>(null);
// //     const [remoteAudioTrack, setRemoteAudioTrack] = useState<MediaStreamTrack | null>(null);
// //     const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream | null>(null);
// //     const [isCameraOn, setIsCameraOn] = useState(true);
// //     const [isMicOn, setIsMicOn] = useState(true);

    
// //     // States for mute and camera toggle
// //     const [isMuted, setIsMuted] = useState(false);
// //     const [isCameraOff, setIsCameraOff] = useState(false);

// //     const remoteVideoRef = useRef<HTMLVideoElement>(null);
// //     const localVideoRef = useRef<HTMLVideoElement>(null);

// //     useEffect(() => {
// //         if (localVideoRef.current && localVideoTrack) {
// //             localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
// //             localVideoRef.current.play();
// //         }
// //     }, [localVideoTrack]);

// //     // Toggle Mute
// //     const toggleMic = () => {
// //         if (localAudioTrack) {
// //             localAudioTrack.enabled = !localAudioTrack.enabled;
// //             setIsMicOn(localAudioTrack.enabled);
// //         }
// //     };
    

// //     // Toggle Camera
// //     const toggleCamera = () => {
// //         if (localVideoTrack) {
// //             localVideoTrack.enabled = !localVideoTrack.enabled;
// //             setIsCameraOn(localVideoTrack.enabled);
// //         }
// //     };
    

// //     return (
// //         <div>
// //             <div style={{ position: 'relative', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
// //                 {/* Local Video (Small Video at Bottom Right) */}
// //                 <video 
// //                     autoPlay 
// //                     ref={localVideoRef} 
// //                     width={150}  
// //                     height={150}
// //                     id="caller"
// //                     style={{
// //                         position: 'absolute',
// //                         bottom: '20px',
// //                         right: '20px',
// //                         borderRadius: '10px',
// //                         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
// //                         objectFit: 'cover',
// //                         backgroundColor: 'black',
// //                         display: isCameraOff ? "none" : "block"  // Hide if camera is off
// //                     }} 
// //                 />

// //                 {/* Remote Video (Main Video) */}
// //                 <video 
// //                     autoPlay 
// //                     ref={remoteVideoRef} 
// //                     width={1000} 
// //                     height={600} 
// //                     id="callee"
// //                     style={{
// //                         borderRadius: '10px',
// //                         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
// //                         objectFit: 'cover',
// //                         backgroundColor: 'black'
// //                     }} 
// //                 />

// //                 {/* Lobby Message */}
// //                 {lobby ? <p style={{ position: 'absolute', top: '20px', textAlign: 'center' }}>Waiting to connect you to someone...</p> : null}

// //                 {/* Control Buttons */}
// //                 <div
// //                     style={{
// //                         position: "absolute",
// //                         bottom: "20px",
// //                         left: "50%",
// //                         transform: "translateX(-50%)",
// //                         display: "flex",
// //                         gap: "20px",
// //                     }}
// //                 >
// //                     {/* Camera Button */}
// //                     <button onClick={toggleCamera} style={buttonStyle}>
// //     {isCameraOn ? <Video size={30} /> : <VideoOff size={30} />}
// // </button>

// // <button onClick={toggleMic} style={buttonStyle}>
// //     {isMicOn ? <Mic size={30} /> : <MicOff size={30} />}
// // </button>


// //                     {/* Hang Up Button */}
// //                     <button style={{ ...buttonStyle, backgroundColor: "red" }}>
// //                         <Phone size={30} color="white" />
// //                     </button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // const buttonStyle = {
// //     backgroundColor: "#f0f0f0",
// //     border: "none",
// //     padding: "10px",
// //     borderRadius: "50%",
// //     cursor: "pointer",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// // };


// import { useEffect, useRef, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { Socket, io } from "socket.io-client";
// import { Video, VideoOff, Mic, MicOff, Phone } from "lucide-react"; // Import icons

// const URL = "http://localhost:3000";

// export const Room = ({
//     name,
//     language,
//     localAudioTrack,
//     localVideoTrack
// }: {
//     name: string,
//     language: string,
//     localAudioTrack: MediaStreamTrack | null,
//     localVideoTrack: MediaStreamTrack | null,
// }) => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [lobby, setLobby] = useState(true);
//     const [socket, setSocket] = useState<null | Socket>(null);
//     const [sendingPc, setSendingPc] = useState<null | RTCPeerConnection>(null);
//     const [receivingPc, setReceivingPc] = useState<null | RTCPeerConnection>(null);
//     const [remoteVideoTrack, setRemoteVideoTrack] = useState<MediaStreamTrack | null>(null);
//     const [remoteAudioTrack, setRemoteAudioTrack] = useState<MediaStreamTrack | null>(null);
//     const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream | null>(null);
//     const [isCameraOn, setIsCameraOn] = useState(true);
//     const [isMicOn, setIsMicOn] = useState(true);
    
//     const remoteVideoRef = useRef<HTMLVideoElement>(null);
//     const localVideoRef = useRef<HTMLVideoElement>(null);

//     useEffect(() => {
//         if (localVideoRef.current && localVideoTrack) {
//             localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
//             localVideoRef.current.play();
//         }
//     }, [localVideoTrack]);

    

//     // Toggle Mute
//     const toggleMic = () => {
//         if (localAudioTrack) {
//             localAudioTrack.enabled = !localAudioTrack.enabled;
//             setIsMicOn(localAudioTrack.enabled);
//         }
//     };
    
//     // Toggle Camera
//     const toggleCamera = () => {
//         if (localVideoTrack) {
//             localVideoTrack.enabled = !localVideoTrack.enabled;
//             setIsCameraOn(localVideoTrack.enabled);
//         }
//     };

//     return (
//         <div>
//             {/* Loading Screen */}
//             {!remoteVideoTrack && (
//                 <div style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100vw",
//                     height: "100vh",
//                     backgroundColor: "black",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     flexDirection: "column",
//                     color: "white",
//                     zIndex: 1000,
//                 }}>
//                     <img src="https://media.tenor.com/khzZ7-YSJW4AAAAM/cargando.gif" alt="Loading..." width={100} height={100} />
//                     <p>Connecting...</p>
//                 </div>
//             )}

//             <div style={{ position: 'relative', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 {/* Local Video */}
//                 <video 
//                     autoPlay 
//                     ref={localVideoRef} 
//                     width={150}  
//                     height={150}
//                     id="caller"
//                     style={{
//                         position: 'absolute',
//                         bottom: '20px',
//                         right: '20px',
//                         borderRadius: '10px',
//                         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
//                         objectFit: 'cover',
//                         backgroundColor: 'black',
//                         display: isCameraOn ? "block" : "none"
//                     }} 
//                 />

//                 {/* Remote Video */}
//                 <video 
//                     autoPlay 
//                     ref={remoteVideoRef} 
//                     width={1000} 
//                     height={600} 
//                     id="callee"
//                     style={{
//                         borderRadius: '10px',
//                         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
//                         objectFit: 'cover',
//                         backgroundColor: 'black'
//                     }} 
//                 />

//                 {/* Lobby Message */}
//                 {lobby ? <p style={{ position: 'absolute', top: '20px', textAlign: 'center' }}>Waiting to connect you to someone...</p> : null}

//                 {/* Control Buttons */}
//                 <div
//                     style={{
//                         position: "absolute",
//                         bottom: "20px",
//                         left: "50%",
//                         transform: "translateX(-50%)",
//                         display: "flex",
//                         gap: "20px",
//                     }}
//                 >
//                     {/* Camera Button */}
//                     <button onClick={toggleCamera} style={buttonStyle}>
//                         {isCameraOn ? <Video size={30} /> : <VideoOff size={30} />}
//                     </button>

//                     {/* Mic Button */}
//                     <button onClick={toggleMic} style={buttonStyle}>
//                         {isMicOn ? <Mic size={30} /> : <MicOff size={30} />}
//                     </button>

//                     {/* Hang Up Button */}
//                     <button style={{ ...buttonStyle, backgroundColor: "red" }}>
//                         <Phone size={30} color="white" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

const buttonStyle = {
    backgroundColor: "#f0f0f0",
    border: "none",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};


import CallTimer from "./CallTimer";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { Video, VideoOff, Mic, MicOff, Phone, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




const URL = "http://localhost:3000";  
// const URL = "https://langualink-1-2.onrender.com";


export const Room = ({
    name,
    language,
    localAudioTrack,
    localVideoTrack
}: {
    name: string,
    language: string,
    localAudioTrack: MediaStreamTrack | null,
    localVideoTrack: MediaStreamTrack | null,
}) => {
    

    const uuid = useSelector((state: any) => state.auth.userUuid);

    const navigate = useNavigate();
    
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const [lobby, setLobby] = useState(true);
    const [socket, setSocket] = useState<null | Socket>(null);
    const [sendingPc, setSendingPc] = useState<null | RTCPeerConnection>(null);
    const [receivingPc, setReceivingPc] = useState<null | RTCPeerConnection>(null);
    const [remoteVideoTrack, setRemoteVideoTrack] = useState<MediaStreamTrack | null>(null);
    const [remoteAudioTrack, setRemoteAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>();
    const localVideoRef = useRef<HTMLVideoElement>();
    const [isCallActive, setIsCallActive] = useState<boolean>(false);
    const [partnerUuid, setPartnerUuid] = useState<string | null>(null);
    const partner = {
        name: "Aarav Sharma",
        rating: 4.7,
        country: "India",
        interests: ["Music", "Travel", "Photography"]
    };
    


    useEffect(() => {
        if (remoteVideoTrack || remoteAudioTrack) {
            setIsCallActive(true);
        } else {
            setIsCallActive(false);
        }
    } ),[remoteVideoTrack,remoteAudioTrack];

    useEffect(() => {
        const socket = io(URL);
        // socket.emit("user-info", name, language);
        
        socket.emit("user-info",  uuid, name, language );

        socket.on('send-offer', async ({roomId ,partnerUuid}) => {
            console.log("sending offer");
            setLobby(false);
            const pc = new RTCPeerConnection();
            console.log(partnerUuid);
            setPartnerUuid(partnerUuid);
            console.log(partnerUuid + "partner uuid");
            


            

            setSendingPc(pc);
            if (localVideoTrack) {
                console.error("added tack");
                console.log(localVideoTrack)
                pc.addTrack(localVideoTrack)
            }
            if (localAudioTrack) {
                console.error("added tack");
                console.log(localAudioTrack)
                pc.addTrack(localAudioTrack)
            }

            pc.onicecandidate = async (e) => {
                console.log("receiving ice candidate locally");
                if (e.candidate) {
                   socket.emit("add-ice-candidate", {
                    candidate: e.candidate,
                    type: "sender",
                    roomId
                   })
                }
            }


            pc.onnegotiationneeded = async () => {
                console.log("on negotiation neeeded, sending offer");
                const sdp = await pc.createOffer();
                //@ts-ignore
                pc.setLocalDescription(sdp)
                socket.emit("offer", {
                    sdp,
                    roomId
                })
            }
        });

        socket.on("offer", async ({roomId, sdp: remoteSdp ,uuid}) => {
            console.log("received offer");
            setLobby(false);
            //get details
            console.log(uuid);
            const pc = new RTCPeerConnection();
            pc.setRemoteDescription(remoteSdp)
            const sdp = await pc.createAnswer();
            //@ts-ignore
            pc.setLocalDescription(sdp)
            const stream = new MediaStream();
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
            }

            setRemoteMediaStream(stream);
            // trickle ice 
            setReceivingPc(pc);
            window.pcr = pc;
            pc.ontrack = (e) => {
                alert("ontrack");
                // console.error("inside ontrack");
                // const {track, type} = e;
                // if (type == 'audio') {
                //     // setRemoteAudioTrack(track);
                //     // @ts-ignore
                //     remoteVideoRef.current.srcObject.addTrack(track)
                // } else {
                //     // setRemoteVideoTrack(track);
                //     // @ts-ignore
                //     remoteVideoRef.current.srcObject.addTrack(track)
                // }
                // //@ts-ignore
                // remoteVideoRef.current.play();
            }

            pc.onicecandidate = async (e) => {
                if (!e.candidate) {
                    return;
                }
                console.log("omn ice candidate on receiving seide");
                if (e.candidate) {
                   socket.emit("add-ice-candidate", {
                    candidate: e.candidate,
                    type: "receiver",
                    roomId
                   })
                }
            }

            socket.emit("answer", {
                roomId,
                sdp: sdp,
                uuid:uuid
            });
            setTimeout(() => {
                const track1 = pc.getTransceivers()[0].receiver.track
                const track2 = pc.getTransceivers()[1].receiver.track
                console.log(track1);
                if (track1.kind === "video") {
                    setRemoteAudioTrack(track2)
                    setRemoteVideoTrack(track1)
                } else {
                    setRemoteAudioTrack(track1)
                    setRemoteVideoTrack(track2)
                }
                //@ts-ignore
                remoteVideoRef.current.srcObject.addTrack(track1)
                //@ts-ignore
                remoteVideoRef.current.srcObject.addTrack(track2)
                //@ts-ignore
                remoteVideoRef.current.play();
                // if (type == 'audio') {
                //     // setRemoteAudioTrack(track);
                //     // @ts-ignore
                //     remoteVideoRef.current.srcObject.addTrack(track)
                // } else {
                //     // setRemoteVideoTrack(track);
                //     // @ts-ignore
                //     remoteVideoRef.current.srcObject.addTrack(track)
                // }
                // //@ts-ignore
            }, 5000)
        });

        socket.on("answer", ({roomId, sdp: remoteSdp}) => {
            setLobby(false);
            setSendingPc(pc => {
                pc?.setRemoteDescription(remoteSdp)
                return pc;
            });
            console.log("loop closed");

        })

        socket.on("lobby", () => {
            setLobby(true);
        })

        socket.on("add-ice-candidate", ({candidate, type}) => {
            console.log("add ice candidate from remote");
            console.log({candidate, type})
            if (type == "sender") {
                setReceivingPc(pc => {
                    if (!pc) {
                        console.error("receicng pc nout found")
                    } else {
                        console.error(pc.ontrack)
                    }
                    pc?.addIceCandidate(candidate)
                    return pc;
                });
            } else {
                setSendingPc(pc => {
                    if (!pc) {
                        console.error("sending pc nout found")
                    } else {
                        // console.error(pc.ontrack)
                    }
                    pc?.addIceCandidate(candidate)
                    return pc;
                });
            }
        })

        setSocket(socket)
    }, [partnerUuid])



    useEffect(() => {
        //get details of the partner

    },[partnerUuid])





    useEffect(() => {
        if (localVideoRef.current) {
            if (localVideoTrack) {
                localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
                localVideoRef.current.play();
            }
        }
    }, [localVideoRef])


    const toggleMic = () => {
        if (localAudioTrack) {
            localAudioTrack.enabled = !localAudioTrack.enabled;
            setIsMicOn(localAudioTrack.enabled);
        }
    };

    const toggleCamera = () => {
        if (localVideoTrack) {
            localVideoTrack.enabled = !localVideoTrack.enabled;
            setIsCameraOn(localVideoTrack.enabled);
        }
    };

    const handleDisconnect = () => {
        // if (socket) {
        //     socket.emit("disconnect");
        //     socket.disconnect();
        // }
        console.log('My uuid', uuid);
        console.log('partner uuid ',partnerUuid);

        // handle history 

                //handle rating

        navigate("/feedback", { state: { userUuid: partnerUuid} });



        // window.location.href = "/"; 





    }

    const buttonStyle = {
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        border: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
    };

    return (
        <div>
        <CallTimer isCallActive={isCallActive} />
        <div style={{ position: 'relative', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
            {/* Partner Details (Left Side) */}
            <div style={{
                position: 'absolute',
                left: '20px',
                top: '30%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                width: '250px'
            }}>
                <h3>{partner.name}</h3>
                <p><strong>Rating:</strong> ⭐ {partner.rating}</p>
                <p><strong>Country:</strong> {partner.country}</p>
                <p><strong>Interests:</strong></p>
                <ul>
                    {partner.interests.map((interest, index) => (
                        <li key={index}>{interest}</li>
                    ))}
                </ul>
            </div>
    
            {/* Remote Video */}
            <video
                autoPlay
                ref={remoteVideoRef}
                width={1000}
                height={600}
                id="callee"
                style={{
                    borderRadius: '10px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    objectFit: 'cover',
                    backgroundColor: 'black'
                }}
            />
    
            {/* Local Video */}
            <video
                autoPlay
                ref={localVideoRef}
                width={150}
                height={150}
                id="caller"
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    objectFit: 'cover',
                    backgroundColor: 'black',
                    display: isCameraOn ? "block" : "none"
                }}
            />
    
            {/* Lobby Message */}
            {lobby ? <p style={{ position: 'absolute', top: '20px', textAlign: 'center' }}>Waiting to connect you to someone...</p> : null}
    
            {/* Control Buttons */}
            <div style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "20px",
            }}>
                <button onClick={toggleCamera} style={buttonStyle}>
                    {isCameraOn ? <Video size={30} /> : <VideoOff size={30} />}
                </button>
                <button onClick={toggleMic} style={buttonStyle}>
                    {isMicOn ? <Mic size={30} /> : <MicOff size={30} />}
                </button>
                <button style={{ ...buttonStyle, backgroundColor: "red" }} onClick={handleDisconnect}>
                    <Phone size={30} color="white" />
                </button>
            </div>
        </div>
    </div>
    

    );
};


