// npm packages
import React from 'react';

import Popup from '../components/popup';

export default ({children}) => (
  <div>
    {children}
    <Popup />
  </div>
);
