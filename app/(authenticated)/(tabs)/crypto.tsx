import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Currency } from "../../../interfaces";
import { Link } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const headerHeight = useHeaderHeight();

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('/api/listings'); // Update URL if necessary
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; // Ensure data is returned
    } catch (error) {
      // Optionally handle errors
      console.error('Fetch error:', error);
      throw new Error('Failed to fetch currencies'); // Throws error to `useQuery` to handle
    }
  };
  
  const currencies = useQuery({
    queryKey: ['listings'],
    queryFn: fetchCurrencies,
  });

  const ids = currencies.data?.map((currency: Currency) => currency.id.toString()).join(',');
  console.log(ids)
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/info?ids=${ids}`); // Update URL if necessary
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; // Ensure data is returned
    } catch (error) {
      // Optionally handle errors
      console.error('Fetch error:', error);
      throw new Error('Failed to fetch currencies'); // Throws error to `useQuery` to handle
    }
  };

  const { data } = useQuery({
    queryKey: ['info', ids],
    queryFn: fetchData,
    enabled: !!ids,
  });

  console.log(data)

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}>
      <Text style={defaultStyles.sectionHeader}>Latest Crypot</Text>
      <View style={defaultStyles.block}>
        {currencies.data?.map((currency: Currency) => (
          <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
            <TouchableOpacity style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
              <Image source={{ uri: data?.[currency.id].logo }} style={{ width: 40, height: 40 }} />
              <View style={{ flex: 1, gap: 6 }}>
                <Text style={{ fontWeight: '600', color: Colors.dark }}>{currency.name}</Text>
                <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
              </View>
              <View style={{ gap: 6, alignItems: 'flex-end' }}>
                <Text>{currency.quote.EUR.price.toFixed(2)} €</Text>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  <Ionicons
                    name={currency.quote.EUR.percent_change_1h > 0 ? 'caret-up' : 'caret-down'}
                    size={16}
                    color={currency.quote.EUR.percent_change_1h > 0 ? 'green' : 'red'}
                  />
                  <Text
                    style={{ color: currency.quote.EUR.percent_change_1h > 0 ? 'green' : 'red' }}>
                    {currency.quote.EUR.percent_change_1h.toFixed(2)} %
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};
export default Page;