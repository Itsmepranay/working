import { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { router } from 'expo-router';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(true);
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/register`, {
        name,
        email,
        phone,
        password,
      });

      if (res.data.success) {
        Alert.alert('OTP Sent', res.data.message || 'OTP sent to your email');
        setShowOtpInput(true); // ⬅ Show OTP input now
      } else {
        setMessage(res.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Registration failed.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/verify-registration`, {
        email,
        otp,
      });

      if (res.data.message === 'Registration successful') {
        Alert.alert('Success', 'You are now registered!');
        router.replace('/login'); // ✅ Adjust to your login route
      } else {
        Alert.alert('Error', res.data.message);
      }
    } catch (err) {
      console.error('OTP verify error:', err);
      Alert.alert('Error', 'Verification failed');
    }
  };


  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{ marginBottom: 20, borderBottomWidth: 1 }}
      />
      <Button title="Register" onPress={handleRegister} />

      {showOtpInput && (
        <>
          <Text style={{ marginTop: 20 }}>Enter OTP sent to your email</Text>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            style={{ marginBottom: 10, borderBottomWidth: 1 }}
          />
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
        </>
      )}

      <Text style={{ marginTop: 10 }}>{message}</Text>
    </View>
  );
}
