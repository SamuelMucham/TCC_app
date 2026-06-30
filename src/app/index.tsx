import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

interface Produto {
  nome: string;
  categoria: string;
  preco: string;
  imagem: string;
  descricao: string;
}

const produtos: Produto[] = [
  {
    nome: "REDMAGIC 11 pro",
    categoria: "CELULARES",
    preco: "R$ 5.299,00",
    imagem:
      "https://br.redmagic.gg/cdn/shop/files/device-top__2x_bdff09d4-ce56-4750-b553-c820756f9d14.png?v=1761828406&width=628",
    descricao: "REDMAGIC 11 pro",
  },
  {
    nome: "ROG Phone 9 Pro",
    categoria: "CELULARES",
    preco: "R$ 5.000",
    imagem:
      "https://dlcdnwebimgs.asus.com/files/media/59e044d5-16d0-4b79-ba2e-1d0d878f4dec/v1/features/images/large/1x/kv/phone_left.png",
    descricao: "ROG Phone 9 Pro",
  },
  {
    nome: "Samsung S24 Ultra",
    categoria: "CELULARES",
    preco: "R$ 9.974,05",
    imagem:
      "https://http2.mlstatic.com/D_NQ_NP_2X_699676-MLA99382879982_112025-F.webp",
    descricao: "Samsung S24 Ultra",
  },
  {
    nome: "POCO X8 Pro",
    categoria: "CELULARES",
    preco: "R$ 6.439,99",
    imagem: "https://m.media-amazon.com/images/I/61U2cKwv20L._AC_SX679_.jpg",
    descricao: "POCO X8 Pro",
  },
  {
    nome: "iPhone 17",
    categoria: "CELULARES",
    preco: "R$ 899,00",
    imagem:
      "https://http2.mlstatic.com/D_NQ_NP_2X_717704-MLA107971005255_032026-F.webp",
    descricao: "iPhone 17",
  },
  {
    nome: "Samsung S26 Ultra",
    categoria: "CELULARES",
    preco: "R$ 10.349,10",
    imagem:
      "https://samsungbrshop.vtexassets.com/arquivos/ids/278468-600-auto?v=639076206131900000",
    descricao:
      "Celular Samsung Galaxy S26 Ultra 5G, 512GB, 12GB RAM, Câmera Quádrupla.",
  },
];

export default function Home() {
  const [busca, setBusca] = useState("");
  const router = useRouter();

  function pesquisar() {
    const texto = busca.trim().toLowerCase();
    if (!texto) return;

    if (texto.includes("tv")) router.push("/explore?categoria=TV");
    else if (texto.includes("notebook")) router.push("/explore?categoria=NOTEBOOK");
    else if (texto.includes("comput") || texto === "pc")
      router.push("/explore?categoria=Computador");
    else if (texto.includes("perif")) router.push("/explore?categoria=Periférico");
    else Alert.alert("Busca", `Você pesquisou: ${texto}`);
  }

  function adicionarCarrinho(produto: Produto) {
    Alert.alert("Carrinho", `${produto.nome} adicionado ao carrinho!`);
    // TODO: integrar com Context/AsyncStorage para persistir o carrinho
  }

  return (
    <FlatList
      data={produtos}
      keyExtractor={(_, i) => String(i)}
      numColumns={2}
      contentContainerStyle={styles.lista}
      columnWrapperStyle={{ gap: 12 }}
      ListHeaderComponent={
        <>
          <View style={styles.banner}>
            <Text style={styles.bannerTitulo}>
              A Maior assistência técnica do Brasil
            </Text>
            <Text style={styles.bannerSub}>Desde 2026.</Text>
          </View>

          <View style={styles.buscaBox}>
            <TextInput
              value={busca}
              onChangeText={setBusca}
              placeholder="O que você está procurando?"
              placeholderTextColor="#999"
              style={styles.buscaInput}
              onSubmitEditing={pesquisar}
            />
            <TouchableOpacity style={styles.buscaBotao} onPress={pesquisar}>
              <Text style={styles.buscaBotaoTexto}>Buscar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.secaoTitulo}>Ofertas de celulares</Text>
        </>
      }
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
          <Text style={styles.cardPreco}>{item.preco}</Text>
          <Text style={styles.cardPix}>À vista no PIX</Text>

          <TouchableOpacity
            style={styles.cardBotao}
            onPress={() => adicionarCarrinho(item)}
          >
            <Text style={styles.cardBotaoTexto}>Adicionar no carrinho</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: { backgroundColor: "#f5f5f5", padding: 12, paddingBottom: 40 },
  banner: {
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  bannerTitulo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  bannerSub: { color: "#ddd", textAlign: "center", marginTop: 6 },
  buscaBox: { flexDirection: "row", marginBottom: 20 },
  buscaInput: {
    flex: 1,
    height: 44,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    color: "#000",
    backgroundColor: "#fff",
  },
  buscaBotao: {
    backgroundColor: "#e30613",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 8,
  },
  buscaBotaoTexto: { color: "#fff", fontWeight: "bold" },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    borderLeftWidth: 4,
    borderLeftColor: "#e30613",
    paddingLeft: 8,
    marginBottom: 12,
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
  cardImagem: { width: "100%", height: "100%" },
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
  cardNome: { fontWeight: "bold", color: "#222", marginBottom: 4 },
  cardDescricao: { fontSize: 11, color: "#777", marginBottom: 6 },
  cardPreco: { fontSize: 18, fontWeight: "800", color: "#e30613" },
  cardPix: { fontSize: 10, color: "#999", marginBottom: 8 },
  cardBotao: {
    backgroundColor: "#e30613",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  cardBotaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});
