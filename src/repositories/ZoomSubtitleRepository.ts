const API_URL =
  "https://rpdyxad9y2.execute-api.ap-northeast-1.amazonaws.com/Prod/zoom/subtitles";

export interface IZoomSubtitleRepository {
  getPosition: (zoomTokenUrl: string) => Promise<number>;
  post: (
    zoomTokenUrl: string,
    sequence: number,
    message: string
  ) => Promise<boolean>;
}

export class ZoomSubtitleRepository implements IZoomSubtitleRepository {
  public async getPosition(zoomTokenUrl: string): Promise<number> {
    const res = await fetch(API_URL + "/seq", {
      method: "GET",
      headers: {
        "Zoom-Token": zoomTokenUrl,
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    if (res.status != 200) return Number(-1);
    return Number(await res.text());
  }

  public async post(
    zoomTokenUrl: string,
    sequence: number,
    message: string
  ): Promise<boolean> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Zoom-Token": zoomTokenUrl,
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        sequence: sequence,
        message: message,
      }),
    });
    if (res.status != 200) return false;
    return true;
  }
}
