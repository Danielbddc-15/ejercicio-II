import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useLanguage} from '../context/LanguageContext';

const LanguageSelector: React.FC = () => {
  const {language, setLanguage} = useLanguage();

  const languages = [
    {code: 'es', name: 'Español', flag: '🇪🇸'},
    {code: 'en', name: 'English', flag: '🇺🇸'},
    {code: 'pt', name: 'Português', flag: '🇧🇷'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Idioma / Language / Idioma:</Text>
      <View style={styles.languageButtons}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              language === lang.code && styles.activeLanguageButton,
            ]}
            onPress={() => setLanguage(lang.code)}>
            <Text style={styles.flag}>{lang.flag}</Text>
            <Text
              style={[
                styles.languageText,
                language === lang.code && styles.activeLanguageText,
              ]}>
              {lang.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  languageButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 80,
  },
  activeLanguageButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  flag: {
    fontSize: 20,
    marginBottom: 5,
  },
  languageText: {
    fontSize: 12,
    color: '#333',
  },
  activeLanguageText: {
    color: '#fff',
  },
});

export default LanguageSelector;