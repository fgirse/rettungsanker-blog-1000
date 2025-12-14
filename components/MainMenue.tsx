import * as React from 'react';
import { Menu } from '@progress/kendo-react-layout';
import items from '../data/items.json'

const App = () => {
    return (
      <div>
        <Menu items={items} />
      </div>
    );
}

export default App;
