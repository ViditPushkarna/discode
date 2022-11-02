import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Provider, useSelector } from "react-redux";
import { selectToken } from "./redux/authSlice";
import store from "./redux/store";
import Brand from "./pages/Brand";
import Drawer1 from "./pages/DrawerSingle";
import Drawer2 from "./pages/DrawerTemplatePage";

const Stack = createNativeStackNavigator();

const AuthStack = (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </Stack.Navigator>
);

const AppStack = (
  <Stack.Navigator>
    <Stack.Screen name="Brand" component={Brand} />
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

function App() {
  const token = useSelector(selectToken);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Drawer2" component={Drawer2} />
        <Stack.Screen name="Drawer1" component={Drawer1} />
        <Stack.Screen name="Brand" component={Brand} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function ReduxWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
