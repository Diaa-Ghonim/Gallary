import Info from '../../pages/info';
import { render } from '@testing-library/react';

describe('test info page', () => {
  it('should parse first render info component', () => {
    let { getByText } = render(<Info />);
    let p = getByText('info');
    expect(p.textContent).toBe('info');
  });
});
