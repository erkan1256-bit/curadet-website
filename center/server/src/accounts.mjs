const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

export const accounts = {
  info: {
    address: required('INFO_EMAIL'),
    password: required('INFO_PASSWORD'),
    unit: '00 — CURADET MERKEZ'
  },
  sync: {
    address: required('SYNC_EMAIL'),
    password: required('SYNC_PASSWORD'),
    unit: '05 — Sync & B2B'
  },
  rights: {
    address: required('RIGHTS_EMAIL'),
    password: required('RIGHTS_PASSWORD'),
    unit: '04 — Haklar & Dağıtım'
  }
};

export const mailConfig = {
  imap: {
    host: process.env.SPACEMAIL_IMAP_HOST || 'mail.spacemail.com',
    port: Number(process.env.SPACEMAIL_IMAP_PORT || 993),
    secure: true
  },
  smtp: {
    host: process.env.SPACEMAIL_SMTP_HOST || 'mail.spacemail.com',
    port: Number(process.env.SPACEMAIL_SMTP_PORT || 465),
    secure: true
  }
};
