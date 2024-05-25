'use client'

import { useEffect, useMemo, useRef, useState } from "react"

import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface Media {
    id: string
    name: string
    key: string
    projectId: string
}
export default function VideoPlayer({
    media,
}: {
    media: Media,
}) {

    const videoRef = useRef<HTMLDivElement>(null);
    const [player, setPlayer] = useState<any>(null);

    const src = useMemo(() => `${process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN}/${media?.key}`, [media?.key]);

    useEffect(() => {

        const options = {
            controls: true,
            // fluid: true,
            html5: {
                vhs: {
                    overridenative: true,
                },
            },
            height: 720,
            width: 1080,
            responsive: true,
        }

        if (player === null && videoRef.current) {

            const videoElement = videoRef.current.appendChild(
                document.createElement('video-js'),
            );
            videoElement.classList.add('vjs-big-play-centered');

            const player: any = videojs(
                videoElement,
                options,
                () => {
                    setPlayer(player);
                    console.log('player started');

                    player.src({
                        type: 'video/mp4',
                        src
                    });

                    // player?.mobileUi(); // mobile ui #https://github.com/mister-ben/videojs-mobile-ui
                    player?.eme();

                    // @ts-ignore
                    this.on('keystatuschange', (event: any) => {
                        console.log('event: ', event);
                    });
                },
            );
        }


        return () => {
            if (player) {
                player.dispose();
                console.log('playuer disposed')
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div
                id="videoContainer"
                data-vjs-player
                ref={videoRef}
                className="relative group/v-container select-none rounded-md overflow-hidden w-full h-screen grid"
            >
                {/* <VideoPlayerControls
                    player={player}
                    onVideoEnd={onVideoEnd}
                    segments={segments}
                    setQuality={setQuality}
                    subtitles={subtitles}
                /> */}

            </div>
        </>
    )
}