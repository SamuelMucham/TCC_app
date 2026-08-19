import { useCallback, useState } from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

interface Produto {
  id: string | number;
  nome: string;
  categoria: string;
  preco: number | string;
  imagem: string;
  descricao: string;
}

const API_URL = "http://192.168.0.100:3000";

export default function Explore() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState("");

  const buscarCelulares = useCallback(async () => {
    try {
      setErro("");

      const response = await fetch(`${API_URL}/produtos/celulares`);

      if (!response.ok) {
        throw new Error("Não foi possível buscar os celulares.");
      }

      const data = await response.json();

      setProdutos(data);
    } catch (error) {
      console.error("Erro:", error);

      setErro(
        "Não foi possível carregar os celulares. Verifique se o servidor está funcionando."
      );
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  // Busca os produtos quando a tela é carregada
  useState(() => {
    buscarCelulares();
  });

  function atualizarLista() {
    setAtualizando(true);
    buscarCelulares();
  }

  function formatarPreco(preco: number | string) {
    if (typeof preco === "number") {
      return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    // Caso o banco já retorne "R$ 5.299,00"
    if (preco.includes("R$")) {
      return preco;
    }

    const numero = Number(preco);

    if (!isNaN(numero)) {
      return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    return preco;
  }

  function adicionarCarrinho(produto: Produto) {
    Alert.alert(
      "Carrinho",
      `${produto.nome} foi adicionado ao carrinho!`
    );
  }

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e30613" />

        <Text style={styles.loadingTexto}>
          Carregando celulares...
        </Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.erroContainer}>
        <Text style={styles.erroTitulo}>
          Erro ao carregar
        </Text>

        <Text style={styles.erroTexto}>
          {erro}
        </Text>

        <TouchableOpacity
          style={styles.botaoTentar}
          onPress={buscarCelulares}
        >
          <Text style={styles.botaoTentarTexto}>
            Tentar novamente
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>
          Celulares
        </Text>

        <Text style={styles.subtitulo}>
          {produtos.length} produtos encontrados
        </Text>
      </View>

      {produtos.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioTitulo}>
            Nenhum celular encontrado
          </Text>

          <Text style={styles.vazioTexto}>
            Não existem celulares cadastrados no banco de dados.
          </Text>
        </View>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={styles.lista}
          columnWrapperStyle={styles.colunas}
          refreshControl={
            <RefreshControl
              refreshing={atualizando}
              onRefresh={atualizarLista}
              colors={["#e30613"]}
            />
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Imagem */}
              <View style={styles.cardImagemBox}>
                <Text style={styles.badge}>
                  {item.categoria}
                </Text>

                <Image
                  source={{
                    uri: item.imagem,
                  }}
                  style={styles.cardImagem}
                  resizeMode="contain"
                />
              </View>

              {/* Nome */}
              <Text
                style={styles.cardNome}
                numberOfLines={2}
              >
                {item.nome}
              </Text>

              {/* Descrição */}
              <Text
                style={styles.cardDescricao}
                numberOfLines={3}
              >
                {item.descricao}
              </Text>

              {/* Preço */}
              <Text style={styles.cardPreco}>
                {formatarPreco(item.preco)}
              </Text>

              <Text style={styles.cardPix}>
                À vista no PIX
              </Text>

              {/* Botão */}
              <TouchableOpacity
                style={styles.cardBotao}
                onPress={() => adicionarCarrinho(item)}
              >
                <Text style={styles.cardBotaoTexto}>
                  Adicionar no carrinho
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "800",
    color: "#222",
  },

  subtitulo: {
    marginTop: 4,
    fontSize: 13,
    color: "#777",
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

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  cardImagemBox: {
    backgroundColor: "#fafafa",
    borderRadius: 12,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
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

    backgroundColor: "#e30613",

    color: "#fff",

    fontSize: 9,
    fontWeight: "bold",

    paddingHorizontal: 8,
    paddingVertical: 3,

    borderRadius: 10,

    zIndex: 1,
  },

  cardNome: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },

  cardDescricao: {
    fontSize: 11,
    color: "#777",
    marginBottom: 6,
    lineHeight: 15,
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

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },

  loadingTexto: {
    marginTop: 12,
    color: "#555",
    fontSize: 15,
  },

  erroContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#f5f5f5",
  },

  erroTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e30613",
    marginBottom: 10,
  },

  erroTexto: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    marginBottom: 20,
  },

  botaoTentar: {
    backgroundColor: "#e30613",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },

  botaoTentarTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

  vazio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  vazioTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },

  vazioTexto: {
    textAlign: "center",
    color: "#777",
  },
});