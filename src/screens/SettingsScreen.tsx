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

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

export default function SettingsScreen({ navigation }: Props) {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tercihler</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Bildirimler</Text>
              <Text style={styles.settingDescription}>Sınav hatırlatıcıları al</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e2e8f0', true: '#667eea' }}
              thumbColor={notifications ? '#ffffff' : '#ffffff'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Ses Efektleri</Text>
              <Text style={styles.settingDescription}>Sınavlarda ses çal</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#e2e8f0', true: '#667eea' }}
              thumbColor={soundEnabled ? '#ffffff' : '#ffffff'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Veri Yönetimi</Text>
          
          <TouchableOpacity style={styles.settingButton} onPress={handleClearData}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Tüm Verileri Temizle</Text>
              <Text style={styles.settingDescription}>Sınav geçmişini ve ayarları sil</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destek</Text>
          
          <TouchableOpacity style={styles.settingButton} onPress={handleAbout}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Hakkında</Text>
              <Text style={styles.settingDescription}>Uygulama bilgileri</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  arrow: {
    fontSize: 20,
    color: '#cbd5e1',
    marginLeft: 12,
  },
});

