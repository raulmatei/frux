import React from 'react';
import invariant from 'invariant';
import { Reactor } from 'nuclear-js';
import context from 'frux/main';
import { render } from 'react-dom';
import Root from 'frux/containers/root';

import createInterface from 'frux/core/interface';
import counter from 'frux/modules/counter';
import Counter from 'frux/components/counter';

const reactor = new Reactor({ debug: true });

function createMountingNode() {
  const bodyElement = document.body;
  const nextNode = bodyElement.firstElementChild;
  const rootElement = document.createElement('div');

  bodyElement.insertBefore(rootElement, nextNode);
  return rootElement;
}

function mount() {
  const mountNode = createMountingNode();

  render(
    <Root reactor={reactor}>
      <Counter/>
    </Root>,
    mountNode
  );
}

export function initialize(spec) {
  createInterface({
    context,
    reactor,

    // pass modules here
    counter
  });

  mount();
}
