import { createStackNavigator } from "react-navigation-stack";
import EmailInputScreen from "./src/screens/EmailInputScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SigninScreen from "./src/screens/SigninScreen";
import EventsScreen from "./src/screens/EventsScreen";
import EventScreen from "./src/screens/EventScreen";
import ConfirmeEmailScreen from "./src/screens/ConfirmeEmailScreen";
import { createAppContainer } from "react-navigation";
import AcountScreen from "./src/screens/AcountScreen";
import FormScreen from "./src/screens/FormScreen";
import propos from "./src/screens/propos";
import ForgetPassScreen from "./src/screens/ForgetPassScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";





const navigator = createStackNavigator({
  ConfirmeEmail: ConfirmeEmailScreen,
  Email: EmailInputScreen,
  Login: LoginScreen,
  Signin: SigninScreen,
  Events: EventsScreen,
  Event: EventScreen,
  Acount: AcountScreen,
  Form: FormScreen,
  Propos:propos,
  ForgetPass:ForgetPassScreen,
  Welcome:WelcomeScreen
},
{
  initialRouteName:"Welcome",
  defaultNavigationOptions:{
    headerShown: false,
  }
})

export default createAppContainer(navigator);