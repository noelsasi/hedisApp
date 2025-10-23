import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { colors, elevation, radius, spacing, typography } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

export default function BottomNav() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        <Pressable
          style={styles.item}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.icon}>🏠</Text>
        </Pressable>
        <Pressable style={styles.item}>
          <Text style={styles.icon}>🔍</Text>
        </Pressable>
        <Pressable
          style={styles.item}
          onPress={() => navigation.navigate('AddMedicine')}
        >
          <View style={styles.fab}>
            <Text style={styles.fabPlus}>＋</Text>
          </View>
        </Pressable>
        <Pressable style={styles.item}>
          <Text style={styles.icon}>📅</Text>
        </Pressable>
        <Pressable style={styles.item}>
          <Text style={styles.icon}>👤</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    flexDirection: 'row',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xs,
    justifyContent: 'space-between',
    alignItems: 'center',
    ...elevation.card,
  },
  item: { padding: spacing.lg },
  icon: { fontSize: 22, color: colors.text },
  fabWrap: {
    position: 'absolute',
    top: -28,
    alignSelf: 'center',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  fab: {
    height: 56,
    width: 56,
    borderRadius: radius.round,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    ...elevation.card,
  },
  fabPlus: {
    color: colors.white,
    fontSize: 30,
    fontWeight: typography.weight.bold as any,
  },
});
