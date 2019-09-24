import { ColorService } from 'src/app/services/color/color.service';
import { ColorPickerComponent } from './color-picker.component';

const colorService: ColorService = new ColorService();
const component: ColorPickerComponent = new ColorPickerComponent(colorService);
describe('ColorPickerComponent', () => {
  it('Should initialise attributes correctly', () => {
    expect(component).toBeDefined();
  });
});
