import { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

interface Produto {
  nome: string;
  categoria: string;
  preco: string;
  imagem: string;
  descricao: string;
}

const todosProdutos: Produto[] = [
  // TVs
  {
    nome: 'Smart TV TCL 32" HD QLED S5K',
    categoria: "TV",
    preco: "R$ 937,00",
    imagem:
      "https://http2.mlstatic.com/D_NQ_NP_2X_960494-MLA112210788972_062026-F.webp",
    descricao: "Tela QLED com HDR10, Google TV integrado, Dolby Audio.",
  },
  {
    nome: 'Samsung Smart TV 50" Crystal UHD 4K',
    categoria: "TV",
    preco: "R$ 4.399,35",
    imagem: "https://m.media-amazon.com/images/I/71iGUDQvOYL.AC_SL1500.jpg",
    descricao: "Crystal UHD 4K, Xbox Cloud Gaming, Alexa integrada.",
  },
  {
    nome: 'LG Smart TV 55" UHD 4K',
    categoria: "TV",
    preco: "R$ 2.799,90",
    imagem:
      "https://www.lg.com/content/dam/channel/wcms/br/images/tv/ua8550psa/new-galery/2-1600-ua8550.jpg/jcr:content/renditions/thum-1600x1062.jpeg?w=800",
    descricao: "Tela UHD 4K com HDR10 Pro, WebOS 23, ThinQ AI.",
  },
  // Notebooks
  {
    nome: "Notebook Lenovo IdeaPad 1 Ryzen 5",
    categoria: "NOTEBOOK",
    preco: "R$ 2.799,90",
    imagem:
      "https://http2.mlstatic.com/D_NQ_NP_2X_891763-MLA112377969125_052026-F.webp",
    descricao: "AMD Ryzen 5, 8GB RAM, SSD 256GB, tela Full HD 15,6\".",
  },
  {
    nome: 'Apple MacBook Air 13" M3',
    categoria: "NOTEBOOK",
    preco: "R$ 9.499,90",
    imagem:
      "https://cdn.awsli.com.br/2500x2500/2757/2757071/produto/332437926/0_aemxct3bzapta_prd_1500_1-jpg-quoh4k92ym.webp",
    descricao: "Chip Apple M3, Liquid Retina, SSD 512GB.",
  },
  {
    nome: "MSI Katana 15 RTX 4060",
    categoria: "NOTEBOOK",
    preco: "R$ 8.199,90",
    imagem:
      "https://i5.walmartimages.com/seo/MSI-Katana-15-6-Gaming-Laptop-144Hz-FHD-Intel-Core-i7-13620H-NVIDIA-GeForce-RTX-4060-8GB-16GB-DDR5-Memory-1TB-NVMe-SSD-Windows-11-Black-B13VFK-817US_19d1ab0a-edde-44d9-826c-b8e9798ae11b.2ccb79676bb85cefcb7bb917dcbef1cc.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
    descricao: "Intel Core i7, RTX 4060, 16GB RAM, SSD 1TB, tela 144Hz.",
  },
  // Computadores
  {
    nome: "Computador PC Gamer Completo",
    categoria: "Computador",
    preco: "R$ 2.249,90",
    imagem:
      "https://images8.kabum.com.br/produtos/fotos/sync_mirakl/646348/xlarge/Computador-PC-Gamer-Completo-Tob-Intel-Core-I7-SSD-480GB-16gb-Gabinete-Aqu-rio-Teclado-Mouse-Mouse-Pad-E-Headset-Gamer-Monitor-19-WINDOWS-10-Pro-Trial_1760704454.jpg",
    descricao: "Intel Core I7, SSD 480GB, 16GB, monitor 19\", Windows 10 Pro.",
  },
  {
    nome: "PC Gamer Studiopc Tiamat",
    categoria: "Computador",
    preco: "R$ 61.999,00",
    imagem:
      "https://images5.kabum.com.br/produtos/fotos/sync_mirakl/1033415/xlarge/PC-Gamer-Studiopc-Tiamat-Ryzen-7-9800x3d-32GB-RAM-RTX-5080-16GB-SSD-1TB-Fonte-850w-Water-Cooler-360mm-5-Fans-RGB-Windows-11-Pro-8565432_1777475013.jpg",
    descricao: "Ryzen 7 9800x3d, RTX 5080, 32GB RAM, SSD 1TB.",
  },
  // Periféricos
  {
    nome: "Headset Gamer Redragon",
    categoria: "Periférico",
    preco: "R$ 377,64",
    imagem:
      "https://images8.kabum.com.br/produtos/fotos/227818/headset-gamer-redragon-zeus-chroma-mk-ii-rgb-surround-7-1-usb-drivers-53mm-preto-vermelho-h510-rgb_1631555309_gg.jpg",
    descricao: "RGB, Som Surround 7.1, Drivers 53mm, USB.",
  },
  {
    nome: "Mouse Gamer Sem Fio",
    categoria: "Periférico",
    preco: "R$ 249,90",
    imagem:
      "https://images0.kabum.com.br/produtos/fotos/sync_mirakl/883180/xlarge/Mouse-Gamer-Sem-Fio-Attack-Shark-X11-22000-Dpi-59g-Tri-mode-Com-Dock-Magn-tico-RGB-Preto_1772819622.jpg",
    descricao: "22000 Dpi, 59g, Tri-mode com Dock Magnético, RGB.",
  },
  {
    nome: "Teclado Mecânico Gamer Machenike",
    categoria: "Periférico",
    preco: "R$ 258,81",
    imagem:
      "http://images4.kabum.com.br/produtos/fotos/535604/teclado-mecanico-gamer-machenike-k500-b61-switch-brown-abnt-branco-k500-b61bbr_1769021519_gg.jpg",
    descricao: "Switch Huano Brown, ABNT, Branco.",
  },
];

const categorias = ["TODOS", "TV", "NOTEBOOK", "Computador", "Periférico"];

export default function Explore() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("TODOS");

  const produtosFiltrados = useMemo(() => {
    if (categoriaAtiva === "TODOS") return todosProdutos;
    return todosProdutos.filter((p) => p.categoria === categoriaAtiva);
  }, [categoriaAtiva]);

  function adicionarCarrinho(produto: Produto) {
    Alert.alert("Carrinho", `${produto.nome} adicionado ao carrinho!`);
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
              categoriaAtiva === cat && styles.filtroBotaoAtivo,
            ]}
          >
            <Text
              style={[
                styles.filtroTexto,
                categoriaAtiva === cat && styles.filtroTextoAtivo,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(_, i) => String(i)}
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
    </View>
  );
}

const styles = StyleSheet.create({
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
  filtroBotaoAtivo: { backgroundColor: "#e30613" },
  filtroTexto: { color: "#e30613", fontSize: 12, fontWeight: "bold" },
  filtroTextoAtivo: { color: "#fff" },
  lista: { padding: 12, paddingBottom: 40 },
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
