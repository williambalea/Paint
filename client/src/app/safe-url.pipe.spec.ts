import { SafeUrlPipe } from './safe-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('SafeUrlPipe', () => {

  let sanitized: DomSanitizer;
  it('create an instance', () => {
    const pipe = new SafeUrlPipe(sanitized);
    expect(pipe).toBeTruthy();
  });
});
