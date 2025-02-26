/*import React, { createContext, useEffect, useState, ReactNode } from 'react';
import TokenService from '../../services/localStorage/auth-token';
import { Center, Loader, Space, Stack, Text, Title } from '@mantine/core';


interface AuthContextType {
  keycloak: Keycloak | null;
  authenticated: boolean;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
    keycloak: null,
    authenticated: false,
    login: () => null,
    logout: () => null,
});


const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const keycloakInstance = new Keycloak({
        url: keycloakServer,
        realm: keycloakRealm,
        clientId: keycloakClientID,
    });

    keycloakInstance.init({
        pkceMethod: 'S256',
        onLoad: 'login-required',
        silentCheckSsoRedirectUri: window.location.href
    })
      .then(isAuthenticated => {
        TokenService.setNewToken(keycloakInstance.token || "")
        setKeycloak(keycloakInstance);
        setAuthenticated(isAuthenticated);

      })
      .catch(err => {
        console.log('Failed to initialize Keycloak', err);
      });

    const refreshToken = () => {
      if (keycloakInstance) {
        keycloakInstance.updateToken()
          .then((isRefreshed) => {
            TokenService.setNewToken(keycloakInstance.token || "")
            console.log(`Token refreshed: ${isRefreshed}`);
          })
          .catch(() => {
            console.log('Failed to refresh token, logging out');
            keycloakInstance.logout();
          });
      }
    };

    const interval = setInterval(refreshToken, keycloakRefreshTime);
    return () => clearInterval(interval);
  }, []);

  const login = () => {
    keycloak?.login();
  };

  const logout = () => {
    keycloak?.logout();
  };

  const value: AuthContextType = {
    keycloak,
    authenticated,
    login,
    logout,
  };

  if (!keycloak) {
    return (
        <Center h={"100%"} >
            <Stack
                align="stretch"
                justify="center"
                gap="xs"
            >
                <Title order={2}>
                    Идет аутентификация
                </Title>
                <Text ta="center">
                    Пожалуйста подождите...
                </Text>
                <Space/>
                <Loader mx="auto" color="green" size="lg" type="bars" />
            </Stack>
            
        </Center>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export {AuthContext};*/