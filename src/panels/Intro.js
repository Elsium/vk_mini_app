import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import './Intro.css';

const Intro = ({ id, snackbarError}) => {
	return (
		<Panel id={id}>
			<PanelHeader>
				Туалетка
			</PanelHeader>
			{snackbarError}
		</Panel>
	)
};

Intro.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Intro;
