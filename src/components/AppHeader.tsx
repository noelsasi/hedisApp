import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { colors, radius, spacing, typography } from '../theme';

function AppHeader({
  title,
  rightAction,
}: Readonly<{
  title: string;
  rightAction?: { text: string; onPress: () => void };
}>) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.headerCard}>
      <View style={styles.headerTitleWrap}>
        <View style={styles.headerTitle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.headerTitleButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitleText}>{title}</Text>
        </View>
        {rightAction?.onPress && (
          <Pressable onPress={rightAction.onPress}>
            <Text style={styles.headerRightActionButton}>
              {rightAction.text}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default AppHeader;

const styles = StyleSheet.create({
  headerCard: {
    paddingTop: 80,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    borderBottomLeftRadius: radius.xxxl,
    borderBottomRightRadius: radius.xxxl,
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xxl,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerTitleText: {
    fontSize: typography.title,
    color: colors.text,
    fontWeight: typography.weight.bold as any,
  },
  headerTitleButton: {
    fontSize: typography.icon,
    color: colors.textMuted,
    fontWeight: typography.weight.bold as any,
    marginRight: spacing.sm,
  },
  headerRightActionButton: {
    fontSize: typography.subtitle,
    color: colors.text,
    fontWeight: typography.weight.bold as any,
    marginLeft: 'auto',
  },
});
