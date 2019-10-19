import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe';

describe('SafeUrlPipe', () => {

  // tslint:disable-next-line: prefer-const
  let sanitized: DomSanitizer;
  it('create an instance', () => {
    const pipe = new SafeUrlPipe(sanitized);
    expect(pipe).toBeTruthy();
  });
});
