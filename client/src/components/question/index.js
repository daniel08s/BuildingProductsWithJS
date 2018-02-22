import React from 'react';

export default ({question}) => (
  <div className="panel panel-default">
    <div className="panel-heading">{question.text}</div>
    <div className="panel-body">
      Panel content
    </div>
  </div>
);
