import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, elevation, radius, spacing, typography } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import AppHeader from '../components/AppHeader';

type Day = {
  key: string;
  label: string; // e.g., Sat
  date: string; // 01
};

type MedicineItem = {
  id: string;
  name: string;
  note: string; // e.g., 1 capsule, after meal | Morning
  icon: string; // emoji for placeholder
  taken?: boolean;
  tone?: 'morning' | 'evening';
};

export default function MedicineScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();

  const incoming = route.params?.newMedicine as
    | import('./AddMedicineScreen').NewMedicinePayload
    | undefined;

  const incomingItems: MedicineItem[] = incoming
    ? ([
        incoming.schedule.morning.count > 0
          ? {
              id: `${incoming.id}-m`,
              name: incoming.name,
              note: `${incoming.schedule.morning.count} unit${
                incoming.schedule.morning.count > 1 ? 's' : ''
              }, ${incoming.food} meal | Morning`,
              icon: '💊',
              taken: false,
              tone: 'morning',
            }
          : (null as any),
        incoming.schedule.evening.count > 0
          ? {
              id: `${incoming.id}-e`,
              name: incoming.name,
              note: `${incoming.schedule.evening.count} unit${
                incoming.schedule.evening.count > 1 ? 's' : ''
              }, ${incoming.food} meal | Evening`,
              icon: '💊',
              taken: false,
              tone: 'evening',
            }
          : (null as any),
      ].filter(Boolean) as MedicineItem[])
    : [];

  const morning: MedicineItem[] = [
    {
      id: 'm1',
      name: 'Omega-3 Fish Oil',
      note: '1 capsule, after meal | Morning',
      icon: '💊',
      taken: true,
      tone: 'morning',
    },
    {
      id: 'm2',
      name: 'Magnesium Citrate 200',
      note: '1 capsule, after meal | Morning',
      icon: '🧪',
      taken: false,
      tone: 'morning',
    },
  ];

  const evening: MedicineItem[] = [
    {
      id: 'e1',
      name: 'Omega-3 Fish Oil',
      note: '1 capsule, after meal | Morning',
      icon: '💊',
      taken: true,
      tone: 'evening',
    },
    {
      id: 'e2',
      name: 'Omega-3 Fish Oil',
      note: '1 capsule, after meal | Morning',
      icon: '💊',
      taken: true,
      tone: 'evening',
    },
    {
      id: 'e3',
      name: 'Magnesium Citrate 200',
      note: '1 capsule, after meal | Morning',
      icon: '🧪',
      taken: false,
      tone: 'evening',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AppHeader
        title="Medicine Time"
        rightAction={{
          text: '+ New',
          onPress: () => navigation.navigate('AddMedicine'),
        }}
      />
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionHeadline}>Today’s Medicine</Text>

          <Text style={styles.subsection}>Morning</Text>
          <View style={{ gap: spacing.md }}>
            {(incomingItems.some(i => i.tone === 'morning')
              ? [incomingItems.find(i => i.tone === 'morning') as MedicineItem]
              : []
            )
              .concat(morning)
              .map(item => (
                <MedicineCard key={item.id} item={item} tone="morning" />
              ))}
          </View>

          <Text style={[styles.subsection, { marginTop: spacing.xxl }]}>
            Evening
          </Text>
          <View style={{ gap: spacing.md, marginBottom: spacing.xxxl * 3 }}>
            {(incomingItems.some(i => i.tone === 'evening')
              ? [incomingItems.find(i => i.tone === 'evening') as MedicineItem]
              : []
            )
              .concat(evening)
              .map(item => (
                <MedicineCard key={item.id} item={item} tone="evening" />
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function MedicineCard({
  item,
  tone,
}: Readonly<{ item: MedicineItem; tone: 'morning' | 'evening' }>) {
  const tickBg = tone === 'morning' ? '#EEF4E0' : '#DDE9FF';
  const takenBg = tone === 'morning' ? '#E7F0C5' : '#CFE1FF';
  return (
    <View style={[styles.card, { backgroundColor: '#fff' }]}>
      <View style={styles.iconSlot}>
        <Text style={{ fontSize: 22 }}>{item.icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardNote}>{item.note}</Text>
      </View>
      <View
        style={[
          styles.tick,
          { backgroundColor: item.taken ? takenBg : tickBg },
        ]}
      >
        <Text style={{ fontSize: 16 }}>{item.taken ? '✔︎' : '○'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xxl },
  sectionHeadline: {
    fontSize: typography.title,
    color: colors.text,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing.lg,
  },
  subsection: {
    color: colors.textMuted,
    fontSize: typography.subtitle,
    fontWeight: typography.weight.semibold as any,
    marginBottom: spacing.lg,
  },
  dayChip: {
    width: 72,
    height: 92,
    borderRadius: radius.lg,
    backgroundColor: '#F2F5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayChipActive: {
    backgroundColor: colors.text,
  },
  dayDate: {
    fontSize: typography.title,
    color: colors.text,
    fontWeight: typography.weight.bold as any,
  },
  dayDateActive: { color: colors.white },
  dayLabel: { marginTop: spacing.xs, color: colors.textMuted },
  dayLabelActive: { color: colors.white },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.xl,
    padding: spacing.xxl,
    ...elevation.card,
  },
  iconSlot: {
    height: 56,
    width: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xl,
  },
  cardTitle: {
    fontSize: typography.subtitle,
    color: colors.text,
    fontWeight: typography.weight.bold as any,
  },
  cardNote: { marginTop: spacing.xs, color: colors.textMuted },
  tick: {
    height: 44,
    width: 44,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xl,
  },
});
