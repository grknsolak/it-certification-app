import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, typography, radius, shadows } from '../design-system/tokens';

type CategorySelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CategorySelection'>;

interface Props {
  navigation: CategorySelectionScreenNavigationProp;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - spacing.md * 3) / 2;

export default function CategorySelectionScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const categories = [
    {
      id: 'cloud',
      name: 'Cloud Computing',
      icon: '☁️',
      gradient: ['#3B82F6', '#2563EB'],
      exams: 8,
      description: 'AWS, Google Cloud, Azure certifications',
    },
    {
      id: 'security',
      name: 'Cybersecurity',
      icon: '🛡️',
      gradient: ['#EF4444', '#DC2626'],
      exams: 3,
      description: 'CompTIA Security+, ethical hacking',
    },
    {
      id: 'container',
      name: 'Container Orchestration',
      icon: '🐳',
      gradient: ['#22C55E', '#16A34A'],
      exams: 2,
      description: 'Kubernetes, Docker certifications',
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: '⚙️',
      gradient: ['#8B5CF6', '#7C3AED'],
      exams: 2,
      description: 'Terraform, CI/CD, automation',
    },
    {
      id: 'networking',
      name: 'Networking',
      icon: '🌐',
      gradient: ['#F59E0B', '#D97706'],
      exams: 1,
      description: 'Cisco, network engineering',
    },
    {
      id: 'all',
      name: 'All Certifications',
      icon: '🎯',
      gradient: ['#6366F1', '#4F46E5'],
      exams: 12,
      description: 'Browse all available exams',
    },
  ];

  const handleCategorySelect = (categoryName: string) => {
    navigation.navigate('ExamList', { category: categoryName });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.greeting, typography.caption, { color: colors.textSecondary }]}>
              Let's get started! 🚀
            </Text>
            <Text style={[styles.title, typography.h1, { color: colors.textPrimary }]}>
              Choose Your Path
            </Text>
            <Text style={[styles.subtitle, typography.body, { color: colors.textSecondary }]}>
              Select a certification category to begin your learning journey
            </Text>
          </View>

          {/* Categories Grid - Bike Shopping Style */}
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCardWrapper}
                onPress={() => handleCategorySelect(category.name)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={category.gradient}
                  style={[styles.categoryCard, shadows.lg]}
                >
                  {/* Badge with exam count */}
                  <View style={styles.examCountBadge}>
                    <Text style={[styles.examCountText, typography.smallBold]}>
                      {category.exams} Exams
                    </Text>
                  </View>

                  {/* Icon */}
                  <View style={styles.iconContainer}>
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                  </View>

                  {/* Title */}
                  <Text style={[styles.categoryName, typography.h4]}>
                    {category.name}
                  </Text>

                  {/* Description */}
                  <Text style={[styles.categoryDescription, typography.caption]}>
                    {category.description}
                  </Text>

                  {/* Arrow */}
                  <View style={styles.arrowContainer}>
                    <Text style={styles.arrow}>→</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Skip Option */}
          <TouchableOpacity
            style={[styles.skipButton, { backgroundColor: colors.surfaceSecondary }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={[styles.skipText, typography.bodyBold, { color: colors.textSecondary }]}>
              Skip and Browse All
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  header: {
    padding: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  greeting: {
    marginBottom: spacing.xs / 2,
  },
  title: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    lineHeight: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  categoryCardWrapper: {
    width: cardWidth,
    marginBottom: spacing.md,
  },
  categoryCard: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    minHeight: 220,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  examCountBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  examCountText: {
    color: '#ffffff',
    fontSize: 11,
  },
  iconContainer: {
    marginTop: spacing.lg,
  },
  categoryIcon: {
    fontSize: 48,
  },
  categoryName: {
    color: '#ffffff',
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  categoryDescription: {
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
  },
  arrowContainer: {
    alignSelf: 'flex-end',
    marginTop: spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '700',
  },
  skipButton: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  skipText: {},
});

