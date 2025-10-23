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
import {
  colors,
  elevation,
  layout,
  radius,
  spacing,
  typography,
} from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Readonly<Props>) {
  const [phone, setPhone] = useState('');

  const isValid = useMemo(
    () => /^\+?\d{10,14}$/.test(phone.replaceAll(/\s/g, '')),
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
        source={require('../assets/images/login.png')}
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
            isValid ? null : styles.fabDisabled,
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
  root: { flex: 1, backgroundColor: colors.background },
  header: { height: 450, backgroundColor: colors.primary },
  card: {
    position: 'absolute',
    bottom: 300,
    left: spacing.xxl,
    right: spacing.xxl,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...elevation.card,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.title,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing.lg,
  },
  inputRow: { flexDirection: 'row', width: '100%', alignItems: 'center' },
  ccBox: {
    height: layout.inputHeight,
    width: 64,
    borderWidth: 1,
    borderColor: colors.border,
    borderRightWidth: 0,
    borderTopLeftRadius: radius.sm,
    borderBottomLeftRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  ccText: {
    fontSize: typography.input,
    fontWeight: typography.weight.semibold as any,
  },
  input: {
    flex: 1,
    height: layout.inputHeight,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopRightRadius: radius.sm,
    borderBottomRightRadius: radius.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
  },
  caption: {
    color: colors.hint,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  fab: {
    height: layout.fabSize,
    width: layout.fabSize,
    borderRadius: radius.round,
    backgroundColor: colors.primaryStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabDisabled: { backgroundColor: colors.primaryWeak },
  fabPressed: { opacity: 0.85 },
  fabText: {
    color: colors.white,
    fontSize: typography.icon,
    fontWeight: typography.weight.semibold as any,
  },
  waves: { flex: 1 },
});
