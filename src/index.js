import { Component } from 'react';
import PropTypes from 'prop-types';

class WebNotification extends Component {
	state = {
		notification: {},
		options: {}
	};

	componentDidMount() {
		if (window.Notification) {
			window.Notification.requestPermission((result) => {
				if (result !== 'granted') return;
				this.show();
			});
		}
	}

	show() {
		const { title, icon, body, timeout, onClickFn } = this.props;

		if (!title) return;

		if (icon) {
			this.setState({
				options: { ...this.state.options, icon }
			});
		}

		if (body) {
			this.setState({
				options: { ...this.state.options, body }
			});
		}

		this.setState({
			notification: new window.Notification(title, this.state.options)
		});

		if (onClickFn) {
			this.state.notification.addEventListener('click', onClickFn, false);
		}

		window.setTimeout(() => {
			this.state.notification.close();
		}, timeout || 5000);
	}

	render() {
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
