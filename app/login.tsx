import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Login() {
  const [cadastro, setCadastro] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function entrar() {
    if (!email.trim()) {
      Alert.alert("Erro", "Digite seu e-mail para entrar.");
      return;
    }

    try {
      await AsyncStorage.setItem(
        "usuario",
        JSON.stringify({
          nome: nome.trim() || undefined,
          email: email.trim(),
        })
      );

      Alert.alert("Sucesso", "Login realizado com sucesso!");

      router.replace("/");
    } catch {
      Alert.alert("Erro", "Não foi possível realizar o login.");
    }
  }

  async function cadastrar() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert("Erro", "Preencha nome e e-mail.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      await AsyncStorage.setItem(
        "usuario",
        JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
        })
      );

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");

      router.replace("/");
    } catch {
      Alert.alert("Erro", "Não foi possível cadastrar.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.titulo}>
            Assistência Técnica Forja
          </Text>

          <Text style={styles.subtitulo}>
            {cadastro ? "Crie sua conta" : "Entre na sua conta"}
          </Text>

          {cadastro && (
            <>
              <Text style={styles.label}>Nome Completo</Text>

              <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
                style={styles.input}
              />
            </>
          )}

          <Text style={styles.label}>E-mail</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.label}>Senha</Text>

          <TextInput
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            secureTextEntry
            style={styles.input}
          />

          {cadastro && (
            <>
              <Text style={styles.label}>Confirmar Senha</Text>

              <TextInput
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                placeholder="Confirme sua senha"
                secureTextEntry
                style={styles.input}
              />
            </>
          )}

          <TouchableOpacity
            style={styles.botao}
            onPress={cadastro ? cadastrar : entrar}
          >
            <Text style={styles.botaoTexto}>
              {cadastro ? "Cadastrar" : "Entrar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCadastro(!cadastro)}
          >
            <Text style={styles.link}>
              {cadastro
                ? "Já possui uma conta? Entrar"
                : "Não possui conta? Cadastre-se"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.voltar}
            onPress={() => router.back()}
          >
            <Text style={styles.voltarTexto}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    elevation: 8,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e30613",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },

  label: {
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#fafafa",
  },

  botao: {
    marginTop: 25,
    backgroundColor: "#e30613",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },

  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#e30613",
    fontWeight: "bold",
  },

  voltar: {
    marginTop: 15,
    alignItems: "center",
  },

  voltarTexto: {
    color: "#555",
    fontSize: 16,
    fontWeight: "600",
  },
});