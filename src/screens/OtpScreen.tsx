import React, { useEffect, useMemo, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import OtpInput from '../components/OtpInput';
import {
  colors,
  elevation,
  layout,
  radius,
  spacing,
  typography,
} from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

const OTP_LENGTH = 4;
const TIMER_SECONDS = 120;

export default function OtpScreen({ route, navigation }: Readonly<Props>) {
  const { phoneNumber } = route.params;
  const [code, setCode] = useState(''.padEnd(OTP_LENGTH, ''));
  const [seconds, setSeconds] = useState(TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function handleSubmit() {
    // In real app, verify OTP via API then navigate
    navigation.reset({ index: 0, routes: [{ name: 'Home' as never }] });
  }

  function handleResend() {
    if (!canResend) return;
    setSeconds(TIMER_SECONDS);
    setCanResend(false);
    // Call resend API here
  }

  const timeLabel = useMemo(() => {
    const mm = String(Math.floor(seconds / 60)).padStart(1, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  }, [seconds]);

  return (
    <View style={styles.root}>
      <ImageBackground
        style={styles.header}
        resizeMode="cover"
        source={require('../assets/images/otp.png')}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Confirm OTP</Text>
        <Text style={styles.subtitle}>Enter the OTP sent to {phoneNumber}</Text>

        <View style={{ height: 16 }} />
        <OtpInput
          length={OTP_LENGTH}
          value={code}
          onChangeValue={setCode}
          onComplete={() => {}}
        />
        <View style={{ height: 10 }} />

        <View style={styles.metaRow}>
          <Text style={styles.time}>Time Remaining {timeLabel}</Text>
          <Pressable onPress={handleResend} disabled={!canResend}>
            <Text style={[styles.resend, !canResend && styles.resendDisabled]}>
              Resend
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleSubmit}
          disabled={code.replaceAll(/\s/g, '').length !== OTP_LENGTH}
          style={({ pressed }) => [
            styles.fab,
            code.replaceAll(/\s/g, '').length === OTP_LENGTH
              ? null
              : styles.fabDisabled,
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
  },
  subtitle: { color: colors.textMuted, marginTop: spacing.sm },
  metaRow: {
    marginTop: spacing.md,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: { color: colors.hint },
  resend: {
    color: colors.primaryStrong,
    fontWeight: typography.weight.semibold as any,
  },
  resendDisabled: { color: '#AFC6FB' },
  fab: {
    marginTop: spacing.xl,
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
