import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {

  // tslint:disable-next-line: prefer-const
  let sanitized: DomSanitizer;

  it('create an instance', () => {
    const pipe = new SafeHtmlPipe(sanitized);
    expect(pipe).toBeTruthy();
  });
});
