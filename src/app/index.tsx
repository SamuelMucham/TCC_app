import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { TouchableOpacity, Text, View, Image } from "react-native";

export default function Home() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          backgroundColor: "#e30613",
          padding: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          TECFLOW
        </Text>

        <Text
          style={{
            color: "#fff",
            marginTop: 8,
          }}
        >
          A Maior Assistência Técnica do Brasil
        </Text>

        <Text
          style={{
            color: "#fff",
            marginTop: 4,
          }}
        >
          Desde 2026
        </Text>
      </View>

      <View style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Serviços
        </Text>

        <Link href="/explore" asChild>
          <TouchableOpacity
            style={{
              backgroundColor: "#e30613",
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Explorar Serviços
            </Text>
          </TouchableOpacity>
        </Link>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginVertical: 20,
          }}
        >
          Ofertas
        </Text>

        <View
          style={{
            backgroundColor: "#141414",
            borderRadius: 16,
            padding: 12,
            marginBottom: 15,
          }}
        >
          <Image
            source={{
              uri: "https://br.redmagic.gg/cdn/shop/files/images_view.png?v=1761828429&width=960",
            }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 12,
            }}
          />

          <Text
            style={{
              color: "#fff",
              marginTop: 10,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            REDMAGIC 11 PRO
          </Text>

          <Text
            style={{
              color: "#e30613",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            R$ 5.299,00
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#141414",
            borderRadius: 16,
            padding: 12,
          }}
        >
          <Image
            source={{
              uri: "https://imgs.search.brave.com/oEaEKi_ye08E3ak8N1T0sUJ-me8t22O4eFC5rFAELpg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zMi10/ZWNodHVkby5nbGJp/bWcuY29tLzBVYWhm/QnVLRmtqcDVqX181/M1NwblE1dFRWOD0v/MHgwOjQwMzJ4MzAy/NC85ODR4MC9zbWFy/dC9maWx0ZXJzOnN0/cmlwX2ljYygpL2ku/czMuZ2xiaW1nLmNv/bS92MS9BVVRIXzA4/ZmJmNDhiYzA1MjQ4/Nzc5NDNmZTg2ZTQz/MDg3ZTdhL2ludGVy/bmFsX3Bob3Rvcy9i/cy8yMDI0L3cvbS9k/MzZXVVFTOVdMZjlJ/T1psZFBCUS9nYWxh/eHktczI0LXVsdHJh/LWNhbWVyYXMuanBn",
            }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 12,
            }}
          />

          <Text
            style={{
              color: "#fff",
              marginTop: 10,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Samsung S24 Ultra
          </Text>

          <Text
            style={{
              color: "#e30613",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            R$ 9.974,05
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}