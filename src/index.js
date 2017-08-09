import React, { Component } from 'react';
import PropTypes from 'prop-types';
import window from 'global/window';

class WebNotification extends Component {

  notification = {};

  componentDidMount() {
    if(window.Notification) {
      window.Notification.requestPermission( result => {
          if(result !== 'granted') return;
          this.show();
      });
    }
  }

  show() {
    const { title, icon, body, timeout, onClickFn } = this.props;
    if(!title) return;

    let options = {};

    if(icon) {
      Object.assign(options, { icon });
    }

    if(body) {
      Object.assign(options, { body });
    }

    this.notification = new window.Notification(title, options);

    if(onClickFn) {
      this.notification.addEventListener("click", onClickFn, false);
    }

    window.setTimeout(() => {
      this.notification.close();
    }, (timeout || 5000));
  }

  render () {
    return null;
  }
}

WebNotification.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    body: PropTypes.string,
    timeout: PropTypes.number,
    onClickFn: PropTypes.func
};

export default WebNotification;
