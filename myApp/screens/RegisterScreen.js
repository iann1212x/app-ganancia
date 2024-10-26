import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth, db } from '../services/firebase';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Guardar el enlace de referido único en Firebase
            const referralLink = `https://appgan.com/register?referral=${user.uid}`;
            await db.collection('users').doc(user.uid).set({
                email: user.email,
                coins: 50, // Bono inicial
                referralLink: referralLink,
            });

            navigation.navigate('Home'); // Redirige al usuario a la pantalla principal
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
            <Button title="Register" onPress={handleRegister} />
            <Text onPress={() => navigation.navigate('Login')}>¿Ya tienes cuenta? Inicia sesión</Text>
        </View>
    );
}

const newUserSignUp = async (newUserId, referralId) => {
    const userRef = db.collection('users').doc(newUserId);
    const referralUserRef = db.collection('users').doc(referralId);

    await userRef.set({ coins: 50 }, { merge: true });

    const referralUserDoc = await referralUserRef.get();
    if (referralUserDoc.exists) {
        const newCoins = (referralUserDoc.data().coins || 0) + 100;
        await referralUserRef.update({ coins: newCoins });
    }
};
