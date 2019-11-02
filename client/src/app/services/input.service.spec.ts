// import { TestBed } from '@angular/core/testing';
// import { InputService } from './input.service';

// describe('InputService', () => {
//   beforeEach(() => TestBed.configureTestingModule({}));

//   it('should be created', () => {
//     const service: InputService = TestBed.get(InputService);
//     expect(service).toBeTruthy();
//   });

//   it('should get mouse position', () => {
//     const service: InputService = TestBed.get(InputService);
//     const result = service.getMouse();
//     expect(result).toBeDefined();
//   });

//   it ('shoul set mouse position', () => {
//     const service: InputService = TestBed.get(InputService);
//     const mouseEvent = {clientX: 1, clientY: 5 } ;
//     service.setMouseOffset(mouseEvent as MouseEvent);
//     expect(service.getMouse().x).toEqual(-352);
//     expect(service.getMouse().y).toEqual(0);
//   });

//   it('should change stamp angle to 360 if stampAngle = 0', () => {
//     const service: InputService = TestBed.get(InputService);
//     service.altPressed = true;
//     service.stampAngle = 0;
//     service.changeStampAngle(0);
//     expect(service.stampAngle).toEqual(360);
//   });

//   it('should change stamp angle to 360 if stampAngle < 0', () => {
//     const service: InputService = TestBed.get(InputService);
//     service.altPressed = true;
//     service.stampAngle = -5;
//     service.changeStampAngle(-5);
//     expect(service.stampAngle).toEqual(360);
//   });

//   it('should change stamp angle to 0 if stampAngle > 360', () => {
//     const service: InputService = TestBed.get(InputService);
//     service.altPressed = true;
//     service.stampAngle = 200;
//     service.changeStampAngle(200);
//     expect(service.stampAngle).toEqual(0);
//   });

//   it('should change stamp angle to 0 if stampAngle = 360', () => {
//     const service: InputService = TestBed.get(InputService);
//     service.altPressed = true;
//     service.stampAngle = 300;
//     service.changeStampAngle(60);
//     expect(service.stampAngle).toEqual(0);
//   });

//   it ('should not change increment value', () => {
//     const service: InputService = TestBed.get(InputService);
//     const increment = 0;
//     service.changeStampAngle(5);
//     expect(increment).toEqual(0);

//   });

//   it ('should save JSOM', () => {
//     const service: InputService = TestBed.get(InputService);
//     service.saveJSON('allo');
//     expect(service.json).toEqual('allo');
//   });

// });
