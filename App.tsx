import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import ErrorBoundary from './src/components/ErrorBoundary';

import LoginScreen from './src/screens/LoginScreen';
import CategorySelectionScreen from './src/screens/CategorySelectionScreen';
import SubCategoryScreen from './src/screens/SubCategoryScreen';
import HomeScreen from './src/screens/HomeScreen';
import ExamListScreen from './src/screens/ExamListScreen';
import ExamScreen from './src/screens/ExamScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import QuestionReviewScreen from './src/screens/QuestionReviewScreen';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { colors, activeTheme } = useTheme();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.textInverse,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            headerBackTitleVisible: false,
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="CategorySelection" 
            component={CategorySelectionScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="SubCategory" 
            component={SubCategoryScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ExamList" 
            component={ExamListScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Exam" 
            component={ExamScreen} 
            options={{ 
              title: 'Sınav',
              headerLeft: () => null,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen 
            name="Results" 
            component={ResultsScreen} 
            options={{ 
              headerShown: false,
              headerLeft: () => null,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ title: 'Ayarlar' }}
          />
          <Stack.Screen 
            name="QuestionReview" 
            component={QuestionReviewScreen} 
            options={{ title: 'Soru İnceleme' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
