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
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, typography, radius, shadows } from '../design-system/tokens';

type SubCategoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SubCategory'>;
type SubCategoryScreenRouteProp = RouteProp<RootStackParamList, 'SubCategory'>;

interface Props {
  navigation: SubCategoryScreenNavigationProp;
  route: SubCategoryScreenRouteProp;
}

interface SubCategory {
  id: string;
  name: string;
  icon: string;
  gradient: string[];
  exams: number;
  description: string;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - spacing.md * 3) / 2;

// Sub-category data for each main category
const subCategoryData: { [key: string]: SubCategory[] } = {
  'cloud-devops': [
    {
      id: 'aws',
      name: 'AWS',
      icon: '☁️',
      gradient: ['#FF9900', '#FF6B00'],
      exams: 8,
      description: 'Cloud Practitioner, Solutions Architect, DevOps, ML, Gen AI',
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      icon: '🔷',
      gradient: ['#0078D4', '#005BA1'],
      exams: 6,
      description: 'AZ-900 Fundamentals, AZ-104 Admin, AZ-305 Architect',
    },
    {
      id: 'google-cloud',
      name: 'Google Cloud',
      icon: '🌐',
      gradient: ['#4285F4', '#1967D2'],
      exams: 4,
      description: 'Cloud Engineer, Architect, Data Engineer',
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes / CNCF',
      icon: '🐳',
      gradient: ['#326CE5', '#1E4FA1'],
      exams: 3,
      description: 'CKA Administrator, CKAD Developer, CKS Security',
    },
    {
      id: 'terraform',
      name: 'Terraform / HashiCorp',
      icon: '⚙️',
      gradient: ['#7B42BC', '#5C30A1'],
      exams: 2,
      description: 'Terraform Associate, Vault Associate',
    },
    {
      id: 'other-cloud',
      name: 'Other Cloud Tools',
      icon: '🛠️',
      gradient: ['#8B5CF6', '#7C3AED'],
      exams: 2,
      description: 'Jenkins, Ansible, CI/CD Tools',
    },
  ],
  'cybersecurity': [
    {
      id: 'comptia-security',
      name: 'CompTIA',
      icon: '🛡️',
      gradient: ['#E2231A', '#B81D16'],
      exams: 3,
      description: 'Security+, CySA+, PenTest+',
    },
    {
      id: 'ethical-hacking',
      name: 'Ethical Hacking',
      icon: '💻',
      gradient: ['#00D9FF', '#00A3D9'],
      exams: 3,
      description: 'CEH, OSCP, GPEN',
    },
    {
      id: 'security-management',
      name: 'Security Management',
      icon: '📋',
      gradient: ['#10B981', '#059669'],
      exams: 4,
      description: 'CISSP, CISM, CISA, CRISC',
    },
    {
      id: 'iso-compliance',
      name: 'ISO & Compliance',
      icon: '📜',
      gradient: ['#F59E0B', '#D97706'],
      exams: 3,
      description: 'ISO 27001, ISO 27002, GDPR',
    },
    {
      id: 'cloud-security',
      name: 'Cloud Security',
      icon: '☁️',
      gradient: ['#6366F1', '#4F46E5'],
      exams: 2,
      description: 'CCSP, AWS Security Specialty',
    },
  ],
  'data-ai': [
    {
      id: 'aws-ml',
      name: 'AWS AI/ML',
      icon: '🤖',
      gradient: ['#FF9900', '#FF6B00'],
      exams: 3,
      description: 'ML Specialty, Gen AI Practitioner, Data Analytics',
    },
    {
      id: 'microsoft-ai',
      name: 'Microsoft AI',
      icon: '🔷',
      gradient: ['#0078D4', '#005BA1'],
      exams: 3,
      description: 'DP-100, AI-102, DP-203',
    },
    {
      id: 'google-data',
      name: 'Google Data & AI',
      icon: '📊',
      gradient: ['#4285F4', '#1967D2'],
      exams: 2,
      description: 'Professional Data Engineer, ML Engineer',
    },
    {
      id: 'databricks',
      name: 'Databricks',
      icon: '🔶',
      gradient: ['#FF3621', '#E02814'],
      exams: 2,
      description: 'Data Engineer, ML Professional',
    },
    {
      id: 'tensorflow',
      name: 'TensorFlow & PyTorch',
      icon: '🧠',
      gradient: ['#FF6F00', '#E65100'],
      exams: 2,
      description: 'TensorFlow Developer, PyTorch Certified',
    },
  ],
  'networking-systems': [
    {
      id: 'cisco',
      name: 'Cisco',
      icon: '🌐',
      gradient: ['#00BCEB', '#0099CC'],
      exams: 5,
      description: 'CCNA, CCNP, CCIE, DevNet',
    },
    {
      id: 'vmware',
      name: 'VMware',
      icon: '💾',
      gradient: ['#607D8B', '#455A64'],
      exams: 3,
      description: 'VCP, VCAP, VCDX',
    },
    {
      id: 'linux',
      name: 'Linux Foundation',
      icon: '🐧',
      gradient: ['#FCC624', '#E5B021'],
      exams: 2,
      description: 'LFCS, LFCE',
    },
  ],
  'software-agile': [
    {
      id: 'scrum',
      name: 'Scrum & Agile',
      icon: '🔄',
      gradient: ['#22C55E', '#16A34A'],
      exams: 4,
      description: 'PSM, CSM, PMI-ACP',
    },
    {
      id: 'architecture',
      name: 'Architecture',
      icon: '🏗️',
      gradient: ['#8B5CF6', '#7C3AED'],
      exams: 3,
      description: 'TOGAF, SAFe Architect',
    },
    {
      id: 'itil',
      name: 'ITIL',
      icon: '📚',
      gradient: ['#6366F1', '#4F46E5'],
      exams: 5,
      description: 'Foundation, Practitioner, Intermediate',
    },
    {
      id: 'safe',
      name: 'SAFe',
      icon: '⚡',
      gradient: ['#F59E0B', '#D97706'],
      exams: 4,
      description: 'Agilist, Scrum Master, Product Owner',
    },
    {
      id: 'devops-culture',
      name: 'DevOps Culture',
      icon: '🎯',
      gradient: ['#EF4444', '#DC2626'],
      exams: 2,
      description: 'DevOps Institute, DevOps Foundation',
    },
  ],
  'business-management': [
    {
      id: 'pmp',
      name: 'PMI Certifications',
      icon: '📊',
      gradient: ['#3B82F6', '#2563EB'],
      exams: 3,
      description: 'PMP, CAPM, PMI-ACP',
    },
    {
      id: 'prince2',
      name: 'PRINCE2',
      icon: '👑',
      gradient: ['#8B5CF6', '#7C3AED'],
      exams: 2,
      description: 'Foundation, Practitioner',
    },
    {
      id: 'cobit',
      name: 'COBIT & IT Governance',
      icon: '🏛️',
      gradient: ['#10B981', '#059669'],
      exams: 2,
      description: 'COBIT 5, COBIT 2019',
    },
    {
      id: 'product-management',
      name: 'Product Management',
      icon: '💡',
      gradient: ['#F59E0B', '#D97706'],
      exams: 1,
      description: 'Google PM, Pragmatic Institute',
    },
  ],
};

export default function SubCategoryScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const { categoryId, categoryName, categoryIcon } = route.params;

  const subCategories = subCategoryData[categoryId] || [];

  const handleSubCategorySelect = (subCategory: SubCategory) => {
    navigation.navigate('ExamList', { 
      category: categoryName,
      subCategory: subCategory.name 
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
            <View style={styles.headerContent}>
              <Text style={styles.headerIcon}>{categoryIcon}</Text>
              <Text style={[styles.title, typography.h1, { color: colors.textPrimary }]}>
                {categoryName}
              </Text>
              <Text style={[styles.subtitle, typography.body, { color: colors.textSecondary }]}>
                Choose a specific certification path
              </Text>
            </View>
          </View>

          {/* Sub-Categories Compact List - Minimal & Clean */}
          <View style={styles.subCategoriesList}>
            {subCategories.map((subCategory) => (
              <TouchableOpacity
                key={subCategory.id}
                style={[styles.compactCard, { backgroundColor: colors.surface }, shadows.sm]}
                onPress={() => handleSubCategorySelect(subCategory)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={subCategory.gradient as any}
                  style={styles.compactIconWrapper}
                >
                  <Text style={styles.compactIcon}>{subCategory.icon}</Text>
                </LinearGradient>
                
                <View style={styles.compactContent}>
                  <View style={styles.compactHeader}>
                    <Text style={[styles.compactTitle, typography.bodyBold, { color: colors.textPrimary }]}>
                      {subCategory.name}
                    </Text>
                    <View style={[styles.compactBadge, { backgroundColor: colors.backgroundSecondary }]}>
                      <Text style={[styles.compactBadgeText, { color: colors.textSecondary }]}>
                        {subCategory.exams}
                      </Text>
                    </View>
                  </View>
                  <Text 
                    style={[styles.compactDescription, typography.caption, { color: colors.textSecondary }]}
                    numberOfLines={1}
                  >
                    {subCategory.description}
                  </Text>
                </View>
                
                <Text style={[styles.compactArrow, { color: colors.textTertiary }]}>›</Text>
              </TouchableOpacity>
            ))}
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
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
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  title: {
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    lineHeight: 20,
    textAlign: 'center',
  },
  subCategoriesList: {
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
});

