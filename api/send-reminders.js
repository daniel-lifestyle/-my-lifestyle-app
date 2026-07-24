import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const { data: clientes, error } = await supabase
      .from('clientes')
      .select('nombre, email');

    if (error) throw error;

    for (const cliente of clientes) {
      await transporter.sendMail({
        from: `"My Lifestyle by Deniel" <${process.env.GMAIL_USER}>`,
        to: cliente.email,
        subject: 'Tu recordatorio diario de hábitos',
        text: `Hola ${cliente.nombre}, no olvides registrar tus hábitos de hoy en tu portal.`,
      });
    }

    res.status(200).json({ success: true, enviados: clientes.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const { data: clientes, error } = await supabase
      .from('clientes')
      .select('nombre, email');

    if (error) throw error;

    for (const cliente of clientes) {
      await transporter.sendMail({
        from: `"My Lifestyle by Deniel" <${process.env.GMAIL_USER}>`,
        to: cliente.email,
        subject: 'Tu recordatorio diario de hábitos',
        text: `Hola ${cliente.nombre}, no olvides registrar tus hábitos de hoy en tu portal.`,
      });
    }

    res.status(200).json({ success: true, enviados: clientes.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
