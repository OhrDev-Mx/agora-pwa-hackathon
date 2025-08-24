// pwa-final/src/pages/CreatorsPage.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useReadContract } from 'wagmi';
import { readContracts } from 'wagmi/actions';
import { config } from '../main';
import { agoraEngineABI, agoraEngineAddress } from '../config';
import { Link } from 'react-router-dom';
import { Container, Title, Text, Button, Paper, Loader, Group, SimpleGrid, Avatar, Box } from '@mantine/core'; // <--- CORRECCIÓN AQUÍ

interface Creator {
  wallet: `0x${string}`;
  platform: string;
  handle: string;
}

const borringAvatarUrl = (seed: string) => `https://source.boringavatars.com/marble/120/${seed}`;

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: creatorHandles, refetch: refetchHandles } = useReadContract({
    address: agoraEngineAddress,
    abi: agoraEngineABI,
    functionName: 'getAllCreatorHandles',
  });

  const fetchCreatorDetails = useCallback(async () => {
    if (!creatorHandles || creatorHandles.length === 0) {
      setCreators([]);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const contractsToRead = creatorHandles.map(handle => ({
        address: agoraEngineAddress,
        abi: agoraEngineABI,
        functionName: 'creators',
        args: [handle],
      }));
      const results = await readContracts(config, { contracts: contractsToRead });
      const fetchedCreators = results.filter(d => d.status === 'success' && d.result).map((d: any) => ({
        wallet: d.result[0], platform: d.result[1], handle: d.result[2]
      }));
      setCreators(fetchedCreators);
    } catch (error) { console.error(error); }
    finally { setIsLoading(false); }
  }, [creatorHandles]);

  useEffect(() => { fetchCreatorDetails(); }, [fetchCreatorDetails]);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-slate-100 text-black">
      <Container size="md" className="w-full">
        <Group justify="space-between" mb="xl">
            <Title order={1}>Comunidad de Creadores</Title>
            <Button component={Link} to="/" variant="light">← Dashboard</Button>
        </Group>
        
        <Button onClick={() => refetchHandles()} disabled={isLoading} fullWidth mb="xl">
          {isLoading ? 'Cargando...' : 'Refrescar Lista'}
        </Button>

        {isLoading ? <Group justify="center"><Loader /></Group> : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {creators.length > 0 ? (
              creators.map((creator) => (
                <Paper key={creator.wallet} withBorder shadow="sm" p="md" radius="md">
                  <Group>
                    <Avatar src={borringAvatarUrl(creator.wallet)} size="lg" radius="xl" />
                    <Box>
                      <Text fw={700} size="lg">{creator.handle}</Text>
                      <Text c="dimmed" size="sm">{creator.platform}</Text>
                    </Box>
                  </Group>
                  <Text ff="monospace" size="xs" c="dimmed" mt="sm" truncate>{creator.wallet}</Text>
                  <Button component={Link} to="/" state={{ handle: creator.handle }} fullWidth mt="md" variant="light">
                    Enviar Propina
                  </Button>
                </Paper>
              ))
            ) : (
              <Text c="dimmed" ta="center">No se encontraron creadores.</Text>
            )}
          </SimpleGrid>
        )}
      </Container>
    </main>
  );
}