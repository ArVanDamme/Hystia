import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CardManagerProvider} from './model/CardManager.tsx';
import {ThemeProvider} from './model/ThemeManager.tsx';

import HomeScreen from './screens/HomeScreen.tsx';
import CardsScreen from './screens/CardsScreen.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import GameScreen from './screens/GameScreen.tsx';
import GameSummaryScreen from './screens/GameSummaryScreen.tsx';
import GameStartScreen from './screens/GameStartScreen.tsx';
import PlayerManagementScreen from './screens/GamePlayerScreen.tsx';
import {GameManagerProvider} from './model/GameManager.tsx';

const Stack = createStackNavigator();

const App = () => {
  return (
    <GameManagerProvider>
      <ThemeProvider>
        <CardManagerProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false, animationTypeForReplace: 'pop'}}
              />
              <Stack.Screen
                name="Cards"
                component={CardsScreen}
                options={{headerShown: false, animationTypeForReplace: 'pop'}}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{headerShown: false, animationTypeForReplace: 'pop'}}
              />
              <Stack.Screen
                name="GameManagement"
                component={GameStartScreen}
                options={{headerShown: false, animationTypeForReplace: 'pop'}}
              />
              <Stack.Screen
                name={'PlayerManagement'}
                component={PlayerManagementScreen}
                options={{headerShown: false, animationTypeForReplace: 'pop'}}
              />
              <Stack.Screen
                name="Game"
                component={GameScreen}
                options={{headerShown: false, animationTypeForReplace: 'pop'}}
              />
              <Stack.Screen
                name="GameSummary"
                component={GameSummaryScreen}
                options={{headerShown: false, animationTypeForReplace: 'pop'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CardManagerProvider>
      </ThemeProvider>
    </GameManagerProvider>
  );
};

export default App;
