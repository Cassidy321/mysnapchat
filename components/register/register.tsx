// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleRegister = async () => {
//     try {
//       const response = await fetch('https://snapchat.epidoc.eu', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, username, password }),
//       });

//       if (response.ok) {
//         console.log('Inscription réussie !');
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || 'Échec de l\'inscription');
//         console.error('Échec de l\'inscription');
//       }
//     } catch (error) {
//       setErrorMessage('Erreur lors de l\'inscription');
//       console.error('Erreur lors de l\'inscription', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Page d'inscription</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="E-mail"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Nom d'utilisateur"
//         value={username}
//         onChangeText={setUsername}
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mot de passe"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         autoCapitalize="none"
//       />
//       <Button title="S'inscrire" onPress={handleRegister} />
//       {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
//   error: {
//     color: 'red',
//     marginTop: 8,
//     textAlign: 'center',
//   },
// });

// export default Register;