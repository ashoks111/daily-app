import {
  useDaily,
  useDailyEvent,
  useParticipantIds,
  useDevices,
  useParticipant,
} from "@daily-co/daily-react-hooks";

import { useNetwork } from "@daily-co/daily-react-hooks";

import { useCallback } from "react";
import VideoTile from "./videoTile";

const DailyComponent = (props) => {
  const { token } = props;
  const daily = useDaily();
  const participantIds = useParticipantIds();
  const state = daily?.meetingState();
  const devices = useDevices();
  const { microphones } = devices;
  const participant = useParticipant(participantIds[0]);

  const network = useNetwork({
    onNetworkConnection: (ev) => {
      console.log("on Network connection", ev);
    },
  });

  useDailyEvent(
    "joined-meeting",
    useCallback((ev) => {
      console.log("Joined meeting", ev);
    }, [])
  );

  useDailyEvent(
    "left-meeting",
    useCallback((ev) => {
      console.log("left meeting", ev);
    }, [])
  );

  const join = useCallback(() => {
    daily.join({ url: "https://bdom.daily.co/clearmix_test_room" });
  }, [daily]);
  const leave = useCallback(() => {
    daily.leave();
  }, [daily]);

  const toggleCamera = () => {
    console.log("daily participant", participant);
    daily.setLocalVideo(!participant.video);
  };

  const deviceSwitch = (id) => {
    daily.setInputDevicesAsync({ audioDeviceId: id, videoDeviceId: null });
  };
  return (
    <div>
      {state === "joined-meeting" ? (
        <>
          <button onClick={leave}>Leave</button>
          <button onClick={toggleCamera}>Toggle Camera</button>
        </>
      ) : (
        <button onClick={join}>Join</button>
      )}
      <h2>Meeting state : {state ?? "unknown"}</h2>
      <ul>
        {microphones.map((mic) => (
          <li
            key={mic.device.deviceId}
            style={{ backgroundColor: mic.selected ? "red" : "" }}
            onClick={() => deviceSwitch(mic.device.deviceId)}
          >
            {mic.device.label}
          </li>
        ))}
      </ul>
      {participantIds.map((participantId) => (
        <VideoTile key={participantId} participantId={participantId} />
      ))}
    </div>
  );
};
export default DailyComponent;
