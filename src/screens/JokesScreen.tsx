import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';

interface Joke {
  id: string;
  value: string;
  url: string;
}

const localJokes = {
  es: [
    "Chuck Norris no hace flexiones. Empuja la Tierra hacia abajo.",
    "Chuck Norris puede dividir por cero.",
    "Cuando Chuck Norris hace ejercicio, las pesas sudan.",
    "Chuck Norris cuenta hasta el infinito... dos veces.",
    "La muerte tuvo una experiencia cercana con Chuck Norris.",
    "Chuck Norris puede estrangular a alguien con un teléfono inalámbrico.",
    "Chuck Norris puede ganar una partida de conecta 4 en solo 3 movimientos.",
    "Chuck Norris no usa reloj. Él decide qué hora es.",
    "Chuck Norris puede quemar hormigas con una lupa... durante la noche.",
    "Los fantasmas se sientan alrededor de una fogata y se cuentan historias de Chuck Norris."
  ],
  en: [
    "Chuck Norris doesn't do push-ups. He pushes the Earth down.",
    "Chuck Norris can divide by zero.",
    "When Chuck Norris works out, the weights sweat.",
    "Chuck Norris counted to infinity... twice.",
    "Death once had a near-Chuck Norris experience.",
    "Chuck Norris can strangle someone with a cordless phone.",
    "Chuck Norris can win Connect Four in only three moves.",
    "Chuck Norris doesn't wear a watch. He decides what time it is.",
    "Chuck Norris can burn ants with a magnifying glass... at night.",
    "Ghosts sit around a campfire and tell Chuck Norris stories."
  ],
  pt: [
    "Chuck Norris não faz flexões. Ele empurra a Terra para baixo.",
    "Chuck Norris pode dividir por zero.",
    "Quando Chuck Norris se exercita, os pesos suam.",
    "Chuck Norris contou até o infinito... duas vezes.",
    "A morte teve uma experiência próxima com Chuck Norris.",
    "Chuck Norris pode estrangular alguém com um telefone sem fio.",
    "Chuck Norris pode ganhar Conecta 4 em apenas 3 jogadas.",
    "Chuck Norris não usa relógio. Ele decide que horas são.",
    "Chuck Norris pode queimar formigas com uma lupa... à noite.",
    "Fantasmas se sentam ao redor de uma fogueira e contam histórias do Chuck Norris."
  ]
};

const JokesScreen: React.FC = () => {
  const {t} = useTranslation();
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      // Consumir API de Chuck Norris según el Paso 3
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error('Error fetching joke:', error);
      // En caso de error, mostrar mensaje de error
      setJoke({
        id: 'error',
        value: 'Error loading joke. Please try again.',
        url: ''
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('chuckNorrisJokes')}</Text>
      
      <ScrollView style={styles.jokeContainer} contentContainerStyle={styles.jokeContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : joke ? (
          <Text style={styles.jokeText}>{joke.value}</Text>
        ) : (
          <Text style={styles.errorText}>{t('noJokeAvailable')}</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={fetchJoke}
        disabled={loading}>
        <Text style={styles.refreshButtonText}>
          {loading ? t('loading') : t('refresh')}
        </Text>
      </TouchableOpacity>
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
    marginBottom: 30,
    color: '#333',
  },
  jokeContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  jokeContent: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  jokeText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default JokesScreen;