import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/ThemedText';

type ProfileType = {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  preferences: {
    favoriteGenres: string;
    preferredAuthors: string;
  };
};

export default function Profile() {
  const [profile, setProfile] = useState<ProfileType>({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentDetails: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
    preferences: {
      favoriteGenres: '',
      preferredAuthors: '',
    },
  });

  const handleInputChange = (field: keyof Omit<ProfileType, 'paymentDetails' | 'preferences'>, value: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (
    category: 'paymentDetails' | 'preferences',
    field: keyof ProfileType['paymentDetails'] | keyof ProfileType['preferences'],
    value: string
  ) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [category]: {
        ...prevProfile[category],
        [field]: value,
      },
    }));
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Profile Information</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={profile.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={profile.email}
        onChangeText={(text) => handleInputChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={profile.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={profile.address}
        onChangeText={(text) => handleInputChange('address', text)}
      />

      <ThemedText type="subtitle">Payment Details</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={profile.paymentDetails.cardNumber}
        onChangeText={(text) => handleNestedInputChange('paymentDetails', 'cardNumber', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date"
        value={profile.paymentDetails.expiryDate}
        onChangeText={(text) => handleNestedInputChange('paymentDetails', 'expiryDate', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={profile.paymentDetails.cvv}
        onChangeText={(text) => handleNestedInputChange('paymentDetails', 'cvv', text)}
      />

      <ThemedText type="subtitle">Preferences</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Favorite Genres"
        value={profile.preferences.favoriteGenres}
        onChangeText={(text) => handleNestedInputChange('preferences', 'favoriteGenres', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Preferred Authors"
        value={profile.preferences.preferredAuthors}
        onChangeText={(text) => handleNestedInputChange('preferences', 'preferredAuthors', text)}
      />

      <Button title="Save Profile" onPress={() => console.log(profile)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
});
