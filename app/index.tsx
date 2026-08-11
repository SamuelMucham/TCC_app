import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import produtos, { Produto } from "../constants/produtos";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [pesquisa, setPesquisa] = useState("");
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    verificarLogin();
  }, []);

  async function verificarLogin() {
    try {
      const usuario = await AsyncStorage.getItem("usuario");
      setLogado(!!usuario);
    } catch (error) {
      console.log("Erro ao verificar login:", error);
    }
  }

  async function sair() {
    try {
      await AsyncStorage.removeItem("usuario");
      setLogado(false);

      Alert.alert("Sucesso", "Você saiu da sua conta.");
    } catch (error) {
      console.log("Erro ao sair:", error);
    }
  }

  const produtosFiltrados = useMemo(() => {
    const texto = pesquisa.trim().toLowerCase();

    if (texto === "") {
      return produtos;
    }

    return produtos.filter((produto) => {
      return (
        produto.nome.toLowerCase().includes(texto) ||
        produto.categoria.toLowerCase().includes(texto) ||
        produto.descricao.toLowerCase().includes(texto) ||
        produto.preco.toLowerCase().includes(texto)
      );
    });
  }, [pesquisa]);

  async function adicionarCarrinho(produto: Produto) {
    try {
      const dados = await AsyncStorage.getItem("carrinho");

      const carrinho: Produto[] = dados
        ? JSON.parse(dados)
        : [];

      const index = carrinho.findIndex(
        (item) =>
          item.nome === produto.nome &&
          item.preco === produto.preco
      );

      if (index !== -1) {
        const quantidadeAtual =
          carrinho[index].quantidade ?? 1;

        if (quantidadeAtual < 5) {
          carrinho[index].quantidade =
            quantidadeAtual + 1;
        } else {
          Alert.alert(
            "Limite atingido",
            "Você só pode adicionar até 5 unidades deste produto."
          );
          return;
        }
      } else {
        carrinho.push({
          ...produto,
          quantidade: 1,
        });
      }

      await AsyncStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
      );

      Alert.alert(
        "Sucesso",
        "Produto adicionado ao carrinho!"
      );
    } catch (error) {
      console.log(
        "Erro ao adicionar produto:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível adicionar o produto."
      );
    }
  }

  const renderItem = ({
    item,
  }: {
    item: Produto;
  }) => {
    return (
      <View style={styles.card}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>
            {item.categoria}
          </Text>
        </View>

        <Image
          source={{ uri: item.imagem }}
          style={styles.imagem}
          resizeMode="contain"
        />

        <Text style={styles.nome}>
          {item.nome}
        </Text>

        <Text style={styles.descricao}>
          {item.descricao}
        </Text>

        <Text style={styles.preco}>
          {item.preco}
        </Text>

        <Text style={styles.pix}>
          À vista no PIX
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() =>
            Alert.alert(
              "Adicionar ao carrinho",
              `Deseja adicionar "${item.nome}" ao carrinho?`,
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Adicionar",
                  onPress: () =>
                    adicionarCarrinho(item),
                },
              ]
            )
          }
        >
          <Text style={styles.botaoTexto}>
            Adicionar ao carrinho
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          Assistência Técnica Forja
        </Text>

        <View style={styles.busca}>
          <TextInput
            placeholder="Buscar produtos..."
            placeholderTextColor="#777"
            style={styles.input}
            value={pesquisa}
            onChangeText={setPesquisa}
          />
        </View>

        <View style={styles.menuSuperior}>
          <TouchableOpacity
            style={styles.menuBotao}
            onPress={() => {
              if (logado) {
                sair();
              } else {
                router.push("/login");
              }
            }}
          >
            <Text style={styles.link}>
              {logado ? "Sair" : "Entrar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBotao}
            onPress={() =>
              router.push("/produtos")
            }
          >
            <Text style={styles.link}>
              Ver produtos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBotao}
            onPress={() =>
              router.push("/pecas")
            }
          >
            <Text style={styles.link}>
              Ver peças
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBotao}
            onPress={() =>
              router.push("/carrinho")
            }
          >
            <Text style={styles.link}>
              Carrinho
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={produtosFiltrados}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          `${item.nome}-${item.preco}-${index}`
        }
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.banner}>
              <Text style={styles.bannerTexto}>
                Encontre os melhores produtos
              </Text>
            </View>

            <Text style={styles.ofertas}>
              {pesquisa.trim() === ""
                ? "Ofertas de produtos"
                : "Produtos encontrados"}
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioTitulo}>
              Nenhum produto encontrado
            </Text>

            <Text style={styles.vazioTexto}>
              Tente pesquisar por outro nome,
              categoria ou produto.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    elevation: 8,
    zIndex: 100,
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e30613",
    textAlign: "center",
    marginBottom: 15,
  },

  busca: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  input: {
    height: 48,
    fontSize: 16,
    color: "#222",
  },

  menuSuperior: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  menuBotao: {
    alignItems: "center",
  },

  link: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },

  lista: {
    paddingTop: 190,
    paddingBottom: 30,
  },

  banner: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 5,
  },

  bannerTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  ofertas: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 20,
    marginVertical: 20,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 20,
    padding: 16,
    elevation: 5,
  },

  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#e30613",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },

  tagText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  imagem: {
    width: "100%",
    height: 220,
  },

  nome: {
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 10,
    color: "#222",
  },

  descricao: {
    color: "#666",
    fontSize: 15,
    lineHeight: 22,
    marginVertical: 10,
  },

  preco: {
    color: "#e30613",
    fontSize: 30,
    fontWeight: "bold",
  },

  pix: {
    color: "#999",
    marginTop: 5,
    marginBottom: 15,
  },

  botao: {
    backgroundColor: "#e30613",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  vazio: {
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 20,
  },

  vazioTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  vazioTexto: {
    marginTop: 10,
    color: "#777",
    textAlign: "center",
  },
});