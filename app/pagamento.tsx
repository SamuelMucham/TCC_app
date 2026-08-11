import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Pagamento() {
  const router = useRouter();

  const [metodo, setMetodo] = useState("PIX");

  const [nome, setNome] = useState("");
  const [cartao, setCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  async function pagar() {
  if (metodo === "Cartão") {
    if (
      nome.trim() === "" ||
      cartao.trim() === "" ||
      validade.trim() === "" ||
      cvv.trim() === ""
    ) {
      Alert.alert("Erro", "Preencha todos os dados do cartão.");
      return;
    }
  }

  try {
    await AsyncStorage.removeItem("carrinho");

    Alert.alert("Compra realizada!", `Pagamento via ${metodo} aprovado.`);

    router.replace("/");
  } catch (error) {
    console.log(error);
    Alert.alert("Erro", "Não foi possível finalizar a compra.");
  }
}

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Pagamento</Text>

      <Text style={styles.subtitulo}>
        Escolha a forma de pagamento
      </Text>

      <View style={styles.opcoes}>
        <TouchableOpacity
          style={[
            styles.opcao,
            metodo === "PIX" && styles.opcaoAtiva,
          ]}
          onPress={() => setMetodo("PIX")}
        >
          <Text
            style={[
              styles.textoOpcao,
              metodo === "PIX" && styles.textoOpcaoAtivo,
            ]}
          >
            PIX
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.opcao,
            metodo === "Cartão" && styles.opcaoAtiva,
          ]}
          onPress={() => setMetodo("Cartão")}
        >
          <Text
            style={[
              styles.textoOpcao,
              metodo === "Cartão" && styles.textoOpcaoAtivo,
            ]}
          >
            Cartão
          </Text>
        </TouchableOpacity>
        pix
      </View>

      {metodo === "PIX" && (
        <View style={styles.caixa}>
          <Text style={styles.info}>Chave PIX:</Text>

          <Text style={styles.chave}>
            assistencia@forja.com.br
          </Text>

          <Text style={styles.info}>
            Após realizar o PIX clique em Confirmar Pagamento.
          </Text>
        </View>
      )}

      {metodo === "Cartão" && (
        <>
          <TextInput
            placeholder="Nome do titular"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            placeholder="Número do cartão"
            style={styles.input}
            keyboardType="numeric"
            value={cartao}
            onChangeText={setCartao}
          />

          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="MM/AA"
              style={[
                styles.input,
                { flex: 1, marginRight: 10 },
              ]}
              value={validade}
              onChangeText={setValidade}
            />

            <TextInput
              placeholder="CVV"
              style={[
                styles.input,
                { flex: 1 },
              ]}
              keyboardType="numeric"
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </>
      )}

      <TouchableOpacity
        style={styles.botao}
        onPress={pagar}
      >
        <Text style={styles.botaoTexto}>
          Confirmar Pagamento
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.voltar}
        onPress={() => router.back()}
      >
        <Text style={styles.voltarTexto}>
          Voltar
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#e30613",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },

  subtitulo: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },

  opcoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  opcao: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e30613",
    marginHorizontal: 5,
    alignItems: "center",
  },

  opcaoAtiva: {
    backgroundColor: "#e30613",
  },

  textoOpcao: {
    color: "#e30613",
    fontWeight: "bold",
  },

  textoOpcaoAtivo: {
    color: "#fff",
  },

  caixa: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  chave: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e30613",
    marginVertical: 10,
  },

  info: {
    fontSize: 15,
    color: "#555",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  botao: {
    backgroundColor: "#28a745",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  voltar: {
    marginTop: 20,
    alignItems: "center",
  },

  voltarTexto: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 16,
  },
});