// pwa-final/src/components/RegisterCreator.tsx
import { useState, useEffect } from 'react';
import { useWriteContract } from 'wagmi';
import { agoraEngineAddress, agoraEngineABI } from '../config';
import { notifications } from '@mantine/notifications';
import { Paper, Title, Text, TextInput, Button } from '@mantine/core';

export function RegisterCreator() {
  const [handle, setHandle] = useState('');
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      notifications.show({ color: 'green', title: '¡Éxito!', message: 'Creador registrado en la blockchain.' });
    }
    if (error) {
      // CORRECCIÓN AQUÍ: error.message en lugar de error.shortMessage
      notifications.show({ color: 'red', title: 'Error', message: error.message });
    }
  }, [isSuccess, error]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!handle) return;
    writeContract({
      address: agoraEngineAddress,
      abi: agoraEngineABI,
      functionName: 'registerCreator',
      args: ['Web', handle],
    });
  }

  return (
    <Paper withBorder shadow="md" p="xl" radius="md">
      <Title order={2}>1. Registrarse</Title>
      <Text c="dimmed" size="sm" mb="lg">Añade tu proyecto o perfil a la blockchain para recibir apoyo directo.</Text>
      <form onSubmit={submit}>
        <TextInput
          label="Tu Handle o Nombre de Proyecto"
          placeholder="MiProyectoSocial"
          required
          value={handle}
          onChange={(event) => setHandle(event.currentTarget.value)}
        />
        <Button type="submit" mt="md" loading={isPending} fullWidth>
          Registrar Proyecto
        </Button>
      </form>
    </Paper>
  );
}