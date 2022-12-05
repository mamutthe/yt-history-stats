export interface ytVideoTYPE {
  header: string;
  title: string;
  titleUrl?: string;
  subtitles?: Array<{}>;
  time: string;
  products: string[];
  details?: Array<{
    name: string;
  }>;
  activityControls: string[];
}

export type historyTYPE = ytVideoTYPE[];
