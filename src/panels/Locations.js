import React from 'react';
import {
	Group,
	Header,
	SimpleCell} from '@vkontakte/vkui';
import locations from '../data/locationData';

const Locations = (dataLocation) => {
	console.log(dataLocation)
	return (
		<Group header={<Header mode="secondary">Локации</Header>}>
			{locations.map( item => <SimpleCell style={{padding: 10, marginBottom: 5,}}>{item.name}</SimpleCell>)}
		</Group>
	);
};

export default Locations;
