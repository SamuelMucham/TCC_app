import { useMemo, useState } from "react";

import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import todosProdutos, { Produto } from "../constants/produtos";

export default function ProdutosScreen() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("TODOS");

  const categorias = [
    "TODOS",
    "TV",
    "NOTEBOOK",
    "Computador",
    "Periférico",
  ];

  const produtosFiltrados = useMemo(() => {
    if (categoriaAtiva === "TODOS") {
      return todosProdutos;
    }

    return todosProdutos.filter(
      (produto) => produto.categoria === categoriaAtiva,
    );
  }, [categoriaAtiva]);

  async function adicionarCarrinho(produto: Produto) {
    try {
      const dados = await AsyncStorage.getItem("carrinho");

      const carrinho: Produto[] = dados
        ? JSON.parse(dados)
        : [];

      const index = carrinho.findIndex(
        (item) => item.nome === produto.nome,
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
            "Você pode adicionar até 5 unidades.",
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
        JSON.stringify(carrinho),
      );

      Alert.alert(
        "Sucesso",
        "Produto adicionado ao carrinho!",
      );
    } catch (error) {
      console.log("Erro ao adicionar ao carrinho:", error);

      Alert.alert(
        "Erro",
        "Não foi possível adicionar o produto.",
      );
    }
  }

  return (
    <View style={styles.container}>
      {/* FILTROS DE CATEGORIA */}
      <View style={styles.filtros}>
        {categorias.map((categoria) => (
          <TouchableOpacity
            key={categoria}
            onPress={() =>
              setCategoriaAtiva(categoria)
            }
            style={[
              styles.filtroBotao,
              categoriaAtiva === categoria &&
                styles.filtroBotaoAtivo,
            ]}
          >
            <Text
              style={[
                styles.filtroTexto,
                categoriaAtiva === categoria &&
                  styles.filtroTextoAtivo,
              ]}
            >
              {categoria}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LISTA DE PRODUTOS */}
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item, index) =>
          `${item.nome}-${index}`
        }
        numColumns={2}
        contentContainerStyle={styles.lista}
        columnWrapperStyle={styles.colunas}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* IMAGEM */}
            <View style={styles.cardImagemBox}>
              <Text style={styles.badge}>
                {item.categoria}
              </Text>

              <Image
                source={{ uri: item.imagem }}
                style={styles.cardImagem}
                resizeMode="contain"
              />
            </View>

            {/* NOME */}
            <Text
              style={styles.cardNome}
              numberOfLines={2}
            >
              {item.nome}
            </Text>

            {/* DESCRIÇÃO */}
            <Text
              style={styles.cardDescricao}
              numberOfLines={3}
            >
              {item.descricao}
            </Text>

            {/* PREÇO */}
            <Text style={styles.cardPreco}>
              {item.preco}
            </Text>

            {/* PIX */}
            <Text style={styles.cardPix}>
              À vista no PIX
            </Text>

            {/* BOTÃO */}
            <TouchableOpacity
              style={styles.cardBotao}
              onPress={() =>
                adicionarCarrinho(item)
              }
              activeOpacity={0.8}
            >
              <Text style={styles.cardBotaoTexto}>
                Adicionar ao carrinho
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.semProdutos}>
            <Text style={styles.semProdutosTexto}>
              Nenhum produto encontrado.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  filtros: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
    backgroundColor: "#fff",
  },

  filtroBotao: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e30613",
  },

  filtroBotaoAtivo: {
    backgroundColor: "#e30613",
  },

  filtroTexto: {
    color: "#e30613",
    fontSize: 12,
    fontWeight: "bold",
  },

  filtroTextoAtivo: {
    color: "#fff",
  },

  lista: {
    padding: 12,
    paddingBottom: 40,
  },

  colunas: {
    gap: 12,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    elevation: 3,
  },

  cardImagemBox: {
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  cardImagem: {
    width: "100%",
    height: "100%",
  },

  badge: {
    position: "absolute",
    top: 6,
    left: 6,
    zIndex: 1,
    backgroundColor: "#e30613",
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },

  cardNome: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
    marginTop: 8,
  },

  cardDescricao: {
    fontSize: 11,
    color: "#777",
    marginVertical: 6,
  },

  cardPreco: {
    fontSize: 18,
    fontWeight: "800",
    color: "#e30613",
  },

  cardPix: {
    fontSize: 10,
    color: "#999",
    marginBottom: 8,
  },

  cardBotao: {
    backgroundColor: "#e30613",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },

  cardBotaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  semProdutos: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  semProdutosTexto: {
    fontSize: 16,
    color: "#777",
  },
});
