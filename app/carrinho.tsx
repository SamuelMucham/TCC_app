import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface Produto {
  nome: string;
  categoria: string;
  preco: string;
  imagem: string;
  descricao: string;
  quantidade: number;
}

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  useEffect(() => {
    carregarCarrinho();
  }, []);

  async function carregarCarrinho() {
    const dados = await AsyncStorage.getItem("carrinho");

    if (dados) {
      setCarrinho(JSON.parse(dados));
    }
  }

  async function removerProduto(index: number) {
    const novoCarrinho = [...carrinho];

    novoCarrinho.splice(index, 1);

    setCarrinho(novoCarrinho);

    await AsyncStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  }

  async function adicionarMais(index: number) {
    const novoCarrinho = [...carrinho];

    if (novoCarrinho[index].quantidade < 5) {
      novoCarrinho[index].quantidade++;

      setCarrinho(novoCarrinho);

      await AsyncStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    } else {
      Alert.alert("Limite", "Você pode adicionar no máximo 5 unidades.");
    }
  }

  async function diminuir(index: number) {
    const novoCarrinho = [...carrinho];

    if (novoCarrinho[index].quantidade > 1) {
      novoCarrinho[index].quantidade--;

      setCarrinho(novoCarrinho);

      await AsyncStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    } else {
      removerProduto(index);
    }
  }

  async function limparCarrinho() {
    await AsyncStorage.removeItem("carrinho");

    setCarrinho([]);
  }

  const total = carrinho.reduce((acc, item) => {
    const preco = Number(
      item.preco.replace("R$", "").replace(/\./g, "").replace(",", "."),
    );

    return acc + preco * item.quantidade;
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Meu Carrinho</Text>

      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.nome}
        ListEmptyComponent={
          <Text style={styles.vazio}>Seu carrinho está vazio.</Text>
        }
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />

            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>

              <Text style={styles.preco}>{item.preco}</Text>

              <Text style={styles.quantidade}>
                Quantidade: {item.quantidade}
              </Text>

              <View style={styles.botoes}>
                <TouchableOpacity
                  style={styles.botaoPequeno}
                  onPress={() => diminuir(index)}
                >
                  <Text style={styles.botaoTexto}>-</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botaoPequeno}
                  onPress={() => adicionarMais(index)}
                >
                  <Text style={styles.botaoTexto}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.remover}
                  onPress={() => removerProduto(index)}
                >
                  <Text style={styles.botaoTexto}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <Text style={styles.total}>
        Total: R$ {total.toFixed(2).replace(".", ",")}
      </Text>

      <TouchableOpacity
        style={styles.finalizar}
        onPress={() => router.push("/pagamento")}
      >
        <Text style={styles.finalizarTexto}>Ir para Pagamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.limpar} onPress={limparCarrinho}>
        <Text style={styles.finalizarTexto}>Limpar Carrinho</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.voltar} onPress={() => router.back()}>
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e30613",
    marginBottom: 20,
  },

  vazio: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 18,
    color: "#777",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    elevation: 4,
  },

  imagem: {
    width: 100,
    height: 100,
    marginRight: 12,
    borderRadius: 10,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },

  preco: {
    color: "#e30613",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 5,
  },

  quantidade: {
    marginTop: 5,
    color: "#555",
  },

  botoes: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  botaoPequeno: {
    backgroundColor: "#e30613",
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 8,
  },

  remover: {
    backgroundColor: "#444",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

  total: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },

  finalizar: {
    backgroundColor: "#28a745",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  limpar: {
    backgroundColor: "#e30613",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  finalizarTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },

  voltar: {
    alignItems: "center",
    marginTop: 10,
  },

  voltarTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
});
