# Agora Engine - Hackathon Monad

**Agora Engine** es un protocolo de monetización descentralizado y de bien público, construido sobre Monad para la nueva economía de creadores. Nuestra misión es crear rieles de pago directos, transparentes y de bajo costo para empoderar a artistas, ONGs, educadores y proyectos de impacto social, eliminando a los intermediarios que se quedan con hasta el 30% de las ganancias.

Esta es nuestra sumisión para el **Hackathon Monad**, enfocada en ser una aplicación móvil (PWA), Web3 nativa y extremadamente fácil de usar.

---

## 🔥 Features Clave

- **Registro On-Chain:** Los creadores pueden registrar sus proyectos en la blockchain, haciéndolos públicamente descubribles y verificables.
- **Propinas Directas:** Los fans pueden enviar propinas en la moneda nativa de Monad directamente a la wallet del creador, de forma instantánea.
- **Seguridad Robusta:** El smart contract revierte automáticamente las transacciones enviadas a creadores que no existen, protegiendo los fondos de los usuarios.
- **Interfaz Mobile-First:** Construido como una PWA (Progressive Web App) para una experiencia fluida en cualquier dispositivo móvil.
- **Diseño Profesional:** Interfaz de usuario limpia y moderna construida con Mantine para una experiencia de usuario de primer nivel.

---

## 🏆 Integración de Bounties

Hemos enfocado nuestro desarrollo en integrar tecnologías clave del ecosistema para demostrar la viabilidad y el poder de Agora Engine:

- **ParaX (UX Fluida):** Toda la aplicación está diseñada para ser compatible con wallets de Account Abstraction como ParaX, permitiendo una experiencia de usuario sin fricción, sin la necesidad de gestionar gas o transacciones complejas.
- **0x API (Pagos Multi-Token):** Implementamos una interfaz que demuestra el flujo de aprobación de tokens ERC20 (como USDC) para permitir pagos con cualquier moneda. La lógica simulada en el frontend muestra cómo la API de 0x se utilizaría para ejecutar swaps atómicos, mejorando drásticamente la accesibilidad para donantes globales.
- **Blockchain for Good Alliance (BGA):** El corazón de Agora Engine es el impacto social. Al crear una infraestructura de pago abierta y de bajo costo, proveemos una herramienta de soberanía financiera para creadores en economías emergentes y para organizaciones sin fines de lucro, alineándonos perfectamente con la misión de BGA.
- **Reown (Visión a Futuro):** Nuestra arquitectura está diseñada para ser el riel de pagos del futuro de la propiedad intelectual. A futuro, Agora Engine se integrará con protocolos como Reown para automatizar el pago instantáneo de regalías a los dueños de IP tokenizada.

---

## 🚀 Cómo Correr el Proyecto Localmente

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://www.youtube.com/watch?v=3GymExBkKjE](https://www.youtube.com/watch?v=3GymExBkKjE)
    cd pwa-final
    ```
2.  **Instalar dependencias:**
    ```bash
    pnpm install
    ```
3.  **Iniciar Blockchain Local (Terminal 1):**
    ```bash
    anvil
    ```
4.  **Desplegar Contratos (Terminal 2):**
    Navega a la carpeta `contracts` y despliega `AgoraEngine` y `MockUSDC`.
    ```bash
    cd contracts
    forge script script/DeployAgoraEngine.s.sol:DeployAgoraEngine --rpc-url [http://127.0.0.1:8545](http://127.0.0.1:8545) --private-key <TU_LLAVE_PRIVADA_DE_ANVIL> --broadcast
    forge script script/DeployMockUSDC.s.sol:DeployMockUSDC --rpc-url [http://127.0.0.1:8545](http://127.0.0.1:8545) --private-key <TU_LLAVE_PRIVADA_DE_ANVIL> --broadcast
    ```
5.  **Configurar la App:**
    Actualiza las direcciones de los contratos desplegados en el archivo `src/config/index.ts`.
6.  **Iniciar la App (Terminal 3):**
    ```bash
    pnpm dev
    ```