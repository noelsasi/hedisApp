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

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

const OTP_LENGTH = 4;
const TIMER_SECONDS = 120;

export default function OtpScreen({ route, navigation }: Props) {
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
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
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
        source={{
          uri: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=1200',
        }}
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
          disabled={code.replace(/\s/g, '').length !== OTP_LENGTH}
          style={({ pressed }) => [
            styles.fab,
            code.replace(/\s/g, '').length !== OTP_LENGTH
              ? styles.fabDisabled
              : null,
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
    top: 140,
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
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { color: '#637082', marginTop: 8 },
  metaRow: {
    marginTop: 12,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: { color: '#9E9E9E' },
  resend: { color: '#2D7CF6', fontWeight: '600' },
  resendDisabled: { color: '#AFC6FB' },
  fab: {
    marginTop: 20,
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
