import React, { Component } from 'react';

import window from 'global/window';
import document from 'global/document';

class WebNotification extends Component {
  state = {
    notification: {}
  }

  static defaultProps = {
    show,
    close
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(window.Notification) {
      window.Notification.requestPermission( result => {
          if(result !== 'granted') return;
      });
    }
  }

  render () {
    return null;
  }
}

export default WebNotification;
