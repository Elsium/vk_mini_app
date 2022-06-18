import React, {useEffect, useState} from 'react';
import locations from '../data/locationData';
import {
	Button,
	FormItem,
	Group,
	Header, Select, Text
} from "@vkontakte/vkui";

const Single = (props) => {
	const [count, setCount] = useState(3)
	const [start, setStart] = useState(false);
	const [show, setShow] = useState(false);
	const [spy, setSpy] = useState(0);
	const [location, setLocation] = useState("");
	const [timeM, setTimeM] = useState(3);
	
	function getRandomInRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	const getRoles = () => {
		if (count === 0) {
			props.startSingle(timeM);
		} else {
			setShow(!show)
			setCount(count - 1);
		}
	}
	const startGame = () => {
		setStart(true);
		setTimeM(count);
		let tmp = getRandomInRange(1, count - 1 + 1);
		setSpy(tmp);
		setLocation(locations[getRandomInRange(0, 29)].name);
	}
	
	return ( !start ?
		(<Group header={<Header>Настройка игры</Header>}>
			<div>
				<FormItem top="Колличество игроков">
					<Select
						value={count}
						onChange={(e) => setCount(e.target.value)}
						options={[
							{ label: "3", value: 3 },
							{ label: "4", value: 4 },
							{ label: "5", value: 5 },
							{ label: "6", value: 6 },
							{ label: "7", value: 7 },
							{ label: "8", value: 8 },
						]}
					>
					</Select>
				</FormItem>
				<Button
					size="l"
					stretched={true}
					appearance='positive'
					onClick={startGame}
				>Начать игру</Button>
			</div>
		</Group>)
			:
			(<Group header={<Header>Распределение ролей</Header>}>
				<div style={show ? {} : {opacity: 0}}>
					<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
						{count === spy ? <Text weight="2">Вы шпион</Text> : <Text weight="2">Вы не шпион</Text>}
						{count === spy ? <Text weight="2">Локация неизвестна</Text> : <Text weight="2">Локация: {location}</Text>}
					</div>
				</div>
				<Button
					style={{marginTop: 20}}
					size="m"
					stretched={true}
					appearance={show ? 'negative' : 'positive'}
					onClick={show || count === 0 ? getRoles : () => setShow(!show)}
				>
					{ count === 0 ? "Поставить таймер" : show ? "Следующий игрок" : "Показать роль"}
				</Button>
			</Group>)
	);
};

export default Single;
