import React, { useState, useEffect } from 'react';
// import bridge from '@vkontakte/vk-bridge';
import {
	AdaptivityProvider,
	ConfigProvider,
	useAdaptivity,
	AppRoot,
	SplitLayout,
	SplitCol,
	ViewWidth,
	View,
	Panel,
	PanelHeader,
	Header,
	Group,
	SimpleCell,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Locations from "./panels/Locations";

const ROUTES = {
	HOME: 'home',
	LOCATIONS: 'locations',
	RULES: 'rules',
}

const App = () => {
	const { viewWidth } = useAdaptivity();
	
	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout header={<PanelHeader separator={false} />}>
						<SplitCol spaced={viewWidth > ViewWidth.MOBILE}>
							<View activePanel={ROUTES.LOCATIONS}>
								<Panel id="locations">
									<PanelHeader>Шпион</PanelHeader>
									<Locations/>
								</Panel>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
