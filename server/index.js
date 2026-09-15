import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PUERTO = process.env.PORT || 3001;

app.get("/", (_req, res) => {
  res.send("Servidor de notificaciones funcionando");
});

app.post("/api/notificar", async (req, res) => {
  try {
    const { emoji, label } = req.body ?? {};

    if (!emoji) {
      return res.status(400).json({ error: "Falta el campo 'emoji'" });
    }

    const mensaje = label
      ? `${label} ❤️`
      : `Alguien reaccionó a tu carta con: ${emoji}`;

    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      return res.status(500).json({
        error: "Faltan las variables TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID",
      });
    }

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: mensaje,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ ok: true, data });
  } catch (error) {
    console.error("Error enviando notificación:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PUERTO, () => {
  console.log(`Servidor de notificaciones en el puerto ${PUERTO}`);
});
