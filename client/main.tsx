import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
// import 'semantic-ui-css/semantic.css'; //Default Theme ONly

Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});
