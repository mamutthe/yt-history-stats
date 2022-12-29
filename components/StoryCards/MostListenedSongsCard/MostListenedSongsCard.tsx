import React, { useEffect, useState } from "react";
import { BaseCard } from "../BaseCard/BaseCard";
import { RoundedTransparentCard } from "../../RoundedTransparentCard/RoundedTransparentCard";
import Image from "next/image";
import ytChannelPic from "/workspaces/yt-history-stats/public/picExample.jpg";
import { reducedHistoryTYPE, reducedYTVideoTYPE } from "../../../types/types";
import Link from "next/link";

export function MostListenedSongsCard() {
  const [mostListenedSongs, setMostListenedSongs] =
    useState<reducedHistoryTYPE>([] as reducedHistoryTYPE);

  useEffect(() => {
    if (window.localStorage.getItem("mostListenedSongs") === null) {
      throw new Error("mostListenedSongs: no data found in localStorage");
    }
    setMostListenedSongs(
      JSON.parse(window.localStorage.getItem("mostListenedSongs") as string)
    );
  }, []);

  return (
    <BaseCard className="flex flex-col items-center justify-center px-4 py-1 space-y-4 bg-gradient-to-r from-pink-500 to-rose-700">
      <span className="mb-4 text-2xl font-medium text-white">
        Your most listened songs were
      </span>
      {mostListenedSongs.map((video) => (
        <Link
          className="w-full"
          key={video.title}
          href={video.titleUrl}
          target="_blank"
          rel="noreferrer"
        >
          <RoundedTransparentCard className="flex h-[5.5rem] w-full rounded-2xl">
            <Image
              className="h-full mr-auto rounded-l-2xl"
              alt="channel pic"
              src={ytChannelPic}
              width={0}
              height={0}
            />
            <span className="mr-auto text-xl font-medium text-center text-teal-900 trucate">
              {video.title}
            </span>
          </RoundedTransparentCard>
        </Link>
      ))}
    </BaseCard>
  );
}

export {};
