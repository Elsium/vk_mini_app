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
import bridge from "@vkontakte/vk-bridge";

const SingleStart = (props) => {
	const info = bridge.send("VKWebAppFlashGetInfo");
	const [paused, setPaused] = React.useState(false);
	const [over, setOver] = React.useState(false);
	const [[m, s], setTime] = useState([props.singleTime, 0]);
	
	const tick = () => {
		if (paused || over) return;
		
		else if (m === 0 && s === 0) {
			setOver(true);
			try {
				if (info.data.is_available) {
					bridge.send("VKWebAppFlashSetLevel", {"level": 0.5});
				}
			} catch (e) {
			
			}
		} else if (s === 0) {
			setTime([m - 1, 59]);
		} else {
			setTime([m, s - 1]);
		}
	};
	
	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});
	
	const [active, setActive] = useState(null);
	return (
		<Group header={<Header>{!paused && !over ? "Игра идет" : "Игра закончена"}</Header>}>
			<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
				<Text
					style={!paused && !over ? {fontSize: 30} : {display: 'none'}}>
					{`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
				</Text>
				<Text
					style={!paused && !over ? {display: 'none'} : {fontSize: 26}}>
					Шпионом был - {props.nameSpy}
				</Text>
			</div>
			<div style={{display: 'flex', justifyContent: 'space-around', marginTop: 40}}>
				<div style={!paused && !over ? {paddingLeft: 20, paddingRight: 20, width: '100%'} : {display: 'none'}}>
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
						onClick={!paused && !over ? () => setPaused(true) : () => props.openHome()}
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
