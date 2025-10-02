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
      <View style={[styles.compactExamCard, { backgroundColor: colors.surface }, shadows.sm]}>
        {/* Icon */}
        <View style={[styles.examIconWrapper, { backgroundColor: colors.backgroundSecondary }]}>
          <Text style={styles.examIconText}>{item.icon}</Text>
        </View>
        
        {/* Content */}
        <View style={styles.examContent}>
          <Text style={[styles.compactExamTitle, typography.bodyBold, { color: colors.textPrimary }]} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.examMeta}>
            <Text style={[styles.examMetaText, typography.caption, { color: colors.textSecondary }]}>
              📝 {item.realExamQuestionCount || item.questions.length} • ⏱️ {item.timeLimit}m • 🎯 {item.passingScore}%
            </Text>
          </View>
        </View>
        
        {/* Difficulty Badge */}
        <View style={[
          styles.compactDifficultyBadge,
          { backgroundColor: `${difficulty.color}15`, borderColor: difficulty.color }
        ]}>
          <Text style={[styles.compactDifficultyText, { color: difficulty.color }]}>
            {difficulty.label.charAt(0)}
          </Text>
        </View>
        
        {/* Actions - Compact Buttons */}
        <View style={styles.compactActions}>
          <TouchableOpacity
            style={[styles.compactActionButton, { backgroundColor: colors.backgroundSecondary }]}
            onPress={() => navigation.navigate('QuestionReview', { examId: item.id })}
          >
            <Text style={styles.compactActionIcon}>📚</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.compactActionButton, { backgroundColor: colors.primary + '20', borderWidth: 1, borderColor: colors.primary }]}
            onPress={() => navigation.navigate('Exam', { examId: item.id, mode: 'practice' })}
          >
            <Text style={styles.compactActionIcon}>💡</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.compactActionButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Exam', { examId: item.id, mode: 'exam' })}
          >
            <Text style={styles.compactActionIcon}>🚀</Text>
          </TouchableOpacity>
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
            <Text style={[styles.heroTitle, typography.h2]}>
              {subCategory || 'IT Certification Exams'}
            </Text>
            <Text style={[styles.heroSubtitle, typography.caption]}>
              {subCategory 
                ? `${filteredExams.length} certification exams available`
                : 'Choose your path to certification'}
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
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  heroContent: {
    paddingHorizontal: spacing.md,
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  compactExamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.lg,
    gap: spacing.sm,
  },
  examIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  examIconText: {
    fontSize: 24,
  },
  examContent: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  compactExamTitle: {
    lineHeight: 20,
  },
  examMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  examMetaText: {
    lineHeight: 16,
  },
  compactDifficultyBadge: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  compactDifficultyText: {
    fontSize: 14,
    fontWeight: '700',
  },
  compactActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  compactActionButton: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactActionIcon: {
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.huge,
  },
  emptyText: {},
});
