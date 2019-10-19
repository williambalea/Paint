import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenshotService {

  screenshotBase64(svg: SVGSVGElement): string {
    const b64start = 'data:image/svg+xml;base64,';
    const xml: string = new XMLSerializer().serializeToString(svg as Node);
    const svg64: string = btoa(xml);
    return b64start + svg64;
  }
}
