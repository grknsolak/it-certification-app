import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, ExamResult } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, typography, radius, shadows } from '../design-system/tokens';
import Button from '../components/Button';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface Stats {
  examsCompleted: number;
  averageScore: number;
  totalQuestions: number;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - spacing.md * 3) / 2;

export default function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [stats, setStats] = useState<Stats>({
    examsCompleted: 0,
    averageScore: 0,
    totalQuestions: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const resultsJson = await AsyncStorage.getItem('examResults');
      if (resultsJson) {
        const results: ExamResult[] = JSON.parse(resultsJson);
        const totalScore = results.reduce((sum, r) => sum + r.score, 0);
        const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);
        
        setStats({
          examsCompleted: results.length,
          averageScore: results.length > 0 ? Math.round(totalScore / results.length) : 0,
          totalQuestions,
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const categories = [
    { icon: '☁️', name: 'Cloud', color: '#3B82F6' },
    { icon: '🛡️', name: 'Security', color: '#EF4444' },
    { icon: '🐳', name: 'Container', color: '#22C55E' },
    { icon: '⚙️', name: 'DevOps', color: '#8B5CF6' },
  ];

  const popularExams = [
    {
      id: 1,
      title: 'AWS Cloud Practitioner',
      category: 'Cloud Computing',
      questions: 65,
      duration: 90,
      rating: 4.8,
      reviews: 1234,
      icon: '☁️',
      difficulty: 'Beginner',
      difficultyColor: colors.success,
    },
    {
      id: 2,
      title: 'CompTIA Security+',
      category: 'Cybersecurity',
      questions: 90,
      duration: 90,
      rating: 4.6,
      reviews: 856,
      icon: '🛡️',
      difficulty: 'Intermediate',
      difficultyColor: colors.warning,
    },
    {
      id: 3,
      title: 'Kubernetes CKA',
      category: 'Container',
      questions: 15,
      duration: 180,
      rating: 4.9,
      reviews: 642,
      icon: '🐳',
      difficulty: 'Advanced',
      difficultyColor: colors.error,
    },
    {
      id: 4,
      title: 'Terraform Associate',
      category: 'DevOps',
      questions: 57,
      duration: 60,
      rating: 4.7,
      reviews: 423,
      icon: '⚙️',
      difficulty: 'Intermediate',
      difficultyColor: colors.warning,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header - Bike Shopping Style */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                style={[styles.backButton, { backgroundColor: colors.surfaceSecondary }, shadows.sm]}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.backIcon}>←</Text>
              </TouchableOpacity>
              <View>
                <Text style={[styles.greeting, typography.caption, { color: colors.textSecondary }]}>
                  Welcome back! 👋
                </Text>
                <Text style={[styles.title, typography.h1, { color: colors.textPrimary }]}>
                  IT Certification
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.settingsButton, { backgroundColor: colors.surfaceSecondary }, shadows.sm]}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar - Bike Shopping Style */}
          <View style={[styles.searchContainer, { backgroundColor: colors.surfaceSecondary }, shadows.sm]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={[styles.searchInput, typography.body, { color: colors.textPrimary }]}
              placeholder="Search certifications..."
              placeholderTextColor={colors.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Stats Row - E-commerce style */}
          <View style={styles.statsRow}>
            <View style={[styles.statItem, { backgroundColor: colors.surface }, shadows.sm]}>
              <Text style={[styles.statNumber, typography.h2, { color: colors.primary }]}>
                {stats.examsCompleted}
              </Text>
              <Text style={[styles.statLabel, typography.caption, { color: colors.textSecondary }]}>
                Completed
              </Text>
            </View>

            <View style={[styles.statItem, { backgroundColor: colors.surface }, shadows.sm]}>
              <Text style={[styles.statNumber, typography.h2, { color: colors.accent }]}>
                {stats.averageScore}%
              </Text>
              <Text style={[styles.statLabel, typography.caption, { color: colors.textSecondary }]}>
                Avg Score
              </Text>
            </View>

            <View style={[styles.statItem, { backgroundColor: colors.surface }, shadows.sm]}>
              <Text style={[styles.statNumber, typography.h2, { color: colors.secondary }]}>
                {stats.totalQuestions}
              </Text>
              <Text style={[styles.statLabel, typography.caption, { color: colors.textSecondary }]}>
                Questions
              </Text>
            </View>
          </View>

          {/* Categories - Horizontal Scroll (Bike Shopping) */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, typography.h3, { color: colors.textPrimary }]}>
              Categories
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.categoryCard, { backgroundColor: colors.surface }, shadows.md]}
                  onPress={() => navigation.navigate('ExamList')}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: `${category.color}15` }]}>
                    <Text style={styles.categoryEmoji}>{category.icon}</Text>
                  </View>
                  <Text style={[styles.categoryName, typography.bodyBold, { color: colors.textPrimary }]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Popular Exams - Grid (Bike Shopping Product Cards) */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, typography.h3, { color: colors.textPrimary }]}>
                Popular Certifications
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('ExamList')}>
                <Text style={[styles.seeAll, typography.bodyBold, { color: colors.primary }]}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.examGrid}>
              {popularExams.map((exam) => (
                <TouchableOpacity
                  key={exam.id}
                  style={[styles.examCard, { backgroundColor: colors.surface }, shadows.md]}
                  onPress={() => navigation.navigate('ExamList')}
                  activeOpacity={0.7}
                >
                  {/* Card Image Area */}
                  <View style={[styles.examImageArea, { backgroundColor: colors.backgroundSecondary }]}>
                    <Text style={styles.examIcon}>{exam.icon}</Text>
                    <View style={[styles.difficultyBadge, { backgroundColor: `${exam.difficultyColor}15` }]}>
                      <Text style={[styles.difficultyText, typography.smallBold, { color: exam.difficultyColor }]}>
                        {exam.difficulty}
                      </Text>
                    </View>
                  </View>

                  {/* Card Info */}
                  <View style={styles.examInfo}>
                    <Text style={[styles.examCategory, typography.small, { color: colors.textTertiary }]}>
                      {exam.category}
                    </Text>
                    <Text 
                      style={[styles.examTitle, typography.bodyBold, { color: colors.textPrimary }]}
                      numberOfLines={2}
                    >
                      {exam.title}
                    </Text>

                    {/* Rating */}
                    <View style={styles.ratingRow}>
                      <Text style={styles.star}>⭐</Text>
                      <Text style={[styles.ratingText, typography.small, { color: colors.textPrimary }]}>
                        {exam.rating}
                      </Text>
                      <Text style={[styles.reviewsText, typography.small, { color: colors.textTertiary }]}>
                        ({exam.reviews})
                      </Text>
                    </View>

                    {/* Details */}
                    <View style={styles.detailsRow}>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailIcon}>📝</Text>
                        <Text style={[styles.detailText, typography.small, { color: colors.textSecondary }]}>
                          {exam.questions}
                        </Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailIcon}>⏱️</Text>
                        <Text style={[styles.detailText, typography.small, { color: colors.textSecondary }]}>
                          {exam.duration}m
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* CTA Button */}
          <Button
            title="Browse All Certifications"
            onPress={() => navigation.navigate('ExamList')}
            variant="primary"
            size="large"
            fullWidth
            icon="🚀"
            style={styles.ctaButton}
          />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.md,
    paddingTop: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '600',
  },
  greeting: {
    marginBottom: spacing.xs / 2,
  },
  title: {},
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    height: 52,
    borderRadius: radius.lg,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  statItem: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  statNumber: {
    marginBottom: spacing.xs / 2,
  },
  statLabel: {},
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  seeAll: {},
  categoriesScroll: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  categoryCard: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
    minWidth: 100,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {},
  examGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  examCard: {
    width: cardWidth,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  examImageArea: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  examIcon: {
    fontSize: 56,
  },
  difficultyBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radius.sm,
  },
  difficultyText: {},
  examInfo: {
    padding: spacing.md,
  },
  examCategory: {
    marginBottom: spacing.xs / 2,
    textTransform: 'uppercase',
  },
  examTitle: {
    marginBottom: spacing.sm,
    minHeight: 40,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  star: {
    fontSize: 14,
    marginRight: spacing.xs / 2,
  },
  ratingText: {
    marginRight: spacing.xs / 2,
    fontWeight: '600',
  },
  reviewsText: {},
  detailsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  detailIcon: {
    fontSize: 14,
  },
  detailText: {},
  ctaButton: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
});
