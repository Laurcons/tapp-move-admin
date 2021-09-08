import { FirstCasePipe } from './first-case.pipe';

describe('FirstCasePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstCasePipe();
    expect(pipe).toBeTruthy();
  });
});
