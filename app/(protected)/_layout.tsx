// import CustomDrawerContent from "components/CustomDrawerContent";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
    // drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="index" options={{ title: "Check-ins" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
      <Drawer.Screen name="account" options={{ title: "Account" }} />
    </Drawer>
  );
}
