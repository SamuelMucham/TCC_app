import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

interface Produto {
  id: number | string;
  nome: string;
  categoria: string;
  preco: number | string;
  imagem: string;
  descricao: string;
}

/*
 * IMPORTANTE:
 *
 * Se estiver usando Expo no celular físico,
 * NÃO use localhost.
 *
 * Coloque o IP do computador onde o backend está rodando.
 *
 * Exemplo:
 * http://192.168.1.100:3000
 *
 * Se estiver usando Android Emulator:
 * http://10.0.2.2:3000
 */
const API_URL = "http://192.168.1.100:3000";

const categorias = [
  "TODOS",
  "TV",
  "NOTEBOOK",
  "Computador",
  "Periférico",
  "CELULARES",
];

export default function Explore() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("TODOS");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      setCarregando(true);
      setErro("");

      const response = await fetch(`${API_URL}/produtos`);

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar produtos. Status: ${response.status}`
        );
      }

      const dados = await response.json();

      /*
       * Aceita tanto:
       *
       * [
       *   {...}
       * ]
       *
       * quanto:
       *
       * {
       *   produtos: [...]
       * }
       */
      const listaProdutos = Array.isArray(dados)
        ? dados
        : dados.produtos;

      if (!Array.isArray(listaProdutos)) {
        throw new Error("Formato de produtos inválido.");
      }

      /*
       * Remove GAMER e APPLE caso ainda existam
       * no banco de dados.
       */
      const produtosPermitidos = listaProdutos.filter(
        (produto: Produto) =>
          produto.categoria?.toUpperCase() !== "GAMER" &&
          produto.categoria?.toUpperCase() !== "APPLE"
      );

      setProdutos(produtosPermitidos);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);

      setErro(
        "Não foi possível carregar os produtos. Verifique se o servidor está funcionando."
      );
    } finally {
      setCarregando(false);
    }
  }

  const produtosFiltrados = useMemo(() => {
    if (categoriaAtiva === "TODOS") {
      return produtos;
    }

    return produtos.filter(
      (produto) =>
        produto.categoria?.toUpperCase() ===
        categoriaAtiva.toUpperCase()
    );
  }, [categoriaAtiva, produtos]);

  function formatarPreco(preco: number | string) {
    if (typeof preco === "number") {
      return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    /*
     * Caso o banco já envie:
     * R$ 2.799,90
     */
    if (preco.includes("R$")) {
      return preco;
    }

    /*
     * Caso envie:
     * "2799.90"
     */
    const numero = Number(
      preco.replace(".", "").replace(",", ".")
    );

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
      `${produto.nome} adicionado ao carrinho!`
    );
  }

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#e30613" />

        <Text style={styles.textoCarregando}>
          Carregando produtos...
        </Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.erroContainer}>
        <Text style={styles.erroTitulo}>
          Erro ao carregar produtos
        </Text>

        <Text style={styles.erroTexto}>
          {erro}
        </Text>

        <TouchableOpacity
          style={styles.botaoTentarNovamente}
          onPress={buscarProdutos}
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
      {/* FILTROS */}
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

      {/* PRODUTOS */}
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.lista}
        columnWrapperStyle={styles.colunas}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioTitulo}>
              Nenhum produto encontrado
            </Text>

            <Text style={styles.vazioTexto}>
              Não existem produtos nessa categoria.
            </Text>
          </View>
        }
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
              {formatarPreco(item.preco)}
            </Text>

            <Text style={styles.cardPix}>
              À vista no PIX
            </Text>

            {/* BOTÃO */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  carregando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  textoCarregando: {
    marginTop: 12,
    fontSize: 15,
    color: "#666",
  },

  erroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#f5f5f5",
  },

  erroTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e30613",
    marginBottom: 10,
    textAlign: "center",
  },

  erroTexto: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },

  botaoTentarNovamente: {
    backgroundColor: "#e30613",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },

  botaoTentarTexto: {
    color: "#fff",
    fontWeight: "bold",
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
    height: 120,
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

  vazio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  vazioTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  vazioTexto: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
});