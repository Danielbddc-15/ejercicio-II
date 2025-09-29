import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import WifiManager from 'react-native-wifi-reborn';

interface WiFiNetwork {
  SSID: string;
  BSSID: string;
  capabilities: string;
  frequency: number;
  level: number;
  timestamp: number;
}

const WiFiScreen: React.FC = () => {
  const {t} = useTranslation();
  const [wifiNetworks, setWifiNetworks] = useState<WiFiNetwork[]>([]);
  const [scanning, setScanning] = useState(false);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs location access to scan WiFi networks',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const scanWiFiNetworks = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Error', 'Location permission is required to scan WiFi');
      return;
    }

    setScanning(true);
    try {
      // Paso 5: Escanear WiFis disponibles usando react-native-wifi-reborn
      const networks = await WifiManager.loadWifiList();
      console.log('WiFi networks found:', networks.length);
      setWifiNetworks(networks);
    } catch (error) {
      console.error('Error scanning WiFi:', error);
      Alert.alert('Error', 'Error scanning WiFi networks');
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    scanWiFiNetworks();
  }, []);

  const renderWiFiItem = ({item}: {item: WiFiNetwork}) => (
    <View style={styles.wifiItem}>
      <Text style={styles.ssid}>{item.SSID || 'Hidden Network'}</Text>
      <Text style={styles.signal}>
        Signal: {item.level} dBm
      </Text>
      <Text style={styles.security}>
        Security: {item.capabilities || 'Open'}
      </Text>
      <Text style={styles.frequency}>
        Frequency: {item.frequency} MHz
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WiFi Scanner</Text>
      
      <TouchableOpacity
        style={styles.scanButton}
        onPress={scanWiFiNetworks}
        disabled={scanning}>
        <Text style={styles.scanButtonText}>
          {scanning ? 'Scanning...' : 'Scan WiFi Networks'}
        </Text>
      </TouchableOpacity>

      {scanning && (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      )}

      <FlatList
        data={wifiNetworks}
        renderItem={renderWiFiItem}
        keyExtractor={(item, index) => `${item.BSSID || index}`}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {scanning ? 'Scanning WiFi networks...' : 'No WiFi networks found. Tap "Scan WiFi Networks" to search.'}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  scanButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loader: {
    marginVertical: 20,
  },
  list: {
    flex: 1,
  },
  wifiItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  ssid: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  signal: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  security: {
    fontSize: 14,
    color: '#666',
  },
  frequency: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 50,
  },
});

export default WiFiScreen;