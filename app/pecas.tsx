import { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Produto {
  nome: string;
  categoria: string;
  preco: string;
  imagem: string;
  descricao: string;
  quantidade?: number;
}

const TodasPeças: Produto[] = [].sort(() => Math.random() - 0.5);

const categorias = [
  "TODOS",
  "peças para celulares",
  "peças para TV",
  "peças para Notebooks",
  "peças para Computadores",
];
export default function PecasScreen() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("TODOS");
  const [pesquisa, setPesquisa] = useState("");

  const produtosFiltrados = useMemo(() => {
    let produtos = TodasPeças;

    // Filtra por categoria
    if (categoriaAtiva !== "TODOS") {
      produtos = produtos.filter(
        (produto) => produto.categoria === categoriaAtiva
      );
    }

    // Filtra pela pesquisa
    if (pesquisa.trim() !== "") {
      const texto = pesquisa.toLowerCase();

      produtos = produtos.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(texto) ||
          produto.categoria.toLowerCase().includes(texto) ||
          produto.descricao.toLowerCase().includes(texto) ||
          produto.preco.toLowerCase().includes(texto)
      );
    }

    return produtos;
  }, [categoriaAtiva, pesquisa]);

  async function adicionarCarrinho(produto: Produto) {
    try {
      const dados = await AsyncStorage.getItem("carrinho");
      const carrinho: Produto[] = dados ? JSON.parse(dados) : [];

      const index = carrinho.findIndex(
        (item) => item.nome === produto.nome
      );

      if (index !== -1) {
        if ((carrinho[index].quantidade ?? 1) < 5) {
          carrinho[index].quantidade =
            (carrinho[index].quantidade ?? 1) + 1;
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
        `${produto.nome} foi adicionado ao carrinho!`
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro",
        "Não foi possível adicionar o produto."
      );
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={styles.filtros}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategoriaAtiva(cat)}
            style={[
              styles.filtroBotao,
              categoriaAtiva === cat &&
                styles.filtroBotaoAtivo,
            ]}
          >
            <Text
              style={[
                styles.filtroTexto,
                categoriaAtiva === cat &&
                  styles.filtroTextoAtivo,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.busca}>
        <TextInput
          placeholder="Pesquisar peças..."
          placeholderTextColor="#777"
          style={styles.input}
          value={pesquisa}
          onChangeText={setPesquisa}
        />
      </View>
            <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.nome}
        numColumns={2}
        contentContainerStyle={styles.lista}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardImagemBox}>
              <Text style={styles.badge}>{item.categoria}</Text>

              <Image
                source={{ uri: item.imagem }}
                style={styles.cardImagem}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.cardNome} numberOfLines={2}>
              {item.nome}
            </Text>

            <Text style={styles.cardDescricao} numberOfLines={3}>
              {item.descricao}
            </Text>

            <Text style={styles.cardPreco}>
              {item.preco}
            </Text>

            <Text style={styles.cardPix}>
              À vista no PIX
            </Text>

            <TouchableOpacity
              style={styles.cardBotao}
              onPress={() => adicionarCarrinho(item)}
            >
              <Text style={styles.cardBotaoTexto}>
                Adicionar ao carrinho
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  busca: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingBottom: 10,
  },

  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 15,
    color: "#222",
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

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  cardImagemBox: {
    backgroundColor: "#fafafa",
    borderRadius: 12,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  cardImagem: {
    width: "100%",
    height: "100%",
  },

  badge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#e30613",
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 1,
  },

  cardNome: {
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },

  cardDescricao: {
    fontSize: 11,
    color: "#777",
    marginBottom: 6,
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
});