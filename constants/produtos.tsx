export interface Produto {
  nome: string;
  categoria: string;
  preco: string;
  imagem: string;
  descricao: string;
  quantidade?: number;
}

const produtos: Produto[] = [
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
    nome: "Notebook Acer Nitro V15",
    categoria: "NOTEBOOK",
    preco: "R$ 8.999,00",
    imagem:
      "https://http2.mlstatic.com/D_NQ_NP_2X_933021-MLA99446594058_112025-F.webp",
    descricao:
      "Notebook Acer Nitro V15 com Intel Core i5-13420H, 16GB DDR5, NVIDIA GeForce RTX 4050, SSD de 512GB, tela de 15,6 polegadas 165Hz e Windows 11.",
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
    categoria: "NOTEBOOK",
    preco: "R$ 9.499,90",
    imagem:
      "https://cdn.awsli.com.br/2500x2500/2757/2757071/produto/332437926/0_aemxct3bzapta_prd_1500_1-jpg-quoh4k92ym.webp",
    descricao:
      "MacBook Air equipado com chip Apple M3, tela Liquid Retina, SSD de 512GB e bateria para o dia inteiro.",
  },

  {
    nome: "MSI Katana 15 RTX 4060",
    categoria: "NOTEBOOK",
    preco: "R$ 8.199,90",
    imagem:
      "https://i5.walmartimages.com/seo/MSI-Katana-15-6-Gaming-Laptop-144Hz-FHD-Intel-Core-i7-13620H-NVIDIA-GeForce-RTX-4060-8GB-16GB-DDR5-Memory-1TB-NVMe-SSD-Windows-11-Black-B13VFK-817US_19d1ab0a-edde-44d9-826c-b8e9798ae11b.2ccb79676bb85cefcb7bb917dcbef1cc.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
    descricao:
      "Notebook Gamer MSI Katana com Intel Core i7, RTX 4060, 16GB de RAM, SSD de 1TB e tela de 144Hz.",
  },

  {
    nome: "MSI SWORD 17",
    categoria: "NOTEBOOK",
    preco: "R$ 15.499,00",
    imagem:
      "https://images3.kabum.com.br/produtos/fotos/620563/notebook-gamer-msi-sword-17-hx-intel-ulttra-7-155h-16gb-ram-ssd-1tb-16-fhd-ips-qhd-240hz-rtx-4060-win-11h-preto-9s7-17t214-219_1730298524_gg.jpg",
    descricao:
      "Notebook Gamer MSI SWORD 17 HX Intel Core i7, 16GB RAM, SSD 1TB, 16 FHD, 240Hz, GeForce RTX 4060, Windows 11.",
  },

  {
    nome: "Computador PC Gamer Completo",
    categoria: "Computador",
    preco: "R$ 2.249,90",
    imagem:
      "https://images8.kabum.com.br/produtos/fotos/sync_mirakl/646348/xlarge/Computador-PC-Gamer-Completo-Tob-Intel-Core-I7-SSD-480GB-16gb-Gabinete-Aqu-rio-Teclado-Mouse-Mouse-Pad-E-Headset-Gamer-Monitor-19-WINDOWS-10-Pro-Trial_1760704454.jpg",
    descricao:
      "Intel Core i7, SSD 480GB, 16GB de RAM, gabinete, teclado, mouse, mouse pad, headset gamer e monitor de 19 polegadas.",
  },

  {
    nome: "PC Gamer Studiopc Tiamat",
    categoria: "Computador",
    preco: "R$ 61.999,00",
    imagem:
      "https://images5.kabum.com.br/produtos/fotos/sync_mirakl/1033415/xlarge/PC-Gamer-Studiopc-Tiamat-Ryzen-7-9800x3d-32GB-RAM-RTX-5080-16GB-SSD-1TB-Fonte-850w-Water-Cooler-360mm-5-Fans-RGB-Windows-11-Pro-8565432_1777475013.jpg",
    descricao:
      "Ryzen 7 9800X3D, 32GB RAM, RTX 5080 16GB, SSD 1TB, fonte 850W, Water Cooler 360mm, 5 Fans RGB e Windows 11 Pro.",
  },

  {
    nome: "PC Gamer Aquário",
    categoria: "Computador",
    preco: "R$ 45.799,00",
    imagem:
      "https://images4.kabum.com.br/produtos/fotos/sync_mirakl/796624/xlarge/PC-Gamer-Aqu-rio-Intel-i7-14700KF-RTX-5080-64gb-Ddr5-Nvme-2TB-Kalango-Games_1775947410.png",
    descricao:
      "Intel i7 14700KF, RTX 5080, 64GB DDR5 e NVMe de 2TB.",
  },

  {
    nome: "PC Gamer AMD Aquário",
    categoria: "Computador",
    preco: "R$ 32.799,00",
    imagem:
      "https://images1.kabum.com.br/produtos/fotos/sync_mirakl/725141/xlarge/PC-Gamer-Amd-Aqu-rio-Ryzen-7-9800x3d-RTX-5070-Ti-32gb-Ddr5-2TB-Nvme-W11-Kalango-Games_1775750314.png",
    descricao:
      "Ryzen 7 9800X3D, RTX 5070 Ti, 32GB DDR5, 2TB NVMe e Windows 11.",
  },

  {
    nome: "PC Workstation",
    categoria: "Computador",
    preco: "R$ 59.999,00",
    imagem:
      "https://images1.kabum.com.br/produtos/fotos/sync_mirakl/796621/xlarge/PC-Workstation-Intel-i9-14900KF-RTX-5080-128GB-Ddr5-Nvme-4TB-W11-Kalango-Games_1776040112.png",
    descricao:
      "Intel i9 14900KF, RTX 5080, 128GB DDR5, NVMe de 4TB e Windows 11.",
  },

  {
    nome: "PC Gamer Completo",
    categoria: "Computador",
    preco: "R$ 3.799,00",
    imagem:
      "https://images7.kabum.com.br/produtos/fotos/sync_mirakl/684007/xlarge/PC-Gamer-Completo-Ryzen-5-5600gt-16gb-Ddr4-SSD-480GB-500w-80-Plus-PCgt13-e_1779735227.png",
    descricao:
      "Ryzen 5 5600GT, 16GB DDR4, SSD 480GB e fonte 500W 80 Plus.",
  },

  {
    nome: "PC Gamer Completo Tob",
    categoria: "Computador",
    preco: "R$ 2.479,98",
    imagem:
      "https://images5.kabum.com.br/produtos/fotos/sync_mirakl/501425/xlarge/Pc-Gamer-Completo-Tob-Intel-Core-I7-16GB-VGA-GT730-4GB-SSD-960GB-Windows-10-Pro-Trial-Monitor-21-5-Teclado-E-Mouse-Mouse-Pad-Headset_1775478813.jpg",
    descricao:
      "Intel Core i7, 16GB, VGA GT730 4GB, SSD 960GB, Windows 10, monitor 21,5, teclado, mouse, mouse pad e headset.",
  },

  {
    nome: "PC Gamer",
    categoria: "Computador",
    preco: "R$ 26.706,60",
    imagem:
      "https://images6.kabum.com.br/produtos/fotos/sync_mirakl/697206/xlarge/PC-Gamer-Ryzen-7-9800x3d-RTX-4070-Super-32gb-Ddr5-RGB-SSD-Nvme-2TB-1000w-80-Plus-Gold-Toppc01-e_1775063612.webp",
    descricao:
      "Ryzen 7 9800X3D, RTX 4070 Super, 32GB DDR5 RGB, SSD NVMe 2TB e fonte 1000W 80 Plus Gold.",
  },

  {
    nome: "Headset Gamer Redragon",
    categoria: "Periférico",
    preco: "R$ 377,64",
    imagem:
      "https://images8.kabum.com.br/produtos/fotos/227818/headset-gamer-redragon-zeus-chroma-mk-ii-rgb-surround-7-1-usb-drivers-53mm-preto-vermelho-h510-rgb_1631555309_gg.jpg",
    descricao:
      "Headset Gamer Redragon Zeus X, Chroma Mk.II, RGB, Som Surround 7.1, Drivers 53mm e USB.",
  },

  {
    nome: "Teclado Mecânico",
    categoria: "Periférico",
    preco: "R$ 600,00",
    imagem:
      "https://http2.mlstatic.com/D_NQ_NP_2X_876306-MLB115111396927_072026-F-teclado-mecnico-aula-f75-sem-fio-tri-mode-75-hotswap-rgb.webp",
    descricao:
      "Teclado Mecânico Aula F75 Sem Fio Tri Mode 75% Hotswap RGB.",
  },

  {
    nome: "Mouse Gamer Sem Fio",
    categoria: "Periférico",
    preco: "R$ 249,90",
    imagem:
      "https://images0.kabum.com.br/produtos/fotos/sync_mirakl/883180/xlarge/Mouse-Gamer-Sem-Fio-Attack-Shark-X11-22000-Dpi-59g-Tri-mode-Com-Dock-Magn-tico-RGB-Preto_1772819622.jpg",
    descricao:
      "Mouse Gamer Sem Fio Attack Shark X11, 22000 DPI, 59g, Tri-mode, Dock Magnético e RGB.",
  },

  {
    nome: "Microfone Dinâmico Gamer",
    categoria: "Periférico",
    preco: "R$ 454,53",
    imagem:
      "https://images2.kabum.com.br/produtos/fotos/592292/microfone-dinamico-gamer-fifine-ampligame-rgb-cardioide-usb-c-anti-ruido-para-streaming-preto-am8_1733503402_gg.jpg",
    descricao:
      "Microfone Dinâmico Gamer Fifine Ampligame, RGB, Cardióide, USB-C e Anti-Ruído.",
  },

  {
    nome: "Mousepad",
    categoria: "Periférico",
    preco: "R$ 117,64",
    imagem:
      "https://images0.kabum.com.br/produtos/fotos/103960/mousepad-gamer-rise-mode-rgb-estendido-900x300mm-preto-rm-mp-07-rgb_1747227673_gg.jpg",
    descricao:
      "Mousepad Gamer Rise Mode RGB, Estendido 900x300mm, Preto.",
  },

  {
    nome: "Mesa Digitalizadora",
    categoria: "Periférico",
    preco: "R$ 39.882,35",
    imagem:
      "https://images0.kabum.com.br/produtos/fotos/532470/mesa-digitalizadora-com-tela-wacom-cintiq-pro-22-caneta-ressonancia-eletromagnetica-5080-lpi-tela-21-5-4k-usb-c-preto-dth227k0a1_1713209881_gg.jpg",
    descricao:
      "Mesa Digitalizadora Wacom Cintiq Pro 22, tela 21,5 polegadas 4K e USB-C.",
  },

  {
    nome: "Óculos VR",
    categoria: "Periférico",
    preco: "R$ 12.989,40",
    imagem:
      "https://images4.kabum.com.br/produtos/fotos/628374/oculos-vr-pny-pico-neo-3-pro-eye-bluetooth-wi-fi-256gb-4k-branco-phs-n3-pe1018580_1725637511_gg.jpg",
    descricao:
      "Óculos VR PNY PICO Neo 3 Pro Eye, Bluetooth, Wi-Fi, 256GB e 4K.",
  },

  {
    nome: "Teclado Mecânico Razer",
    categoria: "Periférico",
    preco: "R$ 5.999,90",
    imagem:
      "https://images0.kabum.com.br/produtos/fotos/sync_mirakl/883110/xlarge/Teclado-Mec-nico-Gamer-Razer-Blackwidow-V4-Pro-75-Gengar-Edition-RGB-Switch-Mec-nico-Layout-Ansi-Usb-c-_1770926736.jpg",
    descricao:
      "Teclado Mecânico Gamer Razer Blackwidow V4 Pro 75% Gengar Edition, RGB e USB-C.",
  },
];

export default produtos;