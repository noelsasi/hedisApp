import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, elevation, radius, spacing, typography } from '../theme';
import type { RootStackParamList } from '../../App';
import AppHeader from '../components/AppHeader';

export type NewMedicinePayload = {
  id: string;
  name: string;
  type: 'tablet' | 'capsules' | 'drops' | 'others';
  color?: string;
  schedule: {
    morning: { time: string; count: number };
    afternoon: { time: string; count: number };
    evening: { time: string; count: number };
  };
  food: 'before' | 'after';
  durationDays: number;
};

const typeOptions: Array<{
  key: NewMedicinePayload['type'];
  label: string;
  emoji: string;
}> = [
  { key: 'tablet', label: 'Tablet', emoji: '💊' },
  { key: 'capsules', label: 'Capsules', emoji: '🧪' },
  { key: 'drops', label: 'Drops', emoji: '💧' },
  { key: 'others', label: 'Others', emoji: '💉' },
];

const colorOptions = [
  '#2ECC71',
  '#F5B041',
  '#E74C3C',
  '#1ABC9C',
  '#3498DB',
  '#E91E63',
  '#9B59B6',
  '#BDC3C7',
  '#F1C40F',
  '#000000',
];

function cycleTime(current: string, presets: string[]) {
  const idx = presets.indexOf(current);
  const next = (idx + 1) % presets.length;
  return presets[next];
}

export default function AddMedicineScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState<string>('Medicine 1');
  const [type, setType] = useState<NewMedicinePayload['type']>('tablet');
  const [color, setColor] = useState<string | undefined>(undefined);
  const [food, setFood] = useState<'before' | 'after'>('before');
  const [durationDays, setDurationDays] = useState<number>(5);
  const [schedule, setSchedule] = useState<NewMedicinePayload['schedule']>({
    morning: { time: '09:00', count: 1 },
    afternoon: { time: '13:30', count: 0 },
    evening: { time: '21:00', count: 1 },
  });

  const morningTimes = useMemo(
    () => ['06:30', '07:30', '08:30', '09:00', '09:30'],
    [],
  );
  const afternoonTimes = useMemo(
    () => ['12:30', '13:00', '13:30', '14:00', '14:30'],
    [],
  );
  const eveningTimes = useMemo(
    () => ['18:00', '19:00', '20:00', '21:00', '21:30'],
    [],
  );

  function save() {
    const payload: NewMedicinePayload = {
      id: String(Date.now()),
      name: name.trim() || 'Medicine',
      type,
      color,
      schedule,
      food,
      durationDays,
    };
    navigation.navigate('Medicine', { newMedicine: payload });
  }

  return (
    <>
      <AppHeader title="Medicine Reminder" />

      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {step === 1 ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Describe your medicine</Text>

              <Text style={styles.label}>Name of the medicine</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Medicine name"
                placeholderTextColor={colors.hint}
                style={styles.input}
              />

              <Text style={[styles.label, { marginTop: spacing.xl }]}>
                Type of medicine (Optional)
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: spacing.md,
                  marginTop: spacing.sm,
                }}
              >
                {typeOptions.map(opt => (
                  <Pressable
                    key={opt.key}
                    onPress={() => setType(opt.key)}
                    style={[
                      styles.typeChip,
                      type === opt.key && styles.typeChipActive,
                    ]}
                  >
                    <Text style={{ fontSize: 18 }}>{opt.emoji}</Text>
                    <Text
                      style={[
                        styles.typeText,
                        type === opt.key && styles.typeTextActive,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={[styles.label, { marginTop: spacing.xl }]}>
                Colour (Optional)
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: spacing.md,
                  marginTop: spacing.sm,
                }}
              >
                {colorOptions.map(c => (
                  <Pressable
                    key={c}
                    onPress={() => setColor(c)}
                    style={[
                      styles.colorDotWrap,
                      color === c && styles.colorDotActive,
                    ]}
                  >
                    <View style={[styles.colorDot, { backgroundColor: c }]} />
                  </Pressable>
                ))}
              </View>

              <Pressable style={styles.cta} onPress={() => setStep(2)}>
                <Text style={styles.ctaText}>Set Reminder</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Set Reminder</Text>

              <Text style={[styles.label, { marginTop: spacing.md }]}>
                Schedule & Dosage
              </Text>

              <TimeRow
                title="Morning"
                time={schedule.morning.time}
                count={schedule.morning.count}
                onTimePress={() =>
                  setSchedule(s => ({
                    ...s,
                    morning: {
                      ...s.morning,
                      time: cycleTime(s.morning.time, morningTimes),
                    },
                  }))
                }
                onMinus={() =>
                  setSchedule(s => ({
                    ...s,
                    morning: {
                      ...s.morning,
                      count: Math.max(0, s.morning.count - 1),
                    },
                  }))
                }
                onPlus={() =>
                  setSchedule(s => ({
                    ...s,
                    morning: { ...s.morning, count: s.morning.count + 1 },
                  }))
                }
              />

              <TimeRow
                title="Afternoon"
                time={schedule.afternoon.time}
                count={schedule.afternoon.count}
                onTimePress={() =>
                  setSchedule(s => ({
                    ...s,
                    afternoon: {
                      ...s.afternoon,
                      time: cycleTime(s.afternoon.time, afternoonTimes),
                    },
                  }))
                }
                onMinus={() =>
                  setSchedule(s => ({
                    ...s,
                    afternoon: {
                      ...s.afternoon,
                      count: Math.max(0, s.afternoon.count - 1),
                    },
                  }))
                }
                onPlus={() =>
                  setSchedule(s => ({
                    ...s,
                    afternoon: { ...s.afternoon, count: s.afternoon.count + 1 },
                  }))
                }
              />

              <TimeRow
                title="Evening"
                time={schedule.evening.time}
                count={schedule.evening.count}
                onTimePress={() =>
                  setSchedule(s => ({
                    ...s,
                    evening: {
                      ...s.evening,
                      time: cycleTime(s.evening.time, eveningTimes),
                    },
                  }))
                }
                onMinus={() =>
                  setSchedule(s => ({
                    ...s,
                    evening: {
                      ...s.evening,
                      count: Math.max(0, s.evening.count - 1),
                    },
                  }))
                }
                onPlus={() =>
                  setSchedule(s => ({
                    ...s,
                    evening: { ...s.evening, count: s.evening.count + 1 },
                  }))
                }
              />

              <View
                style={{
                  flexDirection: 'row',
                  gap: spacing.xl,
                  marginTop: spacing.xl,
                }}
              >
                <Pressable
                  onPress={() => setFood('before')}
                  style={[
                    styles.radio,
                    food === 'before' && styles.radioActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.radioText,
                      food === 'before' && styles.radioTextActive,
                    ]}
                  >
                    Before Food
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setFood('after')}
                  style={[styles.radio, food === 'after' && styles.radioActive]}
                >
                  <Text
                    style={[
                      styles.radioText,
                      food === 'after' && styles.radioTextActive,
                    ]}
                  >
                    After Food
                  </Text>
                </Pressable>
              </View>

              <Text style={[styles.label, { marginTop: spacing.xl }]}>
                Duration
              </Text>
              <Pressable
                onPress={() =>
                  setDurationDays(d => (d === 5 ? 7 : d === 7 ? 14 : 5))
                }
                style={styles.dropdown}
              >
                <Text style={styles.dropdownText}>{durationDays} Days</Text>
              </Pressable>

              <Pressable
                style={[styles.cta, { marginTop: spacing.xxl }]}
                onPress={save}
              >
                <Text style={styles.ctaText}>Save Medicine</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

function TimeRow({
  title,
  time,
  count,
  onTimePress,
  onMinus,
  onPlus,
}: Readonly<{
  title: string;
  time: string;
  count: number;
  onTimePress: () => void;
  onMinus: () => void;
  onPlus: () => void;
}>) {
  return (
    <View style={styles.timeRow}>
      <Text style={styles.timeRowIcon}>
        {title === 'Morning' ? '🌤️' : title === 'Afternoon' ? '☀️' : '🌙'}
      </Text>
      <View style={{ width: 88 }}>
        <Pressable onPress={onTimePress}>
          <Text style={styles.timeValue}>{time}</Text>
        </Pressable>
      </View>
      <View style={styles.counterWrap}>
        <Pressable onPress={onMinus} style={styles.counterBtn}>
          <Text style={styles.counterBtnText}>−</Text>
        </Pressable>
        <Text style={styles.counterValue}>{count}</Text>
        <Pressable onPress={onPlus} style={styles.counterBtn}>
          <Text style={styles.counterBtnText}>＋</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xxl },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    ...elevation.card,
  },
  cardTitle: {
    fontSize: typography.subtitle,
    color: colors.text,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing.lg,
  },
  label: { color: colors.textMuted },
  input: {
    marginTop: spacing.sm,
    height: 48,
    borderBottomWidth: 1,
    borderColor: colors.border,
    fontSize: typography.input,
    color: colors.text,
  },
  typeChip: {
    backgroundColor: '#F2F5FA',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  typeChipActive: { backgroundColor: colors.text },
  typeText: { marginTop: spacing.xs, color: colors.textMuted },
  typeTextActive: { color: colors.white },
  colorDotWrap: {
    height: 36,
    width: 36,
    borderRadius: radius.round,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorDotActive: { borderColor: colors.text },
  colorDot: { height: 24, width: 24, borderRadius: radius.round },
  cta: {
    marginTop: spacing.xxl,
    backgroundColor: colors.primaryStrong,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  ctaText: {
    color: colors.white,
    fontWeight: typography.weight.bold as any,
    fontSize: typography.subtitle,
  },
  timeRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeRowIcon: { fontSize: 18, width: 28 },
  timeValue: {
    color: colors.text,
    fontWeight: typography.weight.bold as any,
  },
  counterWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  counterBtn: {
    height: 32,
    width: 32,
    borderRadius: radius.round,
    backgroundColor: '#EEF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnText: { color: colors.text, fontSize: 18 },
  counterValue: { minWidth: 12, textAlign: 'center', color: colors.text },
  radio: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.round,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  radioActive: { backgroundColor: '#EEF4FF', borderColor: 'transparent' },
  radioText: { color: colors.textMuted },
  radioTextActive: {
    color: colors.text,
    fontWeight: typography.weight.medium as any,
  },
  dropdown: {
    marginTop: spacing.sm,
    backgroundColor: '#F2F5FA',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    alignSelf: 'flex-start',
  },
  dropdownText: { color: colors.text },
});
