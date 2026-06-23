import { router } from "expo-router";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function Explore() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#e30613",
            marginBottom: 20,
          }}
        >
          Serviços TecFlow
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/baterias-inchadas" as any)}
          style={{
            backgroundColor: "#e30613",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Baterias Inchadas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/cameras-quebradas" as any)}
          style={{
            backgroundColor: "#e30613",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Câmeras Quebradas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/outros" as any)}
          style={{
            backgroundColor: "#e30613",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Outros Serviços
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/entreOuCadastreSe" as any)}
          style={{
            backgroundColor: "#222",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
            }}
          >
            Entre ou Cadastre-se
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/meusPedidos" as any)}
          style={{
            backgroundColor: "#222",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
            }}
          >
            Meus Pedidos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/carrinho" as any)}
          style={{
            backgroundColor: "#222",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
            }}
          >
            Carrinho
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}