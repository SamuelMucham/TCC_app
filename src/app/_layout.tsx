import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export default function RootLayout() {
  return (
    <>
      <View style={{ backgroundColor: "#fff3cd", paddingVertical: 6 }}>
        <Text
          style={{
            textAlign: "center",
            color: "#856404",
            fontWeight: "bold",
            fontSize: 12,
          }}
        >
          GANHE 5% DE DESCONTO NA SUA PRIMEIRA COMPRA! USE O CUPOM 1COMPRA
        </Text>
      </View>

      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: "#222" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          tabBarActiveTintColor: "#e30613",
          tabBarInactiveTintColor: "#888",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Assistência Forja",
            tabBarLabel: "Início",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Produtos",
            tabBarLabel: "Explorar",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="carrinho"
          options={{
            title: "Carrinho",
            tabBarLabel: "Carrinho",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
