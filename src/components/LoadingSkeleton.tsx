import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, radius } from '../design-system/tokens';

interface LoadingSkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export function LoadingSkeleton({
  width = '100%',
  height = 20,
  borderRadius = radius.sm,
  style,
}: LoadingSkeletonProps) {
  const { colors } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.neutral200,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function ExamCardSkeleton() {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <LoadingSkeleton width={100} height={14} />
          <LoadingSkeleton width="80%" height={18} style={{ marginTop: spacing.sm }} />
        </View>
        <LoadingSkeleton width={60} height={24} borderRadius={radius.sm} />
      </View>

      <LoadingSkeleton width="100%" height={16} style={{ marginTop: spacing.md }} />
      <LoadingSkeleton width="70%" height={16} style={{ marginTop: spacing.xs }} />

      <View style={[styles.infoRow, { marginTop: spacing.md }]}>
        <LoadingSkeleton width={80} height={14} />
        <LoadingSkeleton width={80} height={14} />
        <LoadingSkeleton width={80} height={14} />
      </View>

      <LoadingSkeleton
        width="100%"
        height={40}
        borderRadius={radius.md}
        style={{ marginTop: spacing.lg }}
      />
    </View>
  );
}

export function ExamListSkeleton() {
  return (
    <>
      {[1, 2, 3].map((key) => (
        <ExamCardSkeleton key={key} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
  card: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardHeaderLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

