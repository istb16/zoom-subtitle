import {
  IZoomSubtitleRepository,
  ZoomSubtitleRepository,
} from "./ZoomSubtitleRepository";

export interface IRepositories {
  zoomSubtitleRepository: IZoomSubtitleRepository;
}

export const repositories: IRepositories = {
  zoomSubtitleRepository: new ZoomSubtitleRepository(),
};
