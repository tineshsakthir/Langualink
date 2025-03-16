import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { Room } from "./Room";
import { useSelector, useDispatch } from "react-redux";


export const Landing = () => {
    const name = useSelector((state: any) => state.auth.firstName);
    console.log(name);
    const [language, setLanguage] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [joined, setJoined] = useState(false);
    

    useEffect(() => {
        setLanguage("Tamil");
        setJoined(true);
    }, []);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        // MediaStream
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play();
        // MediaStream
    }

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam()
        }
    }, [videoRef]);

    if (!joined) {

        return <div>
            <video autoPlay ref={videoRef}></video>
            <p>Select a Room:</p>
            {["Tamil", "English", "Spanish", "Arabic", "Hindi"].map((room) => (
                <button
                    key={room}
                    onClick={() => setLanguage(room)}
                    style={{
                        backgroundColor: name === room ? "blue" : "white",
                        color: name === room ? "white" : "black",
                        padding: "8px 16px",
                        margin: "5px",
                        border: "1px solid black",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    {room}
                </button>
            ))}
            <button onClick={() => {
                setJoined(true);
            }}>Join</button>
        </div>
    }


    return <Room name={name} language={language} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
}