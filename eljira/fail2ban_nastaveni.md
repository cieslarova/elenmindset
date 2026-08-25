# Návod: Konfigurace Fail2Ban na Ubuntu 24.04

Fail2Ban chrání váš server před brute-force útoky tím, že sleduje logy a automaticky blokuje IP adresy vykazující podezřelé chování.

## 1. Instalace
```bash
sudo apt update
sudo apt install fail2ban -y
```

## 2. Základní konfigurace
Konfigurační soubory Fail2Ban se nacházejí v `/etc/fail2ban/`. Nikdy neupravujte přímo `jail.conf`, ale vytvořte si vlastní kopii `jail.local`.

```bash
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
```

### Doporučené globální nastavení (v `[DEFAULT]` sekci):
```ini
[DEFAULT]
# IP adresy, které nikdy nebudou zablokovány (vaše domácí IP)
ignoreip = 127.0.0.1/8 ::1

# Doba banu (např. 1 hodina)
bantime  = 1h

# Časové okno pro sledování pokusů
findtime  = 10m

# Počet pokusů před banem
maxretry = 5
```

## 3. Nastavení "Jails" (Vězení)

Aktivujte ochranu pro SSH a Nginx přidáním nebo upravením následujících sekcí v `jail.local`:

### SSH (Chrání vzdálený přístup)
```ini
[sshd]
enabled = true
port    = ssh
logpath = %(sshd_log)s
backend = %(sshd_backend)s
```

### Nginx (Chrání webový server)
```ini
[nginx-http-auth]
enabled = true
port    = http,https
logpath = %(nginx_error_log)s

[nginx-botsearch]
enabled = true
port    = http,https
logpath = %(nginx_error_log)s
maxretry = 2
```

## 4. Ověření funkčnosti

Po spuštění služby zkontrolujte její stav:
```bash
sudo systemctl status fail2ban
```
Pokud vidíte `active (running)`, služba je v pořádku.

### Kontrola stavu vězení (Jails)
Zjištění, která vězení jsou aktivní:
```bash
sudo fail2ban-client status
```

Detailní pohled na konkrétní vězení (např. SSH):
```bash
sudo fail2ban-client status sshd
```
Zde uvidíte počet zablokovaných IP adres (`Currently banned`).

## 5. Správa a řešení problémů

---
**Tip**: Pro maximální bezpečnost doporučuji v `jail.local` nastavit delší `bantime` (např. `24h`) pro opakované útočníky.
