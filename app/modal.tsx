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
      {
      nome: "Notebook Lenovo IdeaPad 1 Ryzen 5",
      categoria: "NOTEBOOK",
      preco: "R$ 2.799,90",
      imagem:
        "https://http2.mlstatic.com/D_NQ_NP_2X_891763-MLA112377969125_052026-F.webp",
      descricao:
        "Notebook Lenovo IdeaPad com processador AMD Ryzen 5, 8GB de memória RAM, SSD de 256GB e tela Full HD de 15,6 polegadas.",
    },
    {
      nome: "Notebook Dell Inspiron 15 Intel Core i5",
      categoria: "NOTEBOOK",
      preco: "R$ 3.499,90",
      imagem:
        "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3530-intel/media-gallery/black/notebook-inspiron-15-3530-nt-plastic-black-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=606&qlt=100,1&resMode=sharp2&size=606,402&chrss=full",
      descricao:
        "Notebook Dell Inspiron equipado com Intel Core i5 de 13ª geração, SSD de 512GB, 8GB de RAM e Windows 11.",
    },
    {
      nome: "Notebook Acer Aspire 5 Ryzen 7",
      categoria: "NOTEBOOK",
      preco: "R$ 3.899,90",
      imagem:
        "https://m.media-amazon.com/images/I/61fdWMFFv-L.AC_SL1000.jpg",
      descricao:
        "Notebook Acer Aspire 5 com Ryzen 7, SSD de 512GB, tela IPS Full HD e excelente desempenho para trabalho e estudos.",
    },
    {
      nome: "Notebook ASUS VivoBook 15",
      categoria: "NOTEBOOK",
      preco: "R$ 3.299,90",
      imagem:
        "https://http2.mlstatic.com/D_NQ_NP_2X_982613-MLA87788350616_072025-F.webp",
      descricao:
        "ASUS VivoBook 15 com Intel Core i5, SSD de 512GB, design fino e tela NanoEdge Full HD.",
    },
    {
      nome: "Notebook HP 256 G9",
      categoria: "NOTEBOOK",
      preco: "R$ 4.299,90",
      imagem:
        "https://br-media.hptiendaenlinea.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/c/0/c07973357_1.png",
      descricao:
        "Notebook HP 256 G9 com Intel Core i7, SSD de 512GB, 16GB de RAM e excelente desempenho para produtividade.",
    },
        {
      nome: 'Apple MacBook Air 13" M3',
      categoria: "APPLE",
      preco: "R$ 9.499,90",
      imagem:
        "https://cdn.awsli.com.br/2500x2500/2757/2757071/produto/332437926/0_aemxct3bzapta_prd_1500_1-jpg-quoh4k92ym.webp",
      descricao:
        "MacBook Air equipado com chip Apple M3, tela Liquid Retina, SSD de 512GB e bateria para o dia inteiro.",
    },
    {
      nome: "MSI Katana 15 RTX 4060",
      categoria: "GAMER",
      preco: "R$ 8.199,90",
      imagem:
        "https://i5.walmartimages.com/seo/MSI-Katana-15-6-Gaming-Laptop-144Hz-FHD-Intel-Core-i7-13620H-NVIDIA-GeForce-RTX-4060-8GB-16GB-DDR5-Memory-1TB-NVMe-SSD-Windows-11-Black-B13VFK-817US_19d1ab0a-edde-44d9-826c-b8e9798ae11b.2ccb79676bb85cefcb7bb917dcbef1cc.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
      descricao:
        "Notebook Gamer MSI Katana com Intel Core i7, RTX 4060, 16GB de RAM, SSD de 1TB e tela de 144Hz.",
    },
    {
      nome: "Computador PC Gamer Completo",
      categoria: "Computador",
      preco: "R$ 2.249,90",
      imagem:
        "https://images8.kabum.com.br/produtos/fotos/sync_mirakl/646348/xlarge/Computador-PC-Gamer-Completo-Tob-Intel-Core-I7-SSD-480GB-16gb-Gabinete-Aqu-rio-Teclado-Mouse-Mouse-Pad-E-Headset-Gamer-Monitor-19-WINDOWS-10-Pro-Trial_1760704454.jpg",
      descricao:
        "Intel Core I7 SSD 480GB 16gb Gabinete Aquário Teclado Mouse Mouse Pad E Headset Gamer Monitor 19 WINDOWS 10 Pro Trial",
    },
    {
      nome: "PC Gamer Studiopc Tiamat",
      categoria: "Computador",
      preco: "R$ 61.999,00",
      imagem:
        "https://images5.kabum.com.br/produtos/fotos/sync_mirakl/1033415/xlarge/PC-Gamer-Studiopc-Tiamat-Ryzen-7-9800x3d-32GB-RAM-RTX-5080-16GB-SSD-1TB-Fonte-850w-Water-Cooler-360mm-5-Fans-RGB-Windows-11-Pro-8565432_1777475013.jpg",
      descricao:
        "Ryzen 7 9800x3d, 32GB RAM, RTX 5080 16GB, SSD 1TB, Fonte 850w, Water Cooler 360mm, 5 Fans RGB, Windows 11 Pro - 8565432",
    },
    {
      nome: "PC Gamer Aquário",
      categoria: "Computador",
      preco: "R$ 45.799,00",
      imagem:
        "https://images4.kabum.com.br/produtos/fotos/sync_mirakl/796624/xlarge/PC-Gamer-Aqu-rio-Intel-i7-14700KF-RTX-5080-64gb-Ddr5-Nvme-2TB-Kalango-Games_1775947410.png",
      descricao:
        "Intel i7 14700KF, RTX 5080, 64gb Ddr5, Nvme 2TB - Kalango Games",
    },
    {
      nome: "PC Gamer Amd Aquário",
      categoria: "Computador",
      preco: "R$ 32.799,00",
      imagem:
        "https://images1.kabum.com.br/produtos/fotos/sync_mirakl/725141/xlarge/PC-Gamer-Amd-Aqu-rio-Ryzen-7-9800x3d-RTX-5070-Ti-32gb-Ddr5-2TB-Nvme-W11-Kalango-Games_1775750314.png",
      descricao:
        "Ryzen 7 9800x3d, RTX 5070 Ti, 32gb Ddr5, 2TB Nvme, W11 - Kalango Games",
    },
    {
      nome: "PC Workstation",
      categoria: "Computador",
      preco: "R$ 59.999,00",
      imagem:
        "https://images1.kabum.com.br/produtos/fotos/sync_mirakl/796621/xlarge/PC-Workstation-Intel-i9-14900KF-RTX-5080-128GB-Ddr5-Nvme-4TB-W11-Kalango-Games_1776040112.png",
      descricao:
        "Intel i9 14900KF, RTX 5080, 128GB Ddr5, Nvme 4TB, W11 - Kalango Games",
    },
    {
      nome: "PC Gamer Completo",
      categoria: "Computador",
      preco: "R$ 3.799,00",
      imagem:
        "https://images7.kabum.com.br/produtos/fotos/sync_mirakl/684007/xlarge/PC-Gamer-Completo-Ryzen-5-5600gt-16gb-Ddr4-SSD-480GB-500w-80-Plus-PCgt13-e_1779735227.png",
      descricao:
        " Ryzen 5 5600gt, 16gb Ddr4, SSD 480GB, 500w 80 Plus, PCgt13-e",
    },
        {
      nome: 'Pc Gamer Completo Tob',
      categoria: "Computador",
      preco: "R$ 2.479,98",
      imagem:
        "https://images5.kabum.com.br/produtos/fotos/sync_mirakl/501425/xlarge/Pc-Gamer-Completo-Tob-Intel-Core-I7-16GB-VGA-GT730-4GB-SSD-960GB-Windows-10-Pro-Trial-Monitor-21-5-Teclado-E-Mouse-Mouse-Pad-Headset_1775478813.jpg",
      descricao:
        "Intel Core I7, 16GB, VGA GT730 4GB, SSD 960GB, Windows 10 Pro Trial + Monitor 21.5 + Teclado E Mouse + Mouse Pad + Headset",
    },
    {
      nome: "PC Gamer",
      categoria: "GAMER",
      preco: "R$ 26.706,60",
      imagem:
        "https://images6.kabum.com.br/produtos/fotos/sync_mirakl/697206/xlarge/PC-Gamer-Ryzen-7-9800x3d-RTX-4070-Super-32gb-Ddr5-RGB-SSD-Nvme-2TB-1000w-80-Plus-Gold-Toppc01-e_1775063612.webp",
      descricao:
        "Ryzen 7 9800x3d, RTX 4070 Super, 32gb Ddr5 RGB, SSD Nvme 2TB, 1000w 80 Plus Gold, Toppc01-e",
    },
    {
      nome: "Headset Gamer Redragon",
      categoria: "Periférico",
      preco: "R$ 377,64",
      imagem:
        "https://images8.kabum.com.br/produtos/fotos/227818/headset-gamer-redragon-zeus-chroma-mk-ii-rgb-surround-7-1-usb-drivers-53mm-preto-vermelho-h510-rgb_1631555309_gg.jpg",
      descricao:
        "Headset Gamer Redragon Zeus X, Chroma Mk.II, RGB, Som Surround 7.1, Drivers 53mm, USB, Preto e Vermelho - H510-RGB",
    },
    {
      nome: "Mouse Gamer Sem Fio",
      categoria: "Periférico",
      preco: "R$ 249,90",
      imagem:
        "https://images0.kabum.com.br/produtos/fotos/sync_mirakl/883180/xlarge/Mouse-Gamer-Sem-Fio-Attack-Shark-X11-22000-Dpi-59g-Tri-mode-Com-Dock-Magn-tico-RGB-Preto_1772819622.jpg",
      descricao:
        "Mouse Gamer Sem Fio Attack Shark X11, 22000 Dpi, 59g, Tri-mode Com Dock Magnético, RGB, Preto",
    },
    {
      nome: "Microfone Dinâmico Gamer",
      categoria: "Periférico",
      preco: "R$ 454,53",
      imagem:
        "https://images2.kabum.com.br/produtos/fotos/592292/microfone-dinamico-gamer-fifine-ampligame-rgb-cardioide-usb-c-anti-ruido-para-streaming-preto-am8_1733503402_gg.jpg",
      descricao:
        "Microfone Dinâmico Gamer Fifine Ampligame, RGB, Cardióide, USB-C, Anti-Ruído, Para Streaming, Preto - AM8",
    },
    {
      nome: "Mousepad",
      categoria: "Periférico",
      preco: "R$ 117,64",
      imagem:
        "https://images0.kabum.com.br/produtos/fotos/103960/mousepad-gamer-rise-mode-rgb-estendido-900x300mm-preto-rm-mp-07-rgb_1747227673_gg.jpg",
      descricao:
        "Mousepad Gamer Rise Mode RGB, Estendido (900x300mm), Preto - RM-MP-07-RGB",
    },
    {
      nome: "Mesa Digitalizadora",
      categoria: "Periférico",
      preco: "R$ 39.882,35",
      imagem:
        "https://images0.kabum.com.br/produtos/fotos/532470/mesa-digitalizadora-com-tela-wacom-cintiq-pro-22-caneta-ressonancia-eletromagnetica-5080-lpi-tela-21-5-4k-usb-c-preto-dth227k0a1_1713209881_gg.jpg",
      descricao:
        "Mesa Digitalizadora Com tela Wacom Cintiq Pro 22, Caneta Ressonância Eletromagnética, 5080 LPI, Tela 21.5 4K, USB-C, Preto - DTH227K0A1",
    },
    {
      nome: "Óculos VR",
      categoria: "Periférico",
      preco: "R$ 12.989,40",
      imagem:
        "https://images4.kabum.com.br/produtos/fotos/628374/oculos-vr-pny-pico-neo-3-pro-eye-bluetooth-wi-fi-256gb-4k-branco-phs-n3-pe1018580_1725637511_gg.jpg",
      descricao:
        "Óculos VR PNY PICO Neo 3 Pro Eye, Bluetooth, Wi-Fi, 256GB, 4K, Branco - PHS-N3-PE1018580",
    },
    {
      nome: "Teclado Mecânico",
      categoria: "Periférico",
      preco: "R$ 5.999,90",
      imagem:
        "https://images0.kabum.com.br/produtos/fotos/sync_mirakl/883110/xlarge/Teclado-Mec-nico-Gamer-Razer-Blackwidow-V4-Pro-75-Gengar-Edition-RGB-Switch-Mec-nico-Layout-Ansi-Usb-c-_1770926736.jpg",
      descricao:
        "Teclado Mecânico Gamer Razer Blackwidow V4 Pro 75% Gengar Edition – RGB, Switch Mecânico, Layout Ansi, Usb-c.",
    },
    {
      nome: 'Smart TV TCL 32" HD QLED S5K',
      categoria: "TV",
      preco: "R$ 937,00",
      imagem:
        "https://http2.mlstatic.com/D_NQ_NP_2X_960494-MLA112210788972_062026-F.webp",
      descricao:
        "Tela QLED com HDR10, Google TV integrado, Dolby Audio e design sem bordas para uma experiência imersiva.",
    },
    {
      nome: 'Smart TV TCL 40" Full HD QLED',
      categoria: "TV",
      preco: "R$ 1.538,00",
      imagem:
        "https://http2.mlstatic.com/D_NQ_NP_2X_691006-MLA112210093376_062026-F.webp",
      descricao:
        "Tela Full HD QLED, Google TV, Wi-Fi Dual Band, Bluetooth 5.0 e múltiplas conexões HDMI.",
    },
    {
      nome: 'Smart TV AOC 32" Roku TV',
      categoria: "TV",
      preco: "R$ 934,27",
      imagem:
        "https://m.media-amazon.com/images/I/618HST9rp6L.AC_SL1000.jpg",
      descricao:
        "Roku TV integrada, Wi-Fi, compatível com Alexa e Google Assistente, design moderno sem bordas.",
    },
    {
      nome: 'Samsung Smart TV 50" Crystal UHD 4K',
      categoria: "TV",
      preco: "R$ 4.399,35",
      imagem:
        "https://m.media-amazon.com/images/I/71iGUDQvOYL.AC_SL1500.jpg",
      descricao:
        "Crystal UHD 4K, Xbox Cloud Gaming, Alexa integrada e qualidade de imagem impressionante.",
    },
    {
      nome: 'Smart TV TCL 65" QLED 4K P7K',
      categoria: "TV",
      preco: "R$ 2.164,00",
      imagem:
        "https://m.media-amazon.com/images/I/81AtIfydXvL.AC_SY300_SX300_QL70_ML2.jpg",
      descricao:
        "QLED 4K com Dolby Vision, Dolby Atmos, Google TV e design premium para máxima imersão.",
    },
        {
      nome: 'LG Smart TV 55" UHD 4K',
      categoria: "TV",
      preco: "R$ 2.799,90",
      imagem:
        "https://www.lg.com/content/dam/channel/wcms/br/images/tv/ua8550psa/new-galery/2-1600-ua8550.jpg/jcr:content/renditions/thum-1600x1062.jpeg?w=800",
      descricao:
        "Tela UHD 4K com HDR10 Pro, sistema WebOS 23, ThinQ AI e Alexa integrada para uma experiência inteligente.",
    },
    {
      nome: 'Philips Smart TV 43" Full HD',
      categoria: "TV",
      preco: "R$ 1.699,90",
      imagem:
        "https://m.media-amazon.com/images/I/61ClMfyPd+L.AC_SL1000.jpg",
      descricao:
        "Google TV integrada, Full HD, HDR, Wi-Fi e Bluetooth para acesso rápido aos seus aplicativos favoritos.",
    },
    {
      nome: 'TCL Smart TV 75" QLED 4K',
      categoria: "TV",
      preco: "R$ 4.999,90",
      imagem:
        "https://http2.mlstatic.com/D_NQ_NP_2X_839737-MLA113356249335_062026-F.webp",
      descricao:
        "Tela gigante de 75 polegadas com tecnologia QLED, Dolby Vision, HDR10+ e Google TV para máximo entretenimento.",
    },
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
      nome: "x200 ultra",
      categoria: "CELULARES",
      preco: "R$ 8.999",
      imagem:
        "https://www.rbaimportados.com/media/catalog/product/cache/3c2036041cbcde60e4487744e349f5b9/v/i/vivo-x200-ultra_rbaimportados.com_14__1.webp",
      descricao:
        "vivo X200 Ultra - 5G 6.78 AMOLED 2K+ Android 15 Snapdragon 8 Elite 256/512/1TB 200MP 8K IP68",
    },
    {
      nome: "Samsung S26 Ultra",
      categoria: "CELULARES",
      preco: "R$ 10.349,10",
      imagem:
        "https://samsungbrshop.vtexassets.com/arquivos/ids/278468-600-auto?v=639076206131900000",
      descricao:
        "Celular Samsung Galaxy S26 Ultra 5G, 512GB, 12GB RAM, Câmera Quádrupla, Tela Grande de 6.9 Preto",
    },
    {
      nome: "HUAWEI Mate XT ULTIMATE DESIGN",
      categoria: "CELULARES",
      preco: "R$ 32.999",
      imagem:
        "https://imgs.search.brave.com/3PGIm8BLECs6IMNDFw36A5v27eFTyBqAzHgYotCCg-A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hbHBo/YWdhZGdldC5jb20u/YmQvd3AtY29udGVu/dC91cGxvYWRzLzIw/MjUvMDgvSHVhd2Vp/LU1hdGUtWFQtVWx0/aW1hdGUtRGVzaWdu/LVByaWNlLWluLUJh/bmdsYWRlc2guanBn",
      descricao: "Único modelo com três telas do mundo.",
    },
    {
      nome: "Avell STORM 590X RTX 5090 | Intel Ultra 9",
      categoria: "GAMER",
      preco: "R$ 51.082,22",
      imagem:
        "https://eshop-api.avell.com.br/storage/resize/contain/_x500/5/catalog/productMedia/67f435269a4447222/691634637466f897.webp",
      descricao:
        "ntel® Core™ Ultra 9 275HX Nvidia GeForce® RTX 5090 (24GB GDDR7) 128GB [4x 32GB - 2x Dual Channel] Memória DDR5 SSD M.2 NVME 2TB - Geração 4 - [ 6.000 MB/s ] 18 QHD 2560x1600 - 240Hz / sRGB: 100% / Contraste: 1000:1 / Brilho 500 cd/m² Original Windows 11 Pro",
    },
    {
      nome: "Avell STORM 590X RTX 5090 | Intel Ultra 9",
      categoria: "GAMER",
      preco: "R$ 49.721,11",
      imagem:
        "https://eshop-api.avell.com.br/storage/resize/contain/_x500/5/catalog/productMedia/67f435269a4447222/691634637466f897.webp",
      descricao:
        "Intel® Core™ Ultra 9 275HX Nvidia GeForce® RTX 5090 (24GB GDDR7) 128GB [4x 32GB - 2x Dual Channel] Memória DDR5 SSD M.2 NVME 1TB - Geração 4 - [ 7.400 MB/s ] 18 QHD 2560x1600 - 240Hz / sRGB: 100% / Contraste: 1000:1 / Brilho 500 cd/m² Original Windows 11 Home Single Language",
    },
        {
      nome: 'Avell STORM 590X RTX 5090 | Intel Ultra 9',
      categoria: "GAMER",
      preco: "R$ 32.221,11",
      imagem:
        "https://eshop-api.avell.com.br/storage/resize/contain/_x500/5/catalog/productMedia/67f435269a4447222/691634637466f897.webp",
      descricao:
        "Intel® Core™ Ultra 9 275HX Nvidia GeForce® RTX 5090 (24GB GDDR7) 32GB [2x 16GB - Dual Channel] Memória DDR5 SSD M.2 NVME 512GB - Geração 4 - [ 3.500 MB/s ] Sem Armazenamento 2 Sem Armazenamento 3 Sem Armazenamento 4 18 QHD 2560x1600 - 240Hz / sRGB: 100% / Contraste: 1000:1 / Brilho 500 cd/m² Original Windows 11 Home Single Language",
    },
    {
      nome: "MSI SWORD 17",
      categoria: "GAMER",
      preco: "R$ 15.499,00",
      imagem:
        "https://images3.kabum.com.br/produtos/fotos/620563/notebook-gamer-msi-sword-17-hx-intel-ulttra-7-155h-16gb-ram-ssd-1tb-16-fhd-ips-qhd-240hz-rtx-4060-win-11h-preto-9s7-17t214-219_1730298524_gg.jpg",
      descricao:
        "Notebook Gamer MSI SWORD 17 HX Intel Core i7, 16GB RAM, SSD 1TB, 16 FHD, 240Hz, GeForce RTX 4060, Win 11H, Cinza - B14VFKG-242BR",
    },
].sort(() => Math.random() - 0.5);



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
