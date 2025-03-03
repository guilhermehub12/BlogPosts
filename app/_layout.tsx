import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from './store';
import { userStorage } from './utils/storage';
import { setCurrentUser } from './store/reducers/usersSlice';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    // Carrega o usuário atual do storage ao iniciar o app
    const loadCurrentUser = async () => {
      const user = await userStorage.getCurrentUser();

      if (user) {
        store.dispatch(setCurrentUser(user));
      } else {
        // Se não houver usuário, define um padrão (para fins de demo)
        const defaultUser = {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: 'Kulas Light',
          phone: '1-770-736-8031 x56442',
          website: 'hildegard.org',
          company: 'Romaguera-Crona, 400',
          avatar: 'https://ui-avatars.com/api/?name=Leanne+Graham&size=128&background=random'
        };

        store.dispatch(setCurrentUser(defaultUser));
        await userStorage.saveCurrentUser(defaultUser);
      }
    };

    loadCurrentUser();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="post/[id]" />
        <Stack.Screen name="user/[id]" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
}