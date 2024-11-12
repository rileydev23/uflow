import { View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "./ctx";
import { authLogin } from "@/services/auth.service";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSession();
  function handleContinue() {
    if (!email || !password) {
      return;
    }

    authLogin(email, password)
      .then((response) => {
        console.log(response);
        signIn(response.data.user, response.data.token);
        router.replace("/(tabs)");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#f5f5f5",

          borderRadius: 50,
          width: 45,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="mail-outline" size={26} color="black" />
      </View>
      <View>
        <Text style={styles.title}>Inicia sesión</Text>
        <Text style={styles.subtitle}>
          Ingresa tu correo electrónico para continuar.
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        cursorColor={"#007AFF"}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        keyboardType="default"
        autoCapitalize="none"
        secureTextEntry
        cursorColor={"#007AFF"}
      />

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    gap: 16,
  },
  title: { fontSize: 20, fontWeight: "600" },
  subtitle: {
    fontSize: 16,
    opacity: 0.5,
  },
  input: {
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  continueButton: {
    backgroundColor: "#007AFF",
    padding: 14,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  continueButtonText: { fontSize: 16, fontWeight: "500", color: "#fff" },
});
