# CO2 Warner

ESPHome-Projekt für einen ESP32-WROOM-32 Luftqualitätsmonitor mit Web-Oberfläche, Display und Status-LEDs.

## Features

- **MH-Z19** – CO₂-Messung (ppm)
- **BME280** – Temperatur, Luftfeuchtigkeit, Luftdruck
- **MQ135** – Luftqualität mit berechnetem **AQI** und PPM
- **PCD8544** (Nokia 5110, 84×48) – 3 rotierende Anzeigeseiten (System / Luft / Klima)
- **4× WS2812** – Farb-Status-LEDs für CO₂, Temperatur, Feuchte und MQ-AQI
- **Piezo** – Alarm bei hohem CO₂
- **Web-GUI** (ESPHome v3) – Messwerte, Bedienelemente, Debug-Log
- **Kalibrierung** – MH-Z19 Nullpunkt & MQ135 Frischluft per Button
- Statische IP: `192.168.178.55`

## Hardware (GPIO)

| Komponente | Pins |
|------------|------|
| BME280 (I2C) | SDA GPIO21, SCL GPIO22 |
| MH-Z19 (UART) | TX GPIO17 → Sensor RX, RX GPIO16 → Sensor TX |
| MQ135 (ADC) | GPIO34 |
| WS2812 (4 LEDs) | GPIO5 |
| PCD8544 SPI | CLK 18, MOSI 23, CS 13, DC 4, RST 26 |
| Display-Backlight | GPIO27 (aktiv-LOW) |
| Piezo | GPIO25 |

## Installation

1. Repository klonen oder Dateien nach `/config/esphome/` (Home Assistant) kopieren
2. Secrets anlegen:

   ```bash
   cp secrets.yaml.example secrets.yaml
   ```

3. `secrets.yaml` mit WiFi und API-Key befüllen
4. Auf Home Assistant: ESPHome Dashboard → **Install**
5. Oder per CLI:

   ```bash
   esphome run co2-warner.yaml
   ```

## Dateien

| Datei | Beschreibung |
|-------|--------------|
| `co2-warner.yaml` | Hauptkonfiguration |
| `layout.js` | Custom Web-UI-Layout (Messwerte links, Bedienung rechts, Log unten) |
| `secrets.yaml.example` | Vorlage für lokale Secrets |

## Web-Oberfläche

Nach dem Flash: [http://YourSensorIP](http://YourSensorIP)

- **Messwerte** – alle Sensoren inkl. MQ135 AQI
- **Bedienelemente** – Backlight, Kontrast, Alarm-Schwelle, Kalibrierung
- **Debug Log** – unten über volle Breite

## Display-Seiten (Wechsel alle 5 s)

1. **System** – IP, RSSI, Uptime
2. **Luft** – CO₂, AQI, PPM
3. **Klima** – Temperatur, Feuchte, Druck

## Lizenz

MIT
