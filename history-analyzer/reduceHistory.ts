import {
  historyTYPE,
  ytVideoTYPE,
  reducedYTVideoTYPE,
  reducedHistoryTYPE,
} from "../types/types";

export const reduceHistory = (history: historyTYPE): reducedHistoryTYPE => {
  //Função para reduzir o conteúdo do histórico, a função reduce é usada para remover vídeos repetidos da lista
  //e adicionar o atributo "views" para cada vídeo
  if (!history) {
    return [];
  }

  const reducedHistory = history
    .map((ytVideo: ytVideoTYPE) => {
      const reducedVideo: reducedYTVideoTYPE = {
        header: ytVideo.header,
        title: ytVideo.title,
        titleUrl: ytVideo.titleUrl,
        channelTitle: ytVideo.subtitles?.at(0)?.name || "No Title",
        channelTitleUrl: ytVideo.subtitles?.at(0)?.url || "No URL",
        time: [ytVideo.time],
        views: 0,
      };

      return reducedVideo;
    })
    .reduce(
      (
        currentVideoList: reducedHistoryTYPE,
        currentVideo: reducedYTVideoTYPE
      ) => {
        if (
          currentVideoList.some(
            (video: reducedYTVideoTYPE) => video.title === currentVideo.title
          )
        ) {
          const videoIndex = currentVideoList.findIndex(
            (video: reducedYTVideoTYPE) => video.title === currentVideo.title
          );
          currentVideoList[videoIndex].views++;
          currentVideoList[videoIndex].time.push(currentVideo.time[0]);
        } else {
          currentVideoList.push(currentVideo);
          currentVideoList[currentVideoList.length - 1].views++;
        }
        return currentVideoList;
      },
      []
    ).sort((videoA, videoB) => videoB.views - videoA.views);


  return reducedHistory;
};
