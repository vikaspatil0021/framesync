import React, { useEffect, useRef, useState } from 'react';
import {
  FullScreenCloseIcon,
  FullScreenOpenIcon,
  HighVolumeIcon,
  LowVolumeIcon,
  MutedVolumeIcon,
  PauseIcon,
  PlayIcon,
} from '../../../icons/videoPlayerIcons';


// import { segmentsHandler, updateTimeline } from '@/lib/createAndHandleSegments';
import { useRouter, useSearchParams } from 'next/navigation';
import formatTime from '@/lib/formatTime';

export default function VideoPlayerControls() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [player, setPlayer] = useState<HTMLVideoElement>(document.querySelector("#video-player") as HTMLVideoElement);

  useEffect(() => {

    const videoInstance = document.querySelector("#video-player") as HTMLVideoElement;
    setPlayer(videoInstance)
    console.log(videoInstance)
  }, [])
  const [playerPaused, setPlayerPaused] = useState<boolean>(true);
  const [volumeIconState, setVolumeIconState] = useState<string>('high');
  const [durationStartTime, setDurationStartTime] = useState<string>('0:00');
  const [durationEndTime, setDurationEndTime] = useState<string>('0:00');
  const [playBackSpeed, setPlayBackSpeed] = useState<string>('1x');
  const [isFullScreen, setFullScreen] = useState<boolean>(false);
  const [showCaption, setShowCaption] = useState<boolean>(false);
  const [captionBtnDisabled, setCaptionBtnDisabled] = useState<boolean>(false);
  const [isSkipDurationNext, setSkipDurationNext] = useState<boolean>(false);
  const [isSkipDurationBack, setSkipDurationBack] = useState<boolean>(false);
  const [qualityValue, setQualityValue] = useState(
    searchParams.get('quality') ?? '1080',
  );

  const volumeSliderRef = useRef<any>(null);

  // play / pause btn toggle
  function togglePlay() {
    if (player?.paused) {

      player?.play();
    } else {
      player?.pause();
    }
  }

  // // toggle voulme button
  // function toggleVolumeBtn() {
  //   player?.muted(!player?.muted());
  //   setVolumeIconState(player?.muted() ? 'muted' : 'high');

  //   if (player?.muted()) {
  //     player?.volume(0);
  //   } else {
  //     player?.volume(1);
  //   }
  // }

  // function volumeSliderHandler(e: any) {
  //   player?.volume(e?.target.value);
  //   player?.muted(e?.target.value === 0);
  // }

  // function volumeIconToggle() {
  //   let volState;
  //   const volume = player?.volume();

  //   if (player?.muted() || volume === 0) {
  //     volState = 'muted';
  //   } else if (volume < 0.5) {
  //     volState = 'low';
  //   } else {
  //     volState = 'high';
  //   }
  //   volumeSliderRef.current.value = volume;
  //   setVolumeIconState(volState);
  // }

  // // setduration after metadata is loaded
  function setDurationHandler() {
    const totalDuration = formatTime(player?.duration as number);
    setDurationEndTime(totalDuration);
  }

  // start and end duration handler
  function startTimeHandler() {
    const currentTime = formatTime(player?.currentTime as number);
    setDurationStartTime(currentTime);
  }

  // // playback speed control
  function playBackSpeedHandler() {
    let currentSpeed = player?.playbackRate as number;
    if (currentSpeed === 2) {
      currentSpeed = 0.5;
    } else {
      currentSpeed += 0.5;
    }
    player.playbackRate = currentSpeed;
    setPlayBackSpeed(`${currentSpeed}x`);
  }

  // // full screen handler
  function fullScreenHandler() {
    const fullScreen = document.fullscreenElement === null;

    const videoContainer = document.querySelector('#video-player');

    if (fullScreen && videoContainer) {
      videoContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullScreen(fullScreen);
  }


  // // handle key events
  function handleKeyEvents(e: any) {
    switch (e?.code) {
      case 'Space':
        togglePlay();
        e?.preventDefault();
        break;

      case 'KeyF':
        fullScreenHandler();
        e?.stopPropagation();
        break;

      case 'KeyP':
        playBackSpeedHandler();
        e?.stopPropagation();

        break;
      case 'KeyM':
        // toggleVolumeBtn();
        e?.stopPropagation();
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (player) {
      player.onplay = () => setPlayerPaused(false);
      player.onpause = () => setPlayerPaused(true);
      console.log('hey')
      //     player?.on('volumechange', volumeIconToggle);

      player.onloadedmetadata = () => {
        setDurationHandler();
      }


      player.ontimeupdate = () => {
        startTimeHandler()
      };

      //     player?.on('click', togglePlay);

      //     player?.on('ended', () => {
      //       setPlayerPaused(true);
      //       onVideoEnd();
      //     });

      document.addEventListener('keydown', handleKeyEvents);


      //     // segments handling events
      //     const timelineContainer = document.querySelector(
      //       '#timeline-container',
      //     ) as Element;
      //     player?.on('timeupdate', (e: any) => updateTimeline(e, player, segments));

      //     timelineContainer.addEventListener('click', (e: any) =>
      //       updateTimeline(e, player, segments),
      //     );
      //     timelineContainer.addEventListener('mousemove', (e: any) =>
      //       updateTimeline(e, player, segments),
      //     );
      //     timelineContainer.addEventListener('mouseover', (e: any) =>
      //       updateTimeline(e, player, segments),
      //     );
      //     timelineContainer.addEventListener('mouseout', (e: any) =>
      //       updateTimeline(e, player, segments),
      //     );
      //     timelineContainer.addEventListener('mousedown', (e: any) =>
      //       updateTimeline(e, player, segments),
      //     );

      //     document.addEventListener('mouseup', (e: any) =>
      //       updateTimeline(e, player, segments),
      //     );
    }
  }, [player]);

  return (
    <>

      <div
        className={` w-full transition-all py-1 bg-[#444]`}
      >
        {/* timeline segments */}
        <div
          id="timeline-container"
          className="group/timeline relative h-[5px] w-[calc(100%-20px)] cursor-pointer flex items-center transition-all mx-[10px] mb-2"
        >
          <div
            id="timeline"
            className="w-full h-full relative top-0 left-0 flex items-center justify-between"
          >
            <div
              id="timeline-label"
              className="absolute -top-8 text-[#f2f2f2] text-[14px] hidden group-hover/timeline:flex font-semibol px-1 rounded-md items-center gap-1 bg-[#555] whitespace-nowrap"
            >
              0:00
            </div>{' '}
            {/* timeline-label */}
          </div>
        </div>

        {/* //controls */}
        <div className="py-1 px-2 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            {/*//play-pause-btn*/}
            <button
              className="flex items-center justify-center outline-none"
              onClick={togglePlay}
            >
              {playerPaused ? (
                <PauseIcon className="h-5 w-5" />
              ) : (
                <PlayIcon className="h-5 w-5" />
              )}
            </button>

            {/*volume-container*/}
            <div className="flex gap-2 items-center group/volume-container relative">
              <button className="outline-none"
              // onClick={toggleVolumeBtn}
              >
                <HighVolumeIcon
                  className={volumeIconState === 'high' ? 'block' : 'hidden'}
                />
                <LowVolumeIcon
                  className={volumeIconState === 'low' ? 'block' : 'hidden'}
                />

                <MutedVolumeIcon
                  className={volumeIconState === 'muted' ? 'block' : 'hidden'}
                />
              </button>
              <input
                ref={volumeSliderRef}
                type="range"
                className="hidden sm:flex absolute left-[24px] cursor-pointer appearance-none h-[2px] w-0 scale-x-0 transition-all duration-200 group-hover/volume-container:scale-x-100 group-hover/volume-container:w-[55px] outline-none bg-[#f2f2f2] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[13px] [&::-webkit-slider-thumb]:h-[13px] [&::-webkit-slider-thumb]:bg-[#ff2a2a] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full"
                name="mute-btn-range"
                min="0"
                max="1"
                step="any"
                defaultValue="1"
              // onChange={volumeSliderHandler}
              />
            </div>

          </div>


          {/* duration-container*/}
          <div className="text-[13px]">
            <span className="duration-start-time">{durationStartTime} </span>/
            <span className="duration-end-time"> {durationEndTime}</span>
          </div>

          <div className="flex gap-2 items-center">
            {/* speed-btn */}
            <button
              className="flex items-center justify-center text-[13px] w-8 outline-none"
              onClick={playBackSpeedHandler}
            >
              {playBackSpeed}
            </button>

            {/* full-screen-btn */}
            <button className="outline-none"
              onClick={fullScreenHandler}
            >
              {isFullScreen ? <FullScreenCloseIcon /> : <FullScreenOpenIcon />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
