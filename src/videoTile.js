import { useParticipant, useVideoTrack } from "@daily-co/daily-react-hooks";
import { memo, useEffect, useRef } from "react";
const VideoTile = (props) => {
  const { participantId } = props;
  const videoElement = useRef();
  const videoTrack = useVideoTrack(participantId);

  useEffect(() => {
    /*  The track is ready to be played. We can show video of the remote participant in the UI.*/
    if (!videoElement || !videoElement.current) return;
    const video = videoElement.current;
    if (!video || !videoTrack.persistentTrack) return;
    video.srcObject = new MediaStream([videoTrack.persistentTrack]);
  }, [videoTrack.persistentTrack, participantId]);

  return (
    <div>
      <video
        width={400}
        height={320}
        autoPlay
        muted
        playsInline
        ref={videoElement}
      />
    </div>
  );
};
export default memo(VideoTile);
