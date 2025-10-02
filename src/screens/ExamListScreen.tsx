import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Exam } from '../types';
import { certificationExams } from '../data/certificationExams';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, typography, radius, shadows, gradients } from '../design-system/tokens';
import Button from '../components/Button';

type ExamListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ExamList'>;
type ExamListScreenRouteProp = RouteProp<RootStackParamList, 'ExamList'>;

interface Props {
  navigation: ExamListScreenNavigationProp;
  route: ExamListScreenRouteProp;
}

const categories = ['All Certifications', 'Cloud Computing', 'Cybersecurity', 'Container Orchestration', 'DevOps', 'Networking'];

export default function ExamListScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const initialCategory = route.params?.category || 'All Certifications';
  const subCategory = route.params?.subCategory;
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Filter by subCategory if provided, otherwise by category
  const filteredExams = subCategory
    ? certificationExams.filter(exam => exam.subCategory === subCategory)
    : selectedCategory === 'All Certifications' 
      ? certificationExams 
      : certificationExams.filter(exam => exam.category === selectedCategory);

  const getDifficultyColor = (exam: Exam) => {
    const difficulties = exam.questions.map(q => q.difficulty || 'medium');
    const hardCount = difficulties.filter(d => d === 'hard').length;
    const easyCount = difficulties.filter(d => d === 'easy').length;
    
    if (hardCount > exam.questions.length / 2) return { color: colors.error, label: 'Advanced' };
    if (easyCount > exam.questions.length / 2) return { color: colors.success, label: 'Beginner' };
    return { color: colors.warning, label: 'Intermediate' };
  };

  const renderExamItem = ({ item }: { item: Exam }) => {
    const difficulty = getDifficultyColor(item);
    
    return (
      <View style={[styles.examCard, { backgroundColor: colors.surface }, shadows.md]}>
        {/* Header */}
        <View style={styles.examHeader}>
          <View style={styles.examHeaderLeft}>
            <View style={styles.categoryRow}>
              <Text style={styles.examIcon}>{item.icon}</Text>
              <Text style={[styles.examCategory, typography.captionBold, { color: colors.primary }]}>
                {item.category}
              </Text>
            </View>
            <Text style={[styles.examTitle, typography.h3, { color: colors.textPrimary }]}>
              {item.title}
            </Text>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: `${difficulty.color}15`, borderColor: difficulty.color }]}>
            <Text style={[styles.difficultyText, typography.smallBold, { color: difficulty.color }]}>
              {difficulty.label}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.examDescription, typography.body, { color: colors.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>
        
        {/* Features - Parny style! */}
        <View style={styles.featuresGrid}>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: `${colors.primary}10` }]}>
              <Text style={styles.featureEmoji}>📝</Text>
            </View>
            <Text style={[styles.featureLabel, typography.caption, { color: colors.textSecondary }]}>
              Questions
            </Text>
            <Text style={[styles.featureValue, typography.bodyBold, { color: colors.textPrimary }]}>
              {item.questions.length}
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: `${colors.success}10` }]}>
              <Text style={styles.featureEmoji}>⏱️</Text>
            </View>
            <Text style={[styles.featureLabel, typography.caption, { color: colors.textSecondary }]}>
              Duration
            </Text>
            <Text style={[styles.featureValue, typography.bodyBold, { color: colors.textPrimary }]}>
              {item.timeLimit} min
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: `${colors.warning}10` }]}>
              <Text style={styles.featureEmoji}>🎯</Text>
            </View>
            <Text style={[styles.featureLabel, typography.caption, { color: colors.textSecondary }]}>
              Pass Score
            </Text>
            <Text style={[styles.featureValue, typography.bodyBold, { color: colors.textPrimary }]}>
              {item.passingScore}%
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <Button
            title="Review"
            onPress={() => navigation.navigate('QuestionReview', { examId: item.id })}
            variant="ghost"
            size="medium"
            style={styles.reviewButton}
            accessibilityLabel={`Review ${item.title}`}
          />
          <Button
            title="Start Exam"
            onPress={() => navigation.navigate('Exam', { examId: item.id })}
            variant="primary"
            size="medium"
            icon="🚀"
            style={styles.startButton}
            accessibilityLabel={`Start ${item.title} exam`}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Hero Section - Parny Style! */}
      <LinearGradient
        colors={gradients.heroAlt}
        style={styles.hero}
      >
        <SafeAreaView>
          <View style={styles.heroContent}>
            <TouchableOpacity
              style={[styles.backButton, shadows.sm]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={[styles.heroTitle, typography.h1]}>
              {subCategory || 'IT Certification Exams'}
            </Text>
            <Text style={[styles.heroSubtitle, typography.bodyLarge]}>
              {subCategory 
                ? `${filteredExams.length} certification exams available`
                : 'Choose your path to certification. Real exam questions, real preparation.'}
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
      
      {/* Category Pills - Only show if no subCategory */}
      {!subCategory && (
        <View style={[styles.categorySection, { backgroundColor: colors.background }]}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryPill,
                  { 
                    backgroundColor: selectedCategory === category ? colors.primary : colors.surfaceSecondary,
                    borderColor: selectedCategory === category ? colors.primary : colors.border,
                  }
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.categoryText,
                  typography.bodyBold,
                  { color: selectedCategory === category ? colors.textInverse : colors.textSecondary }
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      <FlatList
        data={filteredExams}
        renderItem={renderExamItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, typography.h4, { color: colors.textSecondary }]}>
              No exams available in this category
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    paddingVertical: spacing.xxxl,
    paddingTop: spacing.huge,
  },
  heroContent: {
    paddingHorizontal: spacing.xl,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
  },
  heroTitle: {
    color: '#ffffff',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    maxWidth: 600,
    alignSelf: 'center',
  },
  categorySection: {
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  categoryContainer: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  categoryPill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    borderWidth: 2,
  },
  categoryText: {},
  listContainer: {
    padding: spacing.xl,
    paddingBottom: spacing.huge,
  },
  examCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  examHeaderLeft: {
    flex: 1,
    marginRight: spacing.lg,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  examIcon: {
    fontSize: 24,
  },
  examCategory: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  examTitle: {
    marginBottom: spacing.xs,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  difficultyText: {},
  examDescription: {
    marginBottom: spacing.xl,
  },
  featuresGrid: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
    gap: spacing.lg,
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureLabel: {
    marginBottom: spacing.xs / 2,
  },
  featureValue: {},
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  reviewButton: {
    flex: 1,
  },
  startButton: {
    flex: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.huge,
  },
  emptyText: {},
});
