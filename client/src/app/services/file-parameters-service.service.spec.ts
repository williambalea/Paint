import { TestBed } from '@angular/core/testing';
import { FileParametersServiceService } from './file-parameters-service.service';

describe('FileParametersServiceService', () => {
  let service = new FileParametersServiceService();
  beforeEach(() => {TestBed.configureTestingModule({providers: [FileParametersServiceService]});
                    service = TestBed.get(FileParametersServiceService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should return false to tempresize', () => {
    expect(service.getTempResize()).toBeFalsy();
  });

  it('setParameters should set temporary canvas width and height values to arguments passed to it', () => {
    const width = 10;
    const height = 10;
    service.setParameters(width, height);
    expect(service.tempx).toEqual(width);
    expect(service.tempy).toEqual(height);
  });

  it('changeParameters should set canvas width and height values to arguments passed to it', () => {
    const width = 10;
    const height = 10;
    service.changeParameters(width, height);
    expect(service.canvasWidth.value).toEqual(width);
    expect(service.canvasHeight.value).toEqual(height);
  });

  it ('should set parameters save drawing', () => {
    service.drawingName = 'allo';
    service.setParametersSaveDrawing('nom');
    expect(service.drawingName).toEqual('nom');
  });
});
