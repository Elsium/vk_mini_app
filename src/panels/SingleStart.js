import React, {useEffect, useMemo, useState} from 'react';
import locations from '../data/locationData';
import {
	Button,
	Group,
	Header,
	ModalPage,
	ModalPageHeader,
	PanelHeaderClose,
	PanelHeaderSubmit,
	Text,
	useAdaptivity,
	ViewWidth
} from "@vkontakte/vkui";
import Locations from "./Locations";

const SingleStart = (props) => {
	const [paused, setPaused] = React.useState(false);
	const [over, setOver] = React.useState(false);
	const [[m, s], setTime] = useState([props.singleTime, 0]);
	
	const tick = () => {
		if (paused || over) return;
		
		else if (m === 0 && s === 0) {
			setOver(true);
		} else if (s === 0) {
			setTime([m - 1, 59]);
		} else {
			setTime([m, s - 1]);
		}
	};
	
	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		end(over || paused ? clearInterval(timerID) : false);
		return () => clearInterval(timerID);
	});
	
	const end = (call = true) => {
		if (call) props.openHome();
	}
	const [active, setActive] = useState(null);
	return (
		<Group header={<Header>Игра идет</Header>}>
			<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
				<Text
					style={{fontSize: 30}}>{`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</Text>
			</div>
			<div style={{display: 'flex', justifyContent: 'space-around', marginTop: 40}}>
				<div style={{paddingLeft: 20, paddingRight: 20, width: '100%'}}>
					<Button
						size="m"
						stretched={true}
						onClick={() => active == null ? setActive(<Locations/>) : setActive(null)}
					>Список локаций</Button>
				</div>
				<div style={{paddingLeft: 20, paddingRight: 20, width: '100%'}}>
					<Button
						size="m"
						stretched={true}
						onClick={() => setPaused(true)}
					>Завершить</Button>
				</div>
			</div>
			<div style={{marginTop: 50}}>
				{active}
			</div>
		</Group>
	);
};

export default SingleStart;
