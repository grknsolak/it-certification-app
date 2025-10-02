import React, { Component, ReactNode, ErrorInfo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { spacing, typography } from '../design-system/tokens';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>Bir Hata Oluştu</Text>
          <Text style={styles.message}>
            Üzgünüz, beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
          </Text>
          {__DEV__ && this.state.error && (
            <Text style={styles.errorDetails}>
              {this.state.error.toString()}
            </Text>
          )}
          <Button
            title="Tekrar Dene"
            onPress={this.handleReset}
            variant="primary"
          />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: '#f9fafb',
  },
  icon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.md,
    textAlign: 'center',
    color: '#1f2937',
  },
  message: {
    ...typography.body,
    marginBottom: spacing.xl,
    textAlign: 'center',
    color: '#6b7280',
    maxWidth: 300,
  },
  errorDetails: {
    ...typography.caption,
    marginBottom: spacing.xl,
    padding: spacing.md,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    color: '#991b1b',
    maxWidth: '90%',
  },
});

