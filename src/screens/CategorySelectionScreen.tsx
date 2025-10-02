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
const isLargeScreen = width > 768;
const cardWidth = isLargeScreen 
  ? (width - spacing.md * 4) / 3 
  : (width - spacing.md * 3) / 2;

export default function CategorySelectionScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const categories = [
    {
      id: 'cloud-devops',
      name: 'Cloud & DevOps',
      icon: '☁️',
      gradient: ['#3B82F6', '#2563EB'],
      certifications: [
        'AWS (Cloud Practitioner, Solutions Architect, DevOps, ML, Gen AI)',
        'Azure (AZ-900, AZ-104, AZ-305)',
        'Google Cloud (Engineer, Architect, Data)',
        'Kubernetes (CKA, CKAD, CKS)',
        'Terraform Associate',
      ],
      exams: 25,
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      icon: '🔒',
      gradient: ['#EF4444', '#DC2626'],
      certifications: [
        'CompTIA Security+',
        'CEH (Certified Ethical Hacker)',
        'CISSP (Security Professional)',
        'CISM (Security Manager)',
        'OSCP (Offensive Security)',
        'ISO 27001 (Lead Auditor/Implementer)',
      ],
      exams: 15,
    },
    {
      id: 'data-ai',
      name: 'Data & AI',
      icon: '📊',
      gradient: ['#8B5CF6', '#7C3AED'],
      certifications: [
        'AWS ML Specialty / Gen AI',
        'Microsoft DP-100, AI-102',
        'Google Professional Data Engineer',
        'Databricks Certifications',
        'TensorFlow Developer',
      ],
      exams: 12,
    },
    {
      id: 'networking-systems',
      name: 'Networking & Systems',
      icon: '🖥️',
      gradient: ['#F59E0B', '#D97706'],
      certifications: [
        'Cisco (CCNA, CCNP, CCIE)',
        'VMware (VCP, VCAP, VCDX)',
        'Linux Foundation (LFCS, LFCE)',
      ],
      exams: 10,
    },
    {
      id: 'software-agile',
      name: 'Software & Agile',
      icon: '👨‍💻',
      gradient: ['#22C55E', '#16A34A'],
      certifications: [
        'Scrum Master (PSM, CSM)',
        'PMI-ACP (Agile Practitioner)',
        'TOGAF (Architecture)',
        'ITIL (Foundation, Intermediate)',
        'SAFe (Scaled Agile)',
      ],
      exams: 18,
    },
    {
      id: 'business-management',
      name: 'Business & Management',
      icon: '📈',
      gradient: ['#EC4899', '#DB2777'],
      certifications: [
        'PMP (Project Management)',
        'PRINCE2 (Foundation, Practitioner)',
        'COBIT Certification',
        'Product Management',
      ],
      exams: 8,
    },
  ];

  const handleCategorySelect = (category: any) => {
    navigation.navigate('SubCategory', { 
      categoryId: category.id,
      categoryName: category.name,
      categoryIcon: category.icon,
    });
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
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: colors.surfaceSecondary }, shadows.sm]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.backIcon, { color: colors.textPrimary }]}>←</Text>
            </TouchableOpacity>
            <Text style={[styles.greeting, typography.caption, { color: colors.textSecondary }]}>
              Start Your Journey! 🚀
            </Text>
            <Text style={[styles.title, typography.h1, { color: colors.textPrimary }]}>
              IT Certification Categories
            </Text>
            <Text style={[styles.subtitle, typography.body, { color: colors.textSecondary }]}>
              Select a professional certification path
            </Text>
          </View>

          {/* Categories Grid - Professional Design */}
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCardWrapper}
                onPress={() => handleCategorySelect(category)}
                activeOpacity={0.8}
              >
                <View style={[styles.categoryCard, { backgroundColor: colors.surface }, shadows.xl]}>
                  {/* Header with Icon & Badge */}
                  <View style={styles.cardHeader}>
                    <LinearGradient
                      colors={category.gradient}
                      style={styles.iconGradient}
                    >
                      <Text style={styles.categoryIcon}>{category.icon}</Text>
                    </LinearGradient>
                    <View style={[styles.examBadge, { backgroundColor: colors.backgroundSecondary }]}>
                      <Text style={[styles.examBadgeText, typography.smallBold, { color: colors.textSecondary }]}>
                        {category.exams} Exams
                      </Text>
                    </View>
                  </View>

                  {/* Title */}
                  <Text style={[styles.categoryName, typography.h3, { color: colors.textPrimary }]}>
                    {category.name}
                  </Text>

                  {/* Certifications List */}
                  <View style={styles.certificationsContainer}>
                    {category.certifications.slice(0, 3).map((cert, index) => (
                      <View key={index} style={styles.certItem}>
                        <Text style={[styles.certBullet, { color: colors.textTertiary }]}>•</Text>
                        <Text 
                          style={[styles.certText, typography.caption, { color: colors.textSecondary }]}
                          numberOfLines={1}
                        >
                          {cert}
                        </Text>
                      </View>
                    ))}
                    {category.certifications.length > 3 && (
                      <Text style={[styles.moreText, typography.captionBold, { color: colors.primary }]}>
                        +{category.certifications.length - 3} more
                      </Text>
                    )}
                  </View>

                  {/* Action Button */}
                  <LinearGradient
                    colors={category.gradient}
                    style={styles.actionButton}
                  >
                    <Text style={[styles.actionButtonText, typography.bodyBold]}>
                      Explore Certifications
                    </Text>
                    <Text style={styles.actionArrow}>→</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={[styles.footer, { backgroundColor: colors.surfaceSecondary }]}>
            <Text style={[styles.footerTitle, typography.h4, { color: colors.textPrimary }]}>
              Not sure where to start?
            </Text>
            <Text style={[styles.footerText, typography.body, { color: colors.textSecondary }]}>
              Browse all certifications and find the perfect path for your career
            </Text>
            <TouchableOpacity
              style={[styles.browseButton, { backgroundColor: colors.primary }, shadows.md]}
              onPress={() => navigation.navigate('ExamList', { category: 'All Certifications' })}
            >
              <Text style={[styles.browseButtonText, typography.bodyBold, { color: colors.textInverse }]}>
                Browse All Certifications
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: spacing.xl,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '600',
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
    minHeight: 320,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  iconGradient: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 32,
  },
  examBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radius.full,
  },
  examBadgeText: {
    fontSize: 11,
  },
  categoryName: {
    marginBottom: spacing.md,
  },
  certificationsContainer: {
    marginBottom: spacing.lg,
    flex: 1,
  },
  certItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  certBullet: {
    marginRight: spacing.xs,
    fontSize: 12,
  },
  certText: {
    flex: 1,
    lineHeight: 18,
  },
  moreText: {
    marginTop: spacing.xs / 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
  actionButtonText: {
    color: '#ffffff',
    flex: 1,
  },
  actionArrow: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '700',
    marginLeft: spacing.sm,
  },
  footer: {
    margin: spacing.md,
    padding: spacing.xl,
    borderRadius: radius.xl,
    alignItems: 'center',
  },
  footerTitle: {
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  footerText: {
    marginBottom: spacing.lg,
    textAlign: 'center',
    lineHeight: 24,
  },
  browseButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
  },
  browseButtonText: {},
});
