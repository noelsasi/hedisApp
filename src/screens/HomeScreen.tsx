import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App.tsx';
import { colors, elevation, radius, spacing, typography } from '../theme';
import BottomNav from '../components/BottomNav.tsx';

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Reminder for your Medicine</Text>
        <Image
          source={require('../assets/images/homepage_hero.png')}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            <FeatureCard
              title="Medicine"
              emoji="💊"
              onPress={() => navigation.navigate('Medicine')}
            />
            <FeatureCard title="Nearby hospital" emoji="🏥" />
            <FeatureCard title="Ask question" emoji="❓" />
            <FeatureCard title="Medical records" emoji="🧾" badge="3" />
          </View>

          <Text style={styles.sectionTitle}>Reminder</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing.lg }}
          >
            <ReminderCard />
            <ReminderCard />
          </ScrollView>

          <View style={{ height: spacing.xxxl * 3 }} />
        </ScrollView>
      </View>
      <BottomNav />
    </>
  );
}

function FeatureCard({
  title,
  emoji,
  badge,
  onPress,
}: Readonly<{
  title: string;
  emoji: string;
  badge?: string;
  onPress?: () => void;
}>) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.feature, pressed && styles.pressed]}
    >
      <View style={styles.featureIconWrap}>
        <Text style={styles.featureEmoji}>{emoji}</Text>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.featureLabel}>{title}</Text>
    </Pressable>
  );
}

function ReminderCard() {
  return (
    <View style={styles.reminder}>
      <View style={styles.reminderIconSlot}>
        <Text style={styles.reminderPill}>💊</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.reminderTitle}>Amoxicillin</Text>
        <Text style={styles.reminderSub}>1 pill (250 mg) / 8 hr</Text>
        <Text style={styles.reminderTimes}>⏰ 9:00 · 17:00</Text>
      </View>
      <Pressable style={styles.checkBtn}>
        <Text style={styles.checkBtnText}>✓</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: spacing.xxl,
  },
  hero: {
    paddingTop: spacing.xxxl,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTitle: {
    width: '40%',
    fontSize: 21,
    color: colors.text,
    fontWeight: typography.weight.bold as any,
  },
  grid: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.xxl,
  },
  feature: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    ...elevation.card,
  },
  pressed: { opacity: 0.9 },
  featureIconWrap: {
    height: 56,
    width: 56,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF4FF', // subtle tint
    marginBottom: spacing.md,
  },
  featureEmoji: { fontSize: 24 },
  featureLabel: {
    fontSize: typography.subtitle,
    color: colors.text,
    fontWeight: typography.weight.semibold as any,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.primary,
    borderRadius: radius.round,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: typography.weight.bold as any,
  },
  sectionTitle: {
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
    color: colors.textMuted,
    fontSize: typography.subtitle,
    fontWeight: typography.weight.semibold as any,
  },
  reminderList: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing.lg,
    overflow: 'scroll',
  },
  reminder: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...elevation.card,
  },
  reminderIconSlot: {
    height: 72,
    width: 56,
    backgroundColor: colors.primaryWeak,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xl,
  },
  reminderPill: { fontSize: 24 },
  reminderTitle: {
    fontSize: typography.subtitle,
    color: colors.text,
    fontWeight: typography.weight.bold as any,
  },
  reminderSub: { marginTop: spacing.xs, color: colors.white },
  reminderTimes: {
    marginTop: spacing.md,
    color: colors.text,
    fontWeight: typography.weight.medium as any,
  },
  checkBtn: {
    height: 44,
    width: 44,
    borderRadius: radius.round,
    backgroundColor: colors.primaryStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xl,
  },
  checkBtnText: {
    color: colors.white,
    fontWeight: typography.weight.bold as any,
    fontSize: 18,
  },
});
