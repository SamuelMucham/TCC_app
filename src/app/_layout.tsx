import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#e30613",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "TecFlow",
        }}
      />

      <Stack.Screen
        name="explore"
        options={{
          title: "Explorar",
        }}
      />
    </Stack>
  );
}