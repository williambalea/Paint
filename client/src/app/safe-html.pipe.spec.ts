import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {

  let sanitized: DomSanitizer;

  it('create an instance', () => {
    const pipe = new SafeHtmlPipe(sanitized);
    expect(pipe).toBeTruthy();
  });
});
