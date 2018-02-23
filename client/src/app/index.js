// npm packages
import React from 'react';

import Popup from '../components/popup';

// styles
import '../css/mystyle.css';

export default ({children}) => (
  <div>
    {children}
    <Popup />
  </div>
);
