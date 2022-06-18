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
	Button,
	Div,
	PanelHeaderButton,
	platform,
	IOS,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Locations from "./panels/Locations";
import {Icon24Back, Icon28ChevronBack} from "@vkontakte/icons";
import Single from "./panels/Single";
import SingleStart from "./panels/SingleStart";

const ROUTES = {
	HOME: 'home',
	SINGLE: 'single',
	MULTI: 'multi',
	LOCATIONS: 'locations',
	RULES: 'rules',
	SINGLE_START: 'singlestart',
}
const osName = platform();
const styles = {
	play: {
		height: 40,
	},
	addition: {
		height: 30,
	}
	
}

const App = () => {
	const [ activePanel, setActivePanel ] = useState(ROUTES.HOME);
	const [ back, setBack ] = useState(null);
	const [singleTime, setSingleTime] = useState(0);
	const { viewWidth } = useAdaptivity();
	
	const single = () => {
		setActivePanel(ROUTES.SINGLE);
	}
	
	const openHome = () => {
		setActivePanel(ROUTES.HOME);
	}
	
	const openLocations = () => {
		setActivePanel(ROUTES.LOCATIONS);
	}
	
	const startSingle = (time) => {
		if (back) setBack(false);
		setSingleTime(time);
		setActivePanel(ROUTES.SINGLE_START);
	}
	
	const openLocationsList = () => {
		setActivePanel(ROUTES.LOCATIONS);
		setBack(true);
	}
	
	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout header={<PanelHeader separator={false} />}>
						<SplitCol spaced={viewWidth > ViewWidth.MOBILE}>
							<View activePanel={activePanel}>
								<Panel id="home">
									<PanelHeader>Шпион</PanelHeader>
									<Div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
										<Div>
											<Button
												onClick={single}
												style={styles.play}
											>
												Игра на одном устройстве
											</Button>
										</Div>
										<Div>
											<Button
												style={styles.play}
												appearance='positive'
											>
												Многопользовательская игра
											</Button>
										</Div>
										<Div>
											<Button
												style={styles.addition}
												onClick={openLocations}
												mode="secondary"
												size="l"
											>
												Локации
											</Button>
										</Div>
										<Div>
											<Button
												style={styles.addition}
												mode="secondary"
												size="l"
											>
												Правила
											</Button>
										</Div>
									</Div>
								</Panel>
								<Panel id="locations">
									<PanelHeader
										left={<PanelHeaderButton aria-label="Назад" onClick={back ? startSingle : openHome}>
											{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
										</PanelHeaderButton>}
									>Шпион</PanelHeader>
									<Locations/>
								</Panel>
								<Panel id="single">
									<PanelHeader
										left={<PanelHeaderButton aria-label="Назад" onClick={openHome}>
											{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
										</PanelHeaderButton>}
									>Шпион</PanelHeader>
									<Single startSingle={startSingle}/>
								</Panel>
								<Panel id="singlestart">
									<PanelHeader
										left={<PanelHeaderButton aria-label="Назад" onClick={openHome}>
											{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
										</PanelHeaderButton>}
									>Шпион</PanelHeader>
									<SingleStart singleTime={singleTime} openLocationsList={openLocationsList} openHome={openHome}/>
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
