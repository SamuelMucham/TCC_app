import { useEffect, useMemo, useState } from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: string | number;
  imagem: string;
  descricao: string;
  quantidade?: number;
}

// ======================================================
// ENDEREÇO DA API
// ======================================================

// IMPORTANTE:
// Se estiver usando o celular físico, NÃO use localhost.
//
// Coloque aqui o IP do computador onde o backend está rodando.
//
// Exemplo:
// http://192.168.0.100:3000
//
// Se estiver usando Android Emulator:
// http://10.0.2.2:3000

const API_URL = "http://192.168.0.100:3000";

// ======================================================
// CATEGORIAS
// ======================================================

const categorias = [
  "TODOS",
  "Peças para Celulares",
  "Peças para TV",
  "Peças para Notebooks",
  "Peças para Computadores",
];

// ======================================================
// TELA
// ======================================================

export default function PecasScreen() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("TODOS");
  const [pesquisa, setPesquisa] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // ======================================================
  // BUSCAR PRODUTOS DO BANCO
  // ======================================================

  async function carregarProdutos() {
    try {
      setCarregando(true);
      setErro(null);

      const response = await fetch(`${API_URL}/produtos`);

      if (!response.ok) {
        throw new Error(
          `Erro HTTP: ${response.status}`
        );
      }

      const dados = await response.json();

      console.log("Produtos recebidos da API:", dados);

      // Caso a API retorne diretamente um array
      const lista = Array.isArray(dados)
        ? dados
        : dados.produtos ?? dados.data ?? [];

      // Converter os campos do Prisma
      const produtosConvertidos: Produto[] = lista.map(
        (produto: any) => ({
          id: String(produto.id),

          nome:
            produto.nome ??
            produto.name ??
            "Produto sem nome",

          categoria:
            produto.categoria ??
            produto.category ??
            "",

          preco:
            produto.preco ??
            produto.price ??
            0,

          imagem:
            produto.imagem ??
            produto.image ??
            "",

          descricao:
            produto.descricao ??
            produto.desc ??
            "",

          quantidade: produto.quantidade ?? 1,
        })
      );

      // Mostrar somente peças
      const somentePecas = produtosConvertidos.filter(
        (produto) =>
          produto.categoria
            .toLowerCase()
            .includes("peças") ||
          produto.categoria
            .toLowerCase()
            .includes("pecas")
      );

      setProdutos(somentePecas);
    } catch (error) {
      console.error(
        "Erro ao carregar produtos:",
        error
      );

      setErro(
        "Não foi possível carregar os produtos do banco de dados."
      );
    } finally {
      setCarregando(false);
    }
  }

  // ======================================================
  // CARREGAR AO ABRIR A TELA
  // ======================================================

  useEffect(() => {
    carregarProdutos();
  }, []);

  // ======================================================
  // FILTRAR PRODUTOS
  // ======================================================

  const produtosFiltrados = useMemo(() => {
    let lista = [...produtos];

    // Categoria
    if (categoriaAtiva !== "TODOS") {
      lista = lista.filter(
        (produto) =>
          produto.categoria === categoriaAtiva
      );
    }

    // Pesquisa
    if (pesquisa.trim() !== "") {
      const texto = pesquisa
        .toLowerCase()
        .trim();

      lista = lista.filter((produto) => {
        const precoTexto = String(
          produto.preco
        ).toLowerCase();

        return (
          produto.nome
            .toLowerCase()
            .includes(texto) ||
          produto.categoria
            .toLowerCase()
            .includes(texto) ||
          produto.descricao
            .toLowerCase()
            .includes(texto) ||
          precoTexto.includes(texto)
        );
      });
    }

    return lista;
  }, [produtos, categoriaAtiva, pesquisa]);

  // ======================================================
  // FORMATAR PREÇO
  // ======================================================

  function formatarPreco(
    preco: string | number
  ) {
    let valor: number;

    if (typeof preco === "number") {
      valor = preco;
    } else {
      valor = Number(
        preco
          .replace("R$", "")
          .replace(/\./g, "")
          .replace(",", ".")
          .trim()
      );
    }

    if (Number.isNaN(valor)) {
      return String(preco);
    }

    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // ======================================================
  // ADICIONAR AO CARRINHO
  // ======================================================

  async function adicionarCarrinho(
    produto: Produto
  ) {
    try {
      const dados =
        await AsyncStorage.getItem(
          "carrinho"
        );

      const carrinho: Produto[] = dados
        ? JSON.parse(dados)
        : [];

      const index = carrinho.findIndex(
        (item) => item.id === produto.id
      );

      if (index !== -1) {
        const quantidadeAtual =
          carrinho[index].quantidade ?? 1;

        if (quantidadeAtual >= 5) {
          Alert.alert(
            "Limite atingido",
            "Você só pode adicionar até 5 unidades deste produto."
          );

          return;
        }

        carrinho[index].quantidade =
          quantidadeAtual + 1;
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
      console.error(
        "Erro ao adicionar ao carrinho:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível adicionar o produto ao carrinho."
      );
    }
  }

  // ======================================================
  // CARREGANDO
  // ======================================================

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator
          size="large"
          color="#e30613"
        />

        <Text style={styles.carregandoTexto}>
          Carregando produtos...
        </Text>
      </View>
    );
  }

  // ======================================================
  // ERRO
  // ======================================================

  if (erro) {
    return (
      <View style={styles.erro}>
        <Text style={styles.erroTitulo}>
          Erro ao carregar produtos
        </Text>

        <Text style={styles.erroTexto}>
          {erro}
        </Text>

        <TouchableOpacity
          style={styles.botaoTentar}
          onPress={carregarProdutos}
        >
          <Text style={styles.botaoTentarTexto}>
            Tentar novamente
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <View style={styles.container}>
      {/* FILTROS */}

      <View style={styles.filtros}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() =>
              setCategoriaAtiva(cat)
            }
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

      {/* BUSCA */}

      <View style={styles.busca}>
        <TextInput
          placeholder="Pesquisar peças..."
          placeholderTextColor="#777"
          style={styles.input}
          value={pesquisa}
          onChangeText={setPesquisa}
        />
      </View>

      {/* QUANTIDADE */}

      <View style={styles.resultado}>
        <Text style={styles.resultadoTexto}>
          {produtosFiltrados.length}{" "}
          {produtosFiltrados.length === 1
            ? "produto encontrado"
            : "produtos encontrados"}
        </Text>
      </View>

      {/* LISTA */}

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) =>
          String(item.id)
        }
        numColumns={2}
        contentContainerStyle={styles.lista}
        columnWrapperStyle={styles.colunas}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* IMAGEM */}

            <View
              style={styles.cardImagemBox}
            >
              <Text style={styles.badge}>
                {item.categoria.replace(
                  "Peças para ",
                  ""
                )}
              </Text>

              {item.imagem ? (
                <Image
                  source={{
                    uri: item.imagem,
                  }}
                  style={styles.cardImagem}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.semImagem}>
                  Sem imagem
                </Text>
              )}
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
              activeOpacity={0.8}
              onPress={() =>
                adicionarCarrinho(item)
              }
            >
              <Text
                style={styles.cardBotaoTexto}
              >
                Adicionar ao carrinho
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioTitulo}>
              Nenhuma peça encontrada
            </Text>

            <Text style={styles.vazioTexto}>
              Tente pesquisar por outro nome ou
              selecionar outra categoria.
            </Text>
          </View>
        }
      />
    </View>
  );
}

// ======================================================
// ESTILOS
// ======================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  carregando: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },

  carregandoTexto: {
    marginTop: 12,
    color: "#555",
    fontSize: 15,
  },

  erro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#f5f5f5",
  },

  erroTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e30613",
    marginBottom: 10,
  },

  erroTexto: {
    color: "#666",
    textAlign: "center",
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

  resultado: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  resultadoTexto: {
    color: "#666",
    fontSize: 13,
    fontWeight: "600",
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
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    overflow: "hidden",
  },

  cardImagem: {
    width: "100%",
    height: "100%",
  },

  semImagem: {
    color: "#999",
    fontSize: 12,
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
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 1,
  },

  cardNome: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 14,
    marginBottom: 4,
  },

  cardDescricao: {
    fontSize: 11,
    color: "#777",
    lineHeight: 15,
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },

  vazioTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  vazioTexto: {
    textAlign: "center",
    color: "#777",
    fontSize: 14,
    lineHeight: 20,
  },
});