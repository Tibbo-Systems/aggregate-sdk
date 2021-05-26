import BlueFunction from '../../../src/expression/function/color/BlueFunction';
import GreenFunction from '../../../src/expression/function/color/GreenFunction';
import RedFunction from '../../../src/expression/function/color/RedFunction';
import Color from 'color';
import ColorFunction from '../../../src/expression/function/color/ColorFunction';
import BrighterFunction from '../../../src/expression/function/color/BrighterFunction';
import DarkerFunction from '../../../src/expression/function/color/DarkerFunction';
import CommonsFixture from "../../tests/CommonsFixture";
import EvaluationEnvironment from "../../../src/expression/EvaluationEnvironment";

const ev = CommonsFixture.createTestEvaluator();
const environment = new EvaluationEnvironment();
describe('TestColorFunctions', () => {
  it('testBlueColorFunction', () => {
    let blueColor = new BlueFunction().execute(ev, environment, ['blue']);
    expect(blueColor).toBe(255);
    blueColor = new BlueFunction().execute(ev, environment, ['#0000FF']);
    expect(blueColor).toBe(255);
    blueColor = new BlueFunction().execute(ev, environment, ['rgb(0, 0, 255)']);
    expect(blueColor).toBe(255);
  });
  it('testGreenColorFunction', () => {
    let greenColor = new GreenFunction().execute(ev, environment, ['#00FF00']);
    expect(greenColor).toBe(255);
    greenColor = new GreenFunction().execute(ev, environment, ['lime']);
    expect(greenColor).toBe(255);
    greenColor = new GreenFunction().execute(ev, environment, ['rgb(0, 255, 0)']);
    expect(greenColor).toBe(255);
  });
  it('testRedColorFunction', () => {
    let redColor = new RedFunction().execute(ev, environment, ['#FF0000']);
    expect(redColor).toBe(255);
    redColor = new RedFunction().execute(ev, environment, ['red']);
    expect(redColor).toBe(255);
    redColor = new RedFunction().execute(ev, environment, ['rgb(255, 0, 0)']);
    expect(redColor).toBe(255);
  });
  it('testColorFunction', () => {
    const r = Color('orange').red();
    const g = Color('yellow').green();
    const b = Color('magenta').blue();

    const color = new ColorFunction().execute(ev, environment, [r, g, b]);

    expect(color).not.toBeNull();
    expect(color.red()).toBe(Color('orange').red());
    expect(color.green()).toBe(Color('yellow').green());
    expect(color.blue()).toBe(Color('magenta').blue());
  });
  it('testBrigherFunction', () => {
    const color = Color([223, 116, 113]);
    const expected = Color([255, 165, 161]);
    const brigher = new BrighterFunction().execute(ev, environment, [color]);

    expect(brigher).not.toBeNull();
    expect(brigher.red()).toBe(expected.red());
    expect(brigher.green()).toBe(expected.green());
    expect(brigher.blue()).toBe(expected.blue());
  });
  it('testDarkerFunction', () => {
    const color = Color('rgb(223,116,113)');
    const expected = Color([156, 81, 79]);
    const darker = new DarkerFunction().execute(ev, environment, [color]);

    expect(darker).not.toBeNull();
    expect(darker.red()).toBe(expected.red());
    expect(darker.green()).toBe(expected.green());
    expect(darker.blue()).toBe(expected.blue());
  });
});
