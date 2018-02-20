// npm packages
import React from 'react';

import {Notifications} from '../notifications';

const style = {
  popup: {
    position: 'absolute',
    width: '100%',
    maxWidth: '500px',
    bottom: '25px',
    right: '17%',
  },
};

export default () => (
  <div style={style.popup}>
    <div className="row">
      <div className="col-xs-11 col-sm-9 col-md-7">
        <Notifications />
      </div>
    </div>
  </div>
);
