import React, { useEffect } from 'react';
import { Pressable, Text, View, StyleSheet, SafeAreaView, Platform, I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import navigation parameter types
import { CreateStackParamList, SurveysStackParamList, ResultsStackParamList, TabParamList } from './src/navigation';

// AWS Amplify configuration and i18n setup
import { Amplify } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';
import ar from './locales/ar';
import outputs from './amplify_outputs.json';
import { Authenticator, useAuthenticator } from './src/config/authConfig';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


// Import Screens
import CreateOptions from './src/screens/CreateOptions';
import CreatePsychometricTest from './src/screens/CreatePsychometricTest';
import CreateSurvey from './src/screens/CreateSurvey';

import MySurveys from './src/screens/MySurveys';
import SurveyDetails from './src/screens/SurveyDetails';

import SurveyResults from './src/screens/SurveyResults';
import AnalyzeResults from './src/screens/AnalyzeResults';

import Profile from './src/screens/Profile';

// Import components
import SignOutButton from './src/components/SignOutButton';

// Configure Amplify
Amplify.configure(outputs);

// Set up i18n dictionary and language
I18n.putVocabularies({ ar });
I18n.setLanguage('ar');

// Enable screens optimization for better performance
import { enableScreens } from 'react-native-screens';
import { Logo } from './src/components/Logo';
enableScreens();

// Define stack navigators
const CreateStack = createStackNavigator<CreateStackParamList>();
const SurveysStack = createStackNavigator<SurveysStackParamList>();
const ResultsStack = createStackNavigator<ResultsStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Stack Navigation for "Create" flows
const CreateStackScreen = () => (
  <CreateStack.Navigator>
    <CreateStack.Screen name="CreateOptions" component={CreateOptions} options={{ title: 'عمل مقياس/ استبيان' }} />
    <CreateStack.Screen name="CreatePsychometricTest" component={CreatePsychometricTest} options={{ title: 'إنشاء اختبار قياس نفسي' }} />
    <CreateStack.Screen name="CreateSurvey" component={CreateSurvey} options={{ title: 'إنشاء استبيان' }} />
  </CreateStack.Navigator>
);

// Stack Navigation for "Surveys" flows
const SurveysStackScreen = () => (
  <SurveysStack.Navigator>
    <SurveysStack.Screen name="MySurveys" component={MySurveys} options={{ title: 'استبياناتي' }} />
    <SurveysStack.Screen name="SurveyDetails" component={SurveyDetails} options={{ title: 'تفاصيل الاستبيان' }} />
  </SurveysStack.Navigator>
);

// Stack Navigation for "Results" flows
const ResultsStackScreen = () => (
  <ResultsStack.Navigator>
    <ResultsStack.Screen name="SurveyResults" component={SurveyResults} options={{ title: 'نتائج الاستبيان' }} />
    <ResultsStack.Screen name="AnalyzeResults" component={AnalyzeResults} options={{ title: 'نتائج التحليل' }} />
  </ResultsStack.Navigator>
);

// Bottom Tab Navigator
const AppContent = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Create"
      component={CreateStackScreen}
      options={{
        title: 'إنشاء',
        headerTitleAlign: 'center', // Center the title
        tabBarLabel: '',
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faPlus} color={color} size={size * 1.5} />
        ),
      }}
    />
    <Tab.Screen
      name="Surveys"
      component={SurveysStackScreen}
      options={{
        title: 'استبياناتي',
        headerTitleAlign: 'center', // Center the title
        tabBarLabel: '',
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faCartShopping} color={color} size={size * 1.5} />
        ),
      }}
    />
    <Tab.Screen
      name="Results"
      component={ResultsStackScreen}
      options={{
        title: 'النتائج',
        headerTitleAlign: 'center', // Center the title
        tabBarLabel: '',
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faChartLine} color={color} size={size * 1.5} />
        ),
      }}
    />
<Tab.Screen
  name="Profile"
  component={Profile}
  options={{
    title: 'الملف الشخصي',
    headerTitleAlign: 'center', // Center the title
    tabBarLabel: '',
    tabBarIcon: ({ color, size }) => (
      <FontAwesomeIcon icon={faAddressCard} color={color} size={size * 1.5} />
    ),
  }}
/>
  
  </Tab.Navigator>
);

const LoginHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Logo />
      <Text style={styles.headerText}>مرحبا في منصة استبيان</Text>
    </View>
  );
};

// Main App Component
const App = () => {
  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    }
  }, []);

  return (
    <Authenticator.Provider>
      <Authenticator
      Header = {LoginHeader}
      components={{
          Header: LoginHeader
      }}
      >
        <SafeAreaView style={styles.container}>
          <SignOutButton />
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </SafeAreaView>
      </Authenticator>
    </Authenticator.Provider>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
