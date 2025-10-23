import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen.tsx';
import OtpScreen from './src/screens/OtpScreen.tsx';
import HomeScreen from './src/screens/HomeScreen.tsx';
import MedicineScreen from './src/screens/MedicineScreen.tsx';
import AddMedicineScreen from './src/screens/AddMedicineScreen.tsx';

export type RootStackParamList = {
  Login: undefined;
  Otp: { phoneNumber: string };
  Home: undefined;
  Medicine:
    | {
        newMedicine?: import('./src/screens/AddMedicineScreen').NewMedicinePayload;
      }
    | undefined;
  AddMedicine: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Medicine" component={MedicineScreen} />
          <Stack.Screen name="AddMedicine" component={AddMedicineScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
