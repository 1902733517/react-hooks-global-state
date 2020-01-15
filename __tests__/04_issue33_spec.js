import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { createGlobalState } from '../src/index';

describe('issue #33 spec', () => {
  afterEach(cleanup);

  it('should sync getGlobaState with useGlobalState', () => {
    const initialState = {
      count1: 0,
    };
    const { GlobalStateProvider, useGlobalState, getGlobalState } = createGlobalState(initialState);
    const Counter = () => {
      const [value, update] = useGlobalState('count1');
      return (
        <div>
          <span>{value}</span>
          <button type="button" onClick={() => update(value + 1)}>+1</button>
        </div>
      );
    };
    const App = () => (
      <GlobalStateProvider>
        <Counter />
      </GlobalStateProvider>
    );
    const { getAllByText, container } = render(<App />);
    expect(container.querySelector('span').textContent).toBe(String(getGlobalState('count1')));
    fireEvent.click(getAllByText('+1')[0]);
    expect(container.querySelector('span').textContent).toBe(String(getGlobalState('count1')));
  });
});
