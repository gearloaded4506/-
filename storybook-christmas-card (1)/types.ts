
export interface PageContent {
  image: string | null;
  text: string;
}

export interface CardData {
  cover: string | null;
  innerPage: PageContent;
  audio: string | null;
  usePresetMusic: boolean;
}
