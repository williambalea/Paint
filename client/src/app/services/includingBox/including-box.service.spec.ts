import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SelectorService } from '../selector/selector.service';
import { IncludingBoxService } from './including-box.service';

class RendererMock {
  createElement(): void {return; }
  //mettre les fonctions ici
}
// tslint:disable-next-line: max-classes-per-file
class SelectorServiceServiceMock {
  //mettre les fonctions ici
}

describe('IncludingBoxService', () => {
  let service: IncludingBoxService;
  // let renderer: Renderer2;
  // let selectorService: SelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Renderer2,
        SelectorService,
        IncludingBoxService,
        { provide: Renderer2, useClass: RendererMock },
        { provide: SelectorService, useClass: SelectorServiceServiceMock },
      ],
    }).compileComponents();
    service = TestBed.get(IncludingBoxService);
    // renderer = TestBed.get(Renderer2);
    // selectorService = TestBed.get(SelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
