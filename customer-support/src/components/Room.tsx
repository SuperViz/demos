import { FormElements , MousePointers, Realtime, VideoConference, useRealtime } from '@superviz/react-sdk';
import { useEffect, useRef } from "react";
import { VideoConferenceStyles } from "src/assets//constants/VideoConferenceStyles";
import { Form } from './Form';


export default function Room({ participantId }: { participantId: string }) {
  const stopScrollListener = useRef(false);
  const scrolling = useRef<number>(0);
  const { publish, subscribe } = useRealtime();

  // the following logic syncs the scroll between every user in the room
  const shouldStop = () => stopScrollListener.current;
  useEffect(()=> {
    scrolling.current = new Date().getTime();

    document.body.addEventListener('scroll', (e: Event) => {
      if (shouldStop()) {
        if (new Date().getTime() - scrolling.current >= 100) {
          stopScrollListener.current = false;
        }

        return;
      }

      publish('scroll', (e.target as HTMLBodyElement).scrollTop);
    });

    subscribe('scroll', (e: any)=> {
      if (e.participantId === participantId) return;

      scrolling.current = new Date().getTime();
      stopScrollListener.current = true;
      document.body.scrollTop = e.data;
    });
  });

  return (
    <>
      <FormElements fields={['participant-name', 'company-name', 'participant-role', 'participant-email', 'participant-language-en', 'participant-language-es']}/>
      <MousePointers elementId='form-container'/>
      <Realtime />
      <VideoConference 
        participantType='host'
        offset={{
          top: -8,
          right: -8,
          bottom: 0,
          left: 0
        }}
        styles={VideoConferenceStyles}
      /> 

      <div className="page-wrapper">
        <main>
          <Form />
        </main>
      </div>
      
    </>
  );
}