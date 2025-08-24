// pwa-final/src/components/TipCreator.tsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { agoraEngineAddress, agoraEngineABI } from '../config';
import { parseEther } from 'viem';
import { notifications } from '@mantine/notifications';
import { Paper, Title, Text, TextInput, Button, NumberInput } from '@mantine/core';

export function TipCreator() {
  const location = useLocation();
  const [handle, setHandle] = useState('');
  const [amount, setAmount] = useState<string | number>('');
  const [message, setMessage] = useState('');
  
  const { data: hash, writeContract, isPending: isSubmitting, reset } = useWriteContract({
    mutation: {
      onError: (error) => {
        notifications.show({ color: 'red', title: 'Error en la Transacción', message: error.message });
      }
    }
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ 
    hash, 
  });

  useEffect(() => {
    if (location.state?.handle) {
      setHandle(location.state.handle);
    }
  }, [location.state]);

  useEffect(() => {
    if (isConfirmed) {
      notifications.show({ color: 'green', title: '¡Éxito!', message: `Propina confirmada en la blockchain!` });
      setHandle('');
      setAmount('');
      setMessage('');
      reset();
    }
  }, [isConfirmed, reset]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!handle || !amount || parseFloat(amount.toString()) <= 0) {
        notifications.show({ color: 'yellow', title: 'Datos incompletos', message: 'Por favor, introduce un handle y un monto mayor a cero.' });
        return;
    }
    try {
        const tipInWei = parseEther(amount.toString());
        writeContract({
            address: agoraEngineAddress,
            abi: agoraEngineABI,
            functionName: 'tip',
            args: [handle, message, tipInWei],
            value: tipInWei,
        });
    } catch (e) {
        console.error("Error al preparar la transacción:", e);
        notifications.show({ color: 'red', title: 'Error de formato', message: 'El monto ingresado no es válido.' });
    }
  }

  const isPending = isSubmitting || isConfirming;

  return (
    <Paper withBorder shadow="md" p="xl" radius="md">
      <Title order={2}>2. Enviar Apoyo</Title>
      <Text c="dimmed" size="sm" mb="lg">Apoya a un creador con una propina directa.</Text>
      <form onSubmit={submit}>
        <TextInput
          label="Handle del Creador"
          placeholder="MiProyectoSocial"
          required
          value={handle}
          onChange={(event) => setHandle(event.currentTarget.value)}
          mb="sm"
        />
        <NumberInput
          label="Monto (ETH)"
          placeholder="0.1"
          required
          value={amount}
          onChange={setAmount}
          allowDecimal
          decimalScale={18}
          min={0}
          mb="sm"
        />
        <TextInput
          label="Mensaje (Opcional)"
          placeholder="¡Sigue así!"
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
        />
        <Button type="submit" mt="md" loading={isPending} fullWidth color="green">
          {isSubmitting ? 'Enviando...' : isConfirming ? 'Confirmando en Blockchain...' : 'Enviar Propina'}
        </Button>
      </form>
    </Paper>
  );
}