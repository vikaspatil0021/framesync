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

    // const videoRef = useRef<HTMLDivElement>(null);
    // const [player, setPlayer] = useState<any>(null);

    const src: string = useMemo(() => `${process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN}/${media?.key}`, [media?.key]);
    // console.log(src)
    // useEffect(() => {

    //     const options = {
    //         controls: true,
    //         fluid: true,
    //         fill:true,
    //         html5: {
    //             vhs: {
    //                 overridenative: true,
    //             },
    //         },
    //         // height: 20,
    //         // width: 1080,
    //         // responsive: true,
    //         // aspectRatio: '16:9'
    //     }

    //     if (player === null && videoRef.current) {

    //         const videoElement = videoRef.current.appendChild(
    //             document.createElement('video-js'),
    //         );

    //         const player: any = videojs(
    //             videoElement,
    //             options,
    //             () => {
    //                 setPlayer(player);
    //                 console.log('player started');

    //                 player.src({
    //                     type: 'video/mp4',
    //                     src
    //                 });

    //                 // player?.mobileUi(); // mobile ui #https://github.com/mister-ben/videojs-mobile-ui
    //                 player?.eme();

    //                 // @ts-ignore
    //                 this.on('keystatuschange', (event: any) => {
    //                     console.log('event: ', event);
    //                 });
    //             },
    //         );
    //     }


    //     return () => {
    //         if (player) {
    //             player.dispose();
    //             console.log('playuer disposed')
    //         }
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <>
            <div id='video-player' className="relative w-full max-h-[550px]">
                <video className="video" controls style={{ height: "auto", width: "100%", maxHeight: "550px", backgroundColor: 'black', aspectRatio: "16/9" }}>
                    <source
                        src={src}
                        type="video/mp4"
                    />
                </video>
            </div>

        </>
    )
}