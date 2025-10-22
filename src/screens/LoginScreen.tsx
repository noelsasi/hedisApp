import React, { useMemo, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');

  const isValid = useMemo(
    () => /^\+?\d{10,14}$/.test(phone.replace(/\s/g, '')),
    [phone],
  );

  function handleContinue() {
    if (!isValid) return;
    // In real app, request OTP here; we navigate immediately for demo
    navigation.navigate('Otp', { phoneNumber: phone });
  }

  return (
    <View style={styles.root}>
      <ImageBackground
        style={styles.header}
        resizeMode="cover"
        source={{
          uri: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=1200',
        }}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputRow}>
          <View style={styles.ccBox}>
            <Text style={styles.ccText}>+91</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <Text style={styles.caption}>
          We will send you one time password (OTP)
        </Text>

        <Pressable
          onPress={handleContinue}
          disabled={!isValid}
          style={({ pressed }) => [
            styles.fab,
            !isValid ? styles.fabDisabled : null,
            pressed ? styles.fabPressed : null,
          ]}
        >
          <Text style={styles.fabText}>→</Text>
        </Pressable>
      </View>

      <View style={styles.waves} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f3f7ff' },
  header: { height: 260, backgroundColor: '#1E64F0' },
  card: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  inputRow: { flexDirection: 'row', width: '100%', alignItems: 'center' },
  ccBox: {
    height: 48,
    width: 64,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  ccText: { fontSize: 16, fontWeight: '600' },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  caption: { color: '#9E9E9E', marginTop: 12, marginBottom: 20 },
  fab: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: '#2D7CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabDisabled: { backgroundColor: '#9bbdf9' },
  fabPressed: { opacity: 0.85 },
  fabText: { color: '#fff', fontSize: 26, fontWeight: '600' },
  waves: { flex: 1 },
});
