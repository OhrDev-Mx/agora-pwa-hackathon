// pwa-final/src/App.tsx
import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { RegisterCreator } from './components/RegisterCreator';
import { TipCreator } from './components/TipCreator';
import { Link } from 'react-router-dom';
// CORRECCIÓN AQUÍ: Eliminamos 'Box' que no se usa
import { AppShell, Burger, Group, Button, Title, Text, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function App() {
  // ... (el resto del código es perfecto y no cambia)
  const [isClient, setIsClient] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [opened, { toggle }] = useDisclosure();

  useEffect(() => { setIsClient(true) }, []);

  if (!isClient) return null;

  if (isConnected) {
    return (
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Title order={3}>Agora Engine</Title>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Button onClick={() => disconnect()} variant="light" color="red" size="xs">Desconectar</Button>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Text size="xs" ff="monospace">{address}</Text>
          <Link to="/creators"><Button mt="md" variant="subtle" fullWidth>Ver Creadores</Button></Link>
        </AppShell.Navbar>

        <AppShell.Main>
          <Container size="lg" py="xl">
            <Group grow align="flex-start" justify="center">
              <RegisterCreator />
              <TipCreator />
            </Group>
          </Container>
        </AppShell.Main>
      </AppShell>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 bg-slate-100 text-center">
        <div className="max-w-md">
            <Title order={1}><Text span variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>Agora Engine</Text></Title>
            <Text c="dimmed" mt="md">La nueva economía para creadores, impulsada por Monad. Descentralizada, instantánea y fácil de usar.</Text>
            <Button onClick={() => connect({ connector: injected() })} size="lg" mt="xl" variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 90 }}>
                Conectar Wallet
            </Button>
        </div>
    </main>
  );
}