import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, typography, radius, shadows } from '../design-system/tokens';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

export default function SettingsScreen({ navigation }: Props) {
  const { colors, mode, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleClearData = () => {
    Alert.alert(
      'Tüm Verileri Temizle',
      'Bu işlem tüm sınav geçmişinizi ve ayarlarınızı silecek. Geri alınamaz!',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Temizle',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Başarılı', 'Tüm veriler temizlendi.');
            } catch (error) {
              Alert.alert('Hata', 'Veriler temizlenemedi.');
            }
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'IT Exam Certification Hakkında',
      'Versiyon 1.0.0\n\nIT sertifika sınavlarına hazırlık için modern mobil uygulama.\n\n© 2024 IT Exam Certification'
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <View style={styles.content}>
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Tema</Text>
          
          <TouchableOpacity
            style={[styles.settingButton, { borderBottomColor: colors.border }]}
            onPress={() => setTheme('light')}
          >
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>☀️ Açık Tema</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>Her zaman açık tema kullan</Text>
            </View>
            {mode === 'light' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingButton, { borderBottomColor: colors.border }]}
            onPress={() => setTheme('dark')}
          >
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>🌙 Koyu Tema</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>Her zaman koyu tema kullan</Text>
            </View>
            {mode === 'dark' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingButton, { borderBottomColor: colors.border }]}
            onPress={() => setTheme('system')}
          >
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>📱 Sistem</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>Cihaz ayarlarını takip et</Text>
            </View>
            {mode === 'system' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Tercihler</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>Bildirimler</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>Sınav hatırlatıcıları al</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.neutral300, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>

          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>Ses Efektleri</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>Sınavlarda ses çal</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: colors.neutral300, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Veri Yönetimi</Text>
          
          <TouchableOpacity 
            style={[styles.settingButton, { borderBottomColor: colors.border }]} 
            onPress={handleClearData}
          >
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>Tüm Verileri Temizle</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>Sınav geçmişini ve ayarları sil</Text>
            </View>
            <Text style={[styles.arrow, { color: colors.textTertiary }]}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Destek</Text>
          
          <TouchableOpacity 
            style={[styles.settingButton, { borderBottomColor: colors.border }]} 
            onPress={handleAbout}
          >
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>Hakkında</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>Uygulama bilgileri</Text>
            </View>
            <Text style={[styles.arrow, { color: colors.textTertiary }]}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    ...typography.bodyBold,
    marginBottom: spacing.xs / 2,
  },
  settingDescription: {
    ...typography.caption,
  },
  arrow: {
    fontSize: 20,
    marginLeft: spacing.md,
  },
  checkmark: {
    fontSize: 20,
    color: '#10b981',
    fontWeight: '700',
  },
});

