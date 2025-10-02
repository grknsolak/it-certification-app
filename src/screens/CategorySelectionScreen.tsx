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

          {/* Categories Compact List - Minimal & Clean */}
          <View style={styles.categoriesList}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.compactCard, { backgroundColor: colors.surface }, shadows.sm]}
                onPress={() => handleCategorySelect(category)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={category.gradient as any}
                  style={styles.compactIconWrapper}
                >
                  <Text style={styles.compactIcon}>{category.icon}</Text>
                </LinearGradient>
                
                <View style={styles.compactContent}>
                  <View style={styles.compactHeader}>
                    <Text style={[styles.compactTitle, typography.bodyBold, { color: colors.textPrimary }]}>
                      {category.name}
                    </Text>
                    <View style={[styles.compactBadge, { backgroundColor: colors.backgroundSecondary }]}>
                      <Text style={[styles.compactBadgeText, { color: colors.textSecondary }]}>
                        {category.exams}
                      </Text>
                    </View>
                  </View>
                  <Text 
                    style={[styles.compactDescription, typography.caption, { color: colors.textSecondary }]}
                    numberOfLines={1}
                  >
                    {category.certifications.slice(0, 2).join(' • ')}
                  </Text>
                </View>
                
                <Text style={[styles.compactArrow, { color: colors.textTertiary }]}>›</Text>
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
  categoriesList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.lg,
    gap: spacing.md,
  },
  compactIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactIcon: {
    fontSize: 24,
  },
  compactContent: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  compactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compactTitle: {
    flex: 1,
  },
  compactBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    minWidth: 28,
    alignItems: 'center',
  },
  compactBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  compactDescription: {
    lineHeight: 16,
  },
  compactArrow: {
    fontSize: 24,
    fontWeight: '300',
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
