# Manual: Automatické spouštění OpenClaw (Systemd)

Tento návod ti pomůže nastavit OpenClaw jako systémovou službu, která se automaticky spustí po startu serveru a sama se restartuje v případě pádu.

## 1. Ověření cesty k OpenClaw
Nejprve zjisti, kde přesně je OpenClaw nainstalován. Jako root zadej:
```bash
which openclaw
```
*(Předpokládejme, že výsledek je `/usr/bin/openclaw` nebo `/usr/local/bin/openclaw`. Tuto cestu použijeme v konfiguračním souboru.)*

## 2. Vytvoření souboru služby (jako root)
Vytvoř nový soubor pro konfiguraci služby:
```bash
nano /etc/systemd/system/openclaw.service
```

Vlož do něj tento obsah:

```ini
[Unit]
Description=OpenClaw AI Gateway
After=network.target

[Service]
Type=simple
User=openclaw
Group=openclaw
WorkingDirectory=/home/openclaw
# Sem doplň cestu, kterou ti vypsal příkaz 'which openclaw'
ExecStart=/usr/bin/openclaw gateway
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=openclaw

[Install]
WantedBy=multi-user.target
```

## 3. Aktivace služby (jako root)
Nyní službu zaregistruj a spusť:

1. **Znovu načti konfiguraci systemd:**
   ```bash
   systemctl daemon-reload
   ```
2. **Povol spuštění po startu:**
   ```bash
   systemctl enable openclaw
   ```
3. **Spusť bota hned teď:**
   ```bash
   systemctl start openclaw
   ```

## 4. Kontrola stavu
Zda bot běží, zjistíš příkazem:
```bash
systemctl status openclaw
```

Pokud bys chtěl vidět živý výpis (místo `openclaw gateway`), použij:
```bash
journalctl -u openclaw -f
```

---

> [!TIP]
> **Důležité:** Než službu nahodíš, ujisti se, že jsi vypnul ručně spuštěnou bránu (`openclaw gateway stop`), jinak se budou prát o stejný port!
