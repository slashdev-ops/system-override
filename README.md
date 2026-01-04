# SLASHDEV | SYSTEM OVERRIDE

> Interactive Engineering Portfolio featuring Lidar simulation, Mathematical Sound Synthesis, and Layered UI Architecture.

![System Status](https://img.shields.io/badge/SYSTEM-ONLINE-00ff9d?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/ASTRO-REACT-orange?style=for-the-badge)

## 📡 Mission Brief
This project is not just a static website; it's a **Single Page Application (SPA)** built to demonstrate full-spectrum engineering capabilities. It mimics a military/industrial control interface using modern web technologies.

## 🛠 Tech Stack & Architecture

### Core System
- **Framework:** [Astro 5.0](https://astro.build) (Island Architecture for performance).
- **Transitions:** `ClientRouter` for app-like, non-refreshing navigation.
- **Styling:** TailwindCSS + Custom "Onion Layering" masking techniques.

### Key Modules

#### 1. Mathematical Audio Synthesis 🔊
Instead of loading heavy MP3 assets, the system generates UI sounds in real-time using the **Web Audio API**.
- `Oscillators`: Sine waves for hover, Square waves for clicks.
- `GainNodes`: Exponential ramping for envelope shaping.
- **Benefit:** Zero load time, infinite variety.

#### 2. Lidar Visualization (Three.js) 🌐
A custom 3D point cloud background simulating aerial scanning.
- Optimized geometry rotation (GPU offloading).
- Responsive particle density based on viewport.

#### 3. Secure Terminal Emulator 💻
A functional CLI (Command Line Interface) accessible via global hotkey (`~` or `F2`).
- Supports commands: `help`, `whoami`, `sky_eye`, `sudo`.
- Hidden "Capture The Flag" mechanics embedded in the mission reports.

## 🚀 Deployment

The system is designed for Edge Deployment via **Vercel**.

```bash
# Clone repository
git clone [https://github.com/slashdev-ops/system-override.git](https://github.com/slashdev-ops/system-override.git)

# Install dependencies
npm install

# Initialize local dev environment
npm run dev

© 2025 SlashDev Operations. All systems nominal.