import React, { Component } from 'react';

import window from 'global/window';
import document from 'global/document';

class WebNotification extends Component {
  notification = {};

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

  componentDidMount() {
    const { message, icon, timeout, clickFn } = this.props;

    if(!icon) {
      this.notification = new window.Notification(message);
    } else {
      this.notification = new window.Notification(message, { icon });
    }

    if(clickFn) {
      this.notification.onClick = clickFn;
    }

    window.setTimeout(() => {
      this.notification.close();
    }, (timeout || 5000));
  }

  close = () => this.notification.close();

  render () {
    return null;
  }
}

export default WebNotification;
