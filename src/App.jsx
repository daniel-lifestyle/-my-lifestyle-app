import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "./supabaseClient.js";

const FONT_SERIF = "'Fraunces', Georgia, serif";
const FONT_SANS = "'Inter', system-ui, sans-serif";

const BRAND_NAME = "My Lifestyle";
const BRAND_BY = "by Deniel";
const WHATSAPP_NUMBER = "593958797920";
const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const COLORS = {
  cream: "#FAF7F0",
  creamDeep: "#F2EDE1",
  ink: "#1F1D1A",
  inkSoft: "#5C5850",
  olive: "#4A5D3A",
  oliveDeep: "#33401F",
  oliveLight: "#E4E9DB",
  terracotta: "#C97250",
  terracottaDeep: "#8F4A30",
  terracottaLight: "#F3E0D6",
  line: "#DCD5C4",
};

function useFonts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
}

const SEED_CLIENTS = [
  {
    id: "c1",
    name: "Andrea Salcedo",
    goal: "Bajar de peso sin perder energía en el trabajo",
    startDate: "2026-05-12",
    streak: 14,
    weekNumber: 3,
    totalWeeks: 8,
    status: "on-track",
    weight: [78.4, 77.9, 77.1, 76.6],
    habits: [
      { id: "h1", label: "Caminar 20 min", done: [true, true, false, true, true, true, false] },
      { id: "h2", label: "Agua: 2 litros", done: [true, true, true, true, false, true, true] },
      { id: "h3", label: "Dormir 7+ horas", done: [false, true, true, false, true, true, true] },
    ],
    notes: "Buena adherencia. Bajar la dificultad del habito de sueno la proxima semana.",
    lastCheckin: "2026-06-22",
  },
  {
    id: "c2",
    name: "Jorge Pacheco",
    goal: "Volver al gym despues de 3 anos sedentario",
    startDate: "2026-06-02",
    streak: 4,
    weekNumber: 1,
    totalWeeks: 8,
    status: "needs-attention",
    weight: [92.1, 91.8],
    habits: [
      { id: "h1", label: "3 sesiones de fuerza", done: [true, false, false, true, false, false, false] },
      { id: "h2", label: "Proteina en cada comida", done: [true, true, false, false, true, false, false] },
    ],
    notes: "Le cuesta la constancia entre semana. Probar recordatorios a media tarde.",
    lastCheckin: "2026-06-18",
  },
  {
    id: "c3",
    name: "Valentina Rios",
    goal: "Mejorar habitos alimenticios trabajando desde casa",
    startDate: "2026-04-20",
    streak: 31,
    weekNumber: 6,
    totalWeeks: 8,
    status: "on-track",
    weight: [68.2, 67.6, 67.1, 66.8, 66.3],
    habits: [
      { id: "h1", label: "Sin snacks despues de las 9pm", done: [true, true, true, true, true, false, true] },
      { id: "h2", label: "Vegetales en almuerzo y cena", done: [true, true, true, true, true, true, true] },
    ],
    notes: "Excelente progreso. Lista para subir nivel de dificultad.",
    lastCheckin: "2026-06-23",
  },
];

function Badge({ tone = "olive", children }) {
  const map = {
    olive: { bg: COLORS.oliveLight, fg: COLORS.oliveDeep },
    terracotta: { bg: COLORS.terracottaLight, fg: COLORS.terracottaDeep },
  };
  const c = map[tone];
  return (
    <span
      style={{
        background: c.bg,
        color: c.fg,
        fontFamily: FONT_SANS,
        fontSize: 12,
        fontWeight: 500,
        padding: "4px 10px",
        borderRadius: 20,
        letterSpacing: 0.2,
      }}
    >
      {children}
    </span>
  );
}

function PageFolio({ n }) {
  return (
    <div
      style={{
        fontFamily: FONT_SERIF,
        fontSize: 13,
        color: COLORS.inkSoft,
        letterSpacing: 1,
      }}
    >
      {String(n).padStart(2, "0")}
    </div>
  );
}

function NavBar({ view, setView }) {
  const tabs = [
    { id: "landing", label: "Inicio" },
    { id: "apply", label: "Aplicar" },
    { id: "portal", label: "Portal cliente" },
    { id: "admin", label: "Panel coach" },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 32px",
        borderBottom: `1px solid ${COLORS.line}`,
        background: COLORS.cream,
      }}
    >
      <div
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 600,
          fontSize: 20,
          color: COLORS.ink,
          display: "flex",
          alignItems: "baseline",
          gap: 6,
        }}
      >
        {BRAND_NAME}
        <span style={{ color: COLORS.olive, fontStyle: "italic", fontSize: 16 }}>{BRAND_BY}</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setView(t.id)}
            style={{
              fontFamily: FONT_SANS,
              fontSize: 13,
              fontWeight: 500,
              padding: "8px 14px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: view === t.id ? COLORS.ink : "transparent",
              color: view === t.id ? COLORS.cream : COLORS.inkSoft,
              transition: "all 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Landing({ setView }) {
  return (
    <div style={{ background: COLORS.cream, minHeight: "100%" }}>
      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding: "72px 32px 48px",
        }}
      >
        <div style={{ display: "flex", gap: 56, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 420px", minWidth: 320 }}>
            <div
              style={{
                fontFamily: FONT_SANS,
                fontSize: 12,
                fontWeight: 500,
                color: COLORS.olive,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Coaching de habitos saludables
            </div>
            <h1
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 46,
                fontWeight: 500,
                lineHeight: 1.12,
                color: COLORS.ink,
                margin: "0 0 22px",
              }}
            >
              Tu progreso, llevado <em style={{ fontStyle: "italic", color: COLORS.olive }}>dia por dia</em>.
            </h1>
            <p
              style={{
                fontFamily: FONT_SANS,
                fontSize: 16,
                lineHeight: 1.7,
                color: COLORS.inkSoft,
                maxWidth: 460,
                margin: "0 0 32px",
              }}
            >
              Acompañamiento semanal para construir habitos que duran: alimentacion,
              movimiento y descanso. Sin dietas rigidas, sin promesas vacias. Solo
              consistencia, medida y ajustada cada semana contigo.
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 36 }}>
              <button
                onClick={() => setView("apply")}
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "13px 24px",
                  borderRadius: 8,
                  border: "none",
                  background: COLORS.olive,
                  color: COLORS.cream,
                  cursor: "pointer",
                }}
              >
                Aplicar a un cupo piloto
              </button>
              <button
                onClick={() => setView("portal")}
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "13px 24px",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.line}`,
                  background: "transparent",
                  color: COLORS.ink,
                  cursor: "pointer",
                }}
              >
                Ver portal de ejemplo
              </button>
            </div>
            <div style={{ display: "flex", gap: 28 }}>
              {[
                ["5", "cupos piloto"],
                ["8", "semanas por programa"],
                ["100%", "online"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 26, color: COLORS.ink }}>{n}</div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.inkSoft }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "1 1 300px", minWidth: 280 }}>
            <div
              style={{
                background: "white",
                border: `1px solid ${COLORS.line}`,
                borderRadius: 4,
                padding: "28px 26px",
                boxShadow: "2px 4px 0 rgba(31,29,26,0.04)",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 15, color: COLORS.ink }}>
                  Semana 3 &mdash; bitacora
                </div>
                <PageFolio n={3} />
              </div>
              {["Caminar 20 min", "Agua: 2 litros", "Dormir 7+ horas"].map((h, i) => (
                <div
                  key={h}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 0",
                    borderTop: i === 0 ? "none" : `1px solid ${COLORS.line}`,
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      border: `1.5px solid ${COLORS.olive}`,
                      background: i !== 1 ? COLORS.olive : "transparent",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.ink }}>{h}</span>
                </div>
              ))}
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: `1px solid ${COLORS.line}`,
                  fontFamily: FONT_SANS,
                  fontSize: 12,
                  color: COLORS.inkSoft,
                  fontStyle: "italic",
                }}
              >
                "Buena adherencia esta semana. Seguimos."
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 88,
            paddingTop: 48,
            borderTop: `1px solid ${COLORS.line}`,
          }}
        >
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 24,
              color: COLORS.ink,
              marginBottom: 36,
              fontWeight: 500,
            }}
          >
            Como funciona
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {[
              ["Aplicas", "Cuentas tu objetivo y tu situacion actual. Sin compromiso."],
              ["Diseñamos tu plan", "Habitos concretos, semana a semana, ajustados a tu rutina real."],
              ["Haces seguimiento", "Check-ins semanales por tu portal. Ajustamos juntos lo que no funciona."],
            ].map(([t, d], i) => (
              <div key={t}>
                <div
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: 13,
                    color: COLORS.terracotta,
                    marginBottom: 10,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: FONT_SANS, fontWeight: 500, fontSize: 15, color: COLORS.ink, marginBottom: 6 }}>
                  {t}
                </div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 13.5, color: COLORS.inkSoft, lineHeight: 1.6 }}>
                  {d}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 56,
            background: COLORS.oliveLight,
            borderRadius: 4,
            padding: "20px 24px",
            fontFamily: FONT_SANS,
            fontSize: 12.5,
            color: COLORS.oliveDeep,
            lineHeight: 1.6,
          }}
        >
          Este es un servicio de coaching de habitos y bienestar, no un servicio
          de nutricion clinica. No diagnosticamos ni tratamos condiciones medicas.
          Si tienes una condicion de salud diagnosticada, te referimos con un
          profesional de la salud licenciado.
        </div>
      </div>
    </div>
  );
}

function ApplyForm({ setView }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    email: "",
    goal: "",
    activity: "",
    schedule: "",
    healthFlag: "no",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const enviarAplicacion = async () => {
    setSubmitting(true);
    setSubmitError(null);
    const { error } = await supabase.from("aplicaciones").insert({
      nombre: data.name,
      email: data.email,
      objetivo: data.goal,
      nivel_actividad: data.activity,
      disponibilidad: data.schedule,
      tiene_condicion_medica: data.healthFlag === "si",
    });
    setSubmitting(false);
    if (error) {
      setSubmitError("No se pudo enviar la aplicacion. Intenta de nuevo en un momento.");
      console.error(error);
      return;
    }
    setSubmitted(true);
  };

  const steps = [
    {
      title: "Cuentame de ti",
      body: (
        <>
          <Field label="Nombre completo">
            <input
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Tu nombre"
              style={inputStyle}
            />
          </Field>
          <Field label="Correo">
            <input
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="tu@correo.com"
              style={inputStyle}
            />
          </Field>
        </>
      ),
    },
    {
      title: "Tu objetivo",
      body: (
        <>
          <Field label="Que te gustaria lograr en los proximos 2 meses">
            <textarea
              value={data.goal}
              onChange={(e) => update("goal", e.target.value)}
              placeholder="Ej. bajar de peso sin perder energia en el trabajo"
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
            />
          </Field>
          <Field label="Nivel de actividad actual">
            <select value={data.activity} onChange={(e) => update("activity", e.target.value)} style={inputStyle}>
              <option value="">Selecciona una opcion</option>
              <option value="sedentario">Sedentario, casi sin ejercicio</option>
              <option value="ligero">Activo ligero, 1-2 veces por semana</option>
              <option value="moderado">Activo moderado, 3-4 veces por semana</option>
              <option value="alto">Muy activo, 5+ veces por semana</option>
            </select>
          </Field>
        </>
      ),
    },
    {
      title: "Disponibilidad y salud",
      body: (
        <>
          <Field label="Cuanto tiempo puedes dedicar por semana">
            <select value={data.schedule} onChange={(e) => update("schedule", e.target.value)} style={inputStyle}>
              <option value="">Selecciona una opcion</option>
              <option value="bajo">Menos de 2 horas</option>
              <option value="medio">2 a 4 horas</option>
              <option value="alto">Mas de 4 horas</option>
            </select>
          </Field>
          <Field label="Tienes alguna condicion medica diagnosticada relacionada con tu alimentacion o salud metabolica?">
            <select value={data.healthFlag} onChange={(e) => update("healthFlag", e.target.value)} style={inputStyle}>
              <option value="no">No</option>
              <option value="si">Si</option>
            </select>
          </Field>
          {data.healthFlag === "si" && (
            <div
              style={{
                background: COLORS.terracottaLight,
                color: COLORS.terracottaDeep,
                fontFamily: FONT_SANS,
                fontSize: 12.5,
                padding: "12px 14px",
                borderRadius: 4,
                lineHeight: 1.6,
              }}
            >
              Gracias por contarmelo. Este programa es de habitos generales y no
              reemplaza atencion medica o nutricional clinica. Te recomendare
              trabajar en paralelo con un profesional de la salud licenciado, y con
              gusto te acompaño en la parte de habitos y consistencia.
            </div>
          )}
        </>
      ),
    },
  ];

  if (submitted) {
    return (
      <Centered>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <div style={{ fontFamily: FONT_SERIF, fontSize: 28, color: COLORS.ink, marginBottom: 14 }}>
            Aplicacion recibida
          </div>
          <p style={{ fontFamily: FONT_SANS, fontSize: 14.5, color: COLORS.inkSoft, lineHeight: 1.7, marginBottom: 28 }}>
            Gracias, {data.name.split(" ")[0] || "por tu interes"}. Voy a revisar tu
            objetivo y te escribo en menos de 48 horas para coordinar una llamada
            corta antes de empezar.
          </p>
          <button onClick={() => setView("landing")} style={primaryBtn}>
            Volver al inicio
          </button>
        </div>
      </Centered>
    );
  }

  return (
    <Centered>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                height: 3,
                flex: 1,
                borderRadius: 2,
                background: i <= step ? COLORS.olive : COLORS.line,
              }}
            />
          ))}
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.terracotta, marginBottom: 6, fontWeight: 500 }}>
          Paso {step + 1} de {steps.length}
        </div>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: 26, color: COLORS.ink, marginBottom: 22, fontWeight: 500 }}>
          {steps[step].title}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 32 }}>
          {steps[step].body}
        </div>
        {submitError && (
          <div
            style={{
              background: COLORS.terracottaLight,
              color: COLORS.terracottaDeep,
              fontFamily: FONT_SANS,
              fontSize: 12.5,
              padding: "10px 14px",
              borderRadius: 4,
              marginBottom: 16,
            }}
          >
            {submitError}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => (step === 0 ? setView("landing") : setStep(step - 1))}
            style={ghostBtn}
          >
            Atras
          </button>
          <button
            onClick={() => (step === steps.length - 1 ? enviarAplicacion() : setStep(step + 1))}
            style={{ ...primaryBtn, opacity: submitting ? 0.7 : 1 }}
            disabled={submitting}
          >
            {step === steps.length - 1 ? (submitting ? "Enviando..." : "Enviar aplicacion") : "Continuar"}
          </button>
        </div>
      </div>
    </Centered>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: FONT_SANS,
          fontSize: 12.5,
          fontWeight: 500,
          color: COLORS.inkSoft,
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  fontFamily: FONT_SANS,
  fontSize: 14,
  padding: "10px 12px",
  borderRadius: 6,
  border: `1px solid ${COLORS.line}`,
  background: "white",
  color: COLORS.ink,
  boxSizing: "border-box",
};

const primaryBtn = {
  fontFamily: FONT_SANS,
  fontSize: 14,
  fontWeight: 500,
  padding: "11px 22px",
  borderRadius: 8,
  border: "none",
  background: COLORS.olive,
  color: COLORS.cream,
  cursor: "pointer",
};

const ghostBtn = {
  fontFamily: FONT_SANS,
  fontSize: 14,
  fontWeight: 500,
  padding: "11px 22px",
  borderRadius: 8,
  border: `1px solid ${COLORS.line}`,
  background: "transparent",
  color: COLORS.ink,
  cursor: "pointer",
};

function Centered({ children }) {
  return (
    <div
      style={{
        background: COLORS.cream,
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "64px 24px",
      }}
    >
      {children}
    </div>
  );
}

const DAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];

function HabitGrid({ habits }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {habits.map((h) => (
        <div key={h.id}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.ink, marginBottom: 6 }}>
            {h.label}
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {DAY_LABELS.map((d, i) => {
              const done = h.done[i];
              const has = i < h.done.length;
              return (
                <div key={i} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: !has ? COLORS.creamDeep : done ? COLORS.olive : COLORS.terracottaLight,
                      border: !has ? `1px dashed ${COLORS.line}` : "none",
                    }}
                  >
                    {has && (
                      <i
                        className={done ? "ti ti-check" : "ti ti-x"}
                        style={{
                          fontSize: 13,
                          color: done ? COLORS.cream : COLORS.terracottaDeep,
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 10, color: COLORS.inkSoft, marginTop: 3 }}>
                    {d}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function WeightChart({ values }) {
  if (values.length < 2) return null;
  const w = 280;
  const h = 90;
  const min = Math.min(...values) - 0.5;
  const max = Math.max(...values) + 0.5;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  return (
    <svg width={w} height={h + 16} role="img" aria-label="Tendencia de peso">
      <path d={path} fill="none" stroke={COLORS.olive} strokeWidth="2" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={COLORS.olive} />
      ))}
    </svg>
  );
}

function ScheduleCard({ onStart }) {
  const sessions = [
    { day: "Mar 25 jun", time: "4:00 pm", label: "Check-in semanal" },
  ];
  return (
    <div style={{ background: "white", border: `1px solid ${COLORS.line}`, borderRadius: 6, padding: 22, marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500, color: COLORS.ink }}>
          Tu proxima videollamada
        </div>
        <Badge tone="olive">Confirmada</Badge>
      </div>
      {sessions.map((s) => (
        <div key={s.time} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: COLORS.oliveLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="ti ti-video" style={{ fontSize: 18, color: COLORS.oliveDeep }} aria-hidden="true" />
            </div>
            <div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 13.5, color: COLORS.ink, fontWeight: 500 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.inkSoft }}>
                {s.day} &middot; {s.time}
              </div>
            </div>
          </div>
        </div>
      ))}
      <button onClick={onStart} style={{ ...primaryBtn, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <i className="ti ti-video" style={{ fontSize: 16 }} aria-hidden="true" />
        Iniciar sesion con tu coach
      </button>
      <div style={{ fontFamily: FONT_SANS, fontSize: 11.5, color: COLORS.inkSoft, marginTop: 10, textAlign: "center" }}>
        El boton se activa 10 minutos antes de la hora agendada
      </div>
    </div>
  );
}

function VideoCallRoom({ clientName, onEnd }) {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (!joined) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [joined]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  if (!joined) {
    return (
      <div
        style={{
          minHeight: 420,
          background: COLORS.ink,
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: COLORS.oliveLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <i className="ti ti-user" style={{ fontSize: 32, color: COLORS.oliveDeep }} aria-hidden="true" />
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 15, color: "white", fontWeight: 500, marginBottom: 6 }}>
          Listo para tu sesion, {clientName.split(" ")[0]}
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>
          Verifica tu camara y microfono antes de entrar
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          <button
            onClick={() => setMicOn((v) => !v)}
            aria-label={micOn ? "Apagar microfono" : "Encender microfono"}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "none",
              background: micOn ? "rgba(255,255,255,0.12)" : COLORS.terracotta,
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className={micOn ? "ti ti-microphone" : "ti ti-microphone-off"} style={{ fontSize: 18 }} aria-hidden="true" />
          </button>
          <button
            onClick={() => setCamOn((v) => !v)}
            aria-label={camOn ? "Apagar camara" : "Encender camara"}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "none",
              background: camOn ? "rgba(255,255,255,0.12)" : COLORS.terracotta,
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className={camOn ? "ti ti-camera" : "ti ti-camera-off"} style={{ fontSize: 18 }} aria-hidden="true" />
          </button>
        </div>
        <button onClick={() => setJoined(true)} style={{ ...primaryBtn, padding: "12px 28px" }}>
          Entrar a la sesion
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: 420,
        background: COLORS.ink,
        borderRadius: 10,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#E24B4A" }} />
          <span style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "white" }}>
            En vivo &middot; {mm}:{ss}
          </span>
        </div>
        <span style={{ fontFamily: FONT_SANS, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
          Sesion 1 a 1
        </span>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: COLORS.oliveLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <i className="ti ti-user" style={{ fontSize: 36, color: COLORS.oliveDeep }} aria-hidden="true" />
          </div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
            Esperando a tu coach...
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            width: 110,
            height: 78,
            borderRadius: 8,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {camOn ? (
            <span style={{ fontFamily: FONT_SANS, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Tu camara</span>
          ) : (
            <i className="ti ti-camera-off" style={{ fontSize: 18, color: "rgba(255,255,255,0.5)" }} aria-hidden="true" />
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 14, padding: "18px" }}>
        <button
          onClick={() => setMicOn((v) => !v)}
          aria-label={micOn ? "Apagar microfono" : "Encender microfono"}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "none",
            background: micOn ? "rgba(255,255,255,0.12)" : COLORS.terracotta,
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className={micOn ? "ti ti-microphone" : "ti ti-microphone-off"} style={{ fontSize: 18 }} aria-hidden="true" />
        </button>
        <button
          onClick={() => setCamOn((v) => !v)}
          aria-label={camOn ? "Apagar camara" : "Encender camara"}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "none",
            background: camOn ? "rgba(255,255,255,0.12)" : COLORS.terracotta,
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className={camOn ? "ti ti-camera" : "ti ti-camera-off"} style={{ fontSize: 18 }} aria-hidden="true" />
        </button>
        <button
          onClick={onEnd}
          aria-label="Salir de la sesion"
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "none",
            background: "#E24B4A",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className="ti ti-phone-off" style={{ fontSize: 18 }} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}


function ClientPortal() {
  const [client, setClient] = useState(null);
  const [habits, setHabits] = useState([]);
  const [message, setMessage] = useState("");
  const [sentMsg, setSentMsg] = useState(null);
  const [inCall, setInCall] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      setLoadError(null);

      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        setLoading(false);
        return;
      }

      const { data: clienteRow, error: clienteError } = await supabase
        .from("clientes")
        .select("*")
        .eq("user_id", sessionData.session.user.id)
        .maybeSingle();

      if (clienteError || !clienteRow) {
        setLoadError("No se encontro tu informacion de cliente.");
        setLoading(false);
        return;
      }

      const { data: habitosData } = await supabase
        .from("habitos")
        .select("id, etiqueta")
        .eq("cliente_id", clienteRow.id)
        .order("orden", { ascending: true });

      const habitosConRegistro = await Promise.all(
        (habitosData || []).map(async (h) => {
          const { data: registros } = await supabase
            .from("registro_habitos")
            .select("fecha, cumplido")
            .eq("habito_id", h.id)
            .order("fecha", { ascending: true })
            .limit(7);
          return {
            id: h.id,
            label: h.etiqueta,
            done: (registros || []).map((r) => r.cumplido),
          };
        })
      );

      const { data: pesoData } = await supabase
        .from("registro_peso")
        .select("peso_kg")
        .eq("cliente_id", clienteRow.id)
        .order("fecha", { ascending: true });

      setClient({
        id: clienteRow.id,
        name: clienteRow.nombre,
        weekNumber: clienteRow.semana_actual,
        totalWeeks: clienteRow.total_semanas,
        notes: clienteRow.notas || "Sin notas todavia.",
        weight: (pesoData || []).map((p) => Number(p.peso_kg)),
      });
      setHabits(habitosConRegistro);
      setLoading(false);
    };

    cargarDatos();
  }, []);

  const toggleToday = async (habitId) => {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return;
    const todayDone = !habit.done[habit.done.length - 1];
    const today = new Date().toISOString().slice(0, 10);

    setHabits((hs) =>
      hs.map((h) => {
        if (h.id !== habitId) return h;
        const next = [...h.done];
        next[next.length - 1] = todayDone;
        return { ...h, done: next };
      })
    );

    await supabase.from("registro_habitos").upsert(
      { habito_id: habitId, fecha: today, cumplido: todayDone },
      { onConflict: "habito_id,fecha" }
    );
  };

  const weekPct = useMemo(() => {
    const total = habits.reduce((a, h) => a + h.done.length, 0);
    const done = habits.reduce((a, h) => a + h.done.filter(Boolean).length, 0);
    return total ? Math.round((done / total) * 100) : 0;
  }, [habits]);

  const enviarMensaje = async () => {
    if (!message.trim() || !client) return;
    const { error } = await supabase.from("mensajes").insert({
      cliente_id: client.id,
      remitente: "cliente",
      contenido: message,
    });
    if (!error) {
      setSentMsg(message);
      setMessage("");
    }
  };

  if (loading) {
    return (
      <div style={{ background: COLORS.creamDeep, minHeight: "100%", padding: "60px 28px", textAlign: "center" }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 13.5, color: COLORS.inkSoft }}>Cargando tu portal...</div>
      </div>
    );
  }

  if (loadError || !client) {
    return (
      <div style={{ background: COLORS.creamDeep, minHeight: "100%", padding: "40px 28px" }}>
        <div
          style={{
            maxWidth: 420,
            margin: "0 auto",
            background: COLORS.terracottaLight,
            color: COLORS.terracottaDeep,
            fontFamily: FONT_SANS,
            fontSize: 13,
            padding: "16px 18px",
            borderRadius: 6,
          }}
        >
          {loadError || "No se pudo cargar tu informacion."}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.creamDeep, minHeight: "100%" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.inkSoft, marginBottom: 4 }}>
              Hola, {client.name.split(" ")[0]}
            </div>
            <h1 style={{ fontFamily: FONT_SERIF, fontSize: 28, color: COLORS.ink, margin: 0, fontWeight: 500 }}>
              Semana {client.weekNumber} de {client.totalWeeks}
            </h1>
          </div>
          <PageFolio n={client.weekNumber} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 28 }}>
          {[
            ["Racha actual", `${client.streak} dias`],
            ["Cumplimiento semana", `${weekPct}%`],
            ["Ultimo check-in", client.lastCheckin],
          ].map(([l, v]) => (
            <div key={l} style={{ background: "white", border: `1px solid ${COLORS.line}`, borderRadius: 6, padding: "14px 16px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 11.5, color: COLORS.inkSoft, marginBottom: 4 }}>{l}</div>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 19, color: COLORS.ink }}>{v}</div>
            </div>
          ))}
        </div>

        {inCall ? (
          <div style={{ marginBottom: 24 }}>
            <VideoCallRoom clientName={client.name} onEnd={() => setInCall(false)} />
          </div>
        ) : (
          <ScheduleCard onStart={() => setInCall(true)} />
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20, marginBottom: 24 }}>
          <div style={{ background: "white", border: `1px solid ${COLORS.line}`, borderRadius: 6, padding: 22 }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500, color: COLORS.ink, marginBottom: 16 }}>
              Habitos de esta semana
            </div>
            <HabitGrid habits={habits} />
            <div style={{ marginTop: 16, fontFamily: FONT_SANS, fontSize: 11.5, color: COLORS.inkSoft }}>
              Toca el ultimo dia para marcar hoy
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {habits.map((h) => (
                <button
                  key={h.id}
                  onClick={() => toggleToday(h.id)}
                  style={{ ...ghostBtn, padding: "7px 12px", fontSize: 12 }}
                >
                  Marcar hoy: {h.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: "white", border: `1px solid ${COLORS.line}`, borderRadius: 6, padding: 22 }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500, color: COLORS.ink, marginBottom: 16 }}>
              Tendencia de peso
            </div>
            <WeightChart values={client.weight} />
            <div style={{ fontFamily: FONT_SANS, fontSize: 11.5, color: COLORS.inkSoft, marginTop: 8 }}>
              {client.weight[0]} kg &rarr; {client.weight[client.weight.length - 1]} kg
            </div>
          </div>
        </div>

        <div style={{ background: "white", border: `1px solid ${COLORS.line}`, borderRadius: 6, padding: 22, marginBottom: 24 }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500, color: COLORS.ink, marginBottom: 10 }}>
            Nota de tu coach
          </div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 13.5, color: COLORS.inkSoft, lineHeight: 1.7, fontStyle: "italic" }}>
            "{client.notes}"
          </div>
        </div>

        <div style={{ background: "white", border: `1px solid ${COLORS.line}`, borderRadius: 6, padding: 22 }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500, color: COLORS.ink, marginBottom: 12 }}>
            Enviar un mensaje a tu coach
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Como te fue esta semana, alguna duda..."
            style={{ ...inputStyle, minHeight: 70, resize: "vertical", marginBottom: 10 }}
          />
          <button
            onClick={enviarMensaje}
            style={primaryBtn}
          >
            Enviar
          </button>
          {sentMsg && (
            <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 12, color: COLORS.olive }}>
              Mensaje enviado. Tu coach te respondera en menos de 24 horas.
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.reload();
            }}
            style={{ ...ghostBtn, fontSize: 12, padding: "8px 14px" }}
          >
            Cerrar sesion
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusDot({ status }) {
  const color = status === "on-track" ? COLORS.olive : COLORS.terracotta;
  return <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}

function WhatsAppFloat({ message }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: COLORS.olive,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 10px rgba(31,29,26,0.18)",
        zIndex: 40,
        textDecoration: "none",
      }}
    >
      <i className="ti ti-brand-whatsapp" style={{ fontSize: 26, color: COLORS.cream }} aria-hidden="true" />
    </a>
  );
}

function AdminPanel() {
  const [clientes, setClientes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [aplicaciones, setAplicaciones] = useState([]);
  const [loadingAplicaciones, setLoadingAplicaciones] = useState(true);

  const cargarAplicaciones = async () => {
    setLoadingAplicaciones(true);
    const { data } = await supabase.from("aplicaciones").select("*").eq("estado", "pendiente").order("created_at", { ascending: false });
    setAplicaciones(data || []);
    setLoadingAplicaciones(false);
  };

  const aceptarAplicacion = async (ap) => {
    const { error } = await supabase.from("clientes").insert({
      nombre: ap.nombre,
      email: ap.email,
      objetivo: ap.objetivo,
      estado: "on-track",
      semana_actual: 1,
      total_semanas: 12,
      notas: ""
    });
    if (!error) {
      await supabase.from("aplicaciones").update({ estado: "aceptada" }).eq("id", ap.id);
      cargarAplicaciones();
    }
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  useEffect(() => {
    const cargarClientes = async () => {
      setLoading(true);
      setLoadError(null);

      const { data: clientesData, error: clientesError } = await supabase
        .from("clientes")
        .select("*")
        .order("created_at", { ascending: false });

      if (clientesError) {
        setLoadError("No se pudieron cargar los clientes. Revisa tu conexion o permisos de admin.");
        setLoading(false);
        console.error(clientesError);
        return;
      }

      const clientesConDetalle = await Promise.all(
        (clientesData || []).map(async (c) => {
          const { data: habitosData } = await supabase
            .from("habitos")
            .select("id, etiqueta")
            .eq("cliente_id", c.id)
            .order("orden", { ascending: true });

          const habitosConRegistro = await Promise.all(
            (habitosData || []).map(async (h) => {
              const { data: registros } = await supabase
                .from("registro_habitos")
                .select("fecha, cumplido")
                .eq("habito_id", h.id)
                .order("fecha", { ascending: true })
                .limit(7);
              return {
                id: h.id,
                label: h.etiqueta,
                done: (registros || []).map((r) => r.cumplido),
              };
            })
          );

          const { data: pesoData } = await supabase
            .from("registro_peso")
            .select("peso_kg")
            .eq("cliente_id", c.id)
            .order("fecha", { ascending: true });

          return {
            id: c.id,
            name: c.nombre,
            goal: c.objetivo || "",
            weekNumber: c.semana_actual,
            totalWeeks: c.total_semanas,
            status: c.estado,
            streak: 0,
            notes: c.notas || "Sin notas todavia.",
            habits: habitosConRegistro,
            weight: (pesoData || []).map((p) => Number(p.peso_kg)),
          };
        })
      );

      setClientes(clientesConDetalle);
      if (clientesConDetalle.length > 0) setSelectedId(clientesConDetalle[0].id);
      setLoading(false);
    };

    cargarClientes();
    cargarAplicaciones();
  }, []);

  const selected = clientes.find((c) => c.id === selectedId);
  const onTrack = clientes.filter((c) => c.status === "on-track").length;
  const needsAttention = clientes.length - onTrack;

  if (loading) {
    return (
      <div style={{ background: COLORS.creamDeep, minHeight: "100%", padding: "40px 28px" }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 13.5, color: COLORS.inkSoft, textAlign: "center" }}>
          Cargando clientes...
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{ background: COLORS.creamDeep, minHeight: "100%", padding: "40px 28px" }}>
        <div
          style={{
            maxWidth: 480,
            margin: "0 auto",
            background: COLORS.terracottaLight,
            color: COLORS.terracottaDeep,
            fontFamily: FONT_SANS,
            fontSize: 13,
            padding: "16px 18px",
            borderRadius: 6,
          }}
        >
          {loadError}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.creamDeep, minHeight: "100%" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "40px 28px" }}>
        <h1 style={{ fontFamily: FONT_SERIF, fontSize: 28, color: COLORS.ink, marginBottom: 24, fontWeight: 500, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Tus clientes
          <button onClick={cerrarSesion} style={{ ...ghostBtn, fontSize: 12, padding: "8px 14px" }}>
            Cerrar sesion
          </button>
        </h1>

        {aplicaciones.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: 20, color: COLORS.ink, marginBottom: 16, fontWeight: 500 }}>Solicitudes pendientes ({aplicaciones.length})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {aplicaciones.map((ap) => (
                <div key={ap.id} style={{ background: "white", border: "1px solid #e0ddd8", borderRadius: 8, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: FONT_SERIF, fontSize: 16, color: COLORS.ink, marginBottom: 4 }}>{ap.nombre}</div>
                    <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.inkSoft }}>{ap.email} — {ap.objetivo}</div>
                  </div>
                  <button onClick={() => aceptarAplicacion(ap)} style={{ background: COLORS.olive, color: COLORS.cream, border: "none", borderRadius: 6, padding: "10px 20px", fontFamily: FONT_SANS, fontSize: 13, cursor: "pointer" }}>Aceptar cliente</button>
                </div>
              ))}
            </div>
          </div>
        )}
        {clientes.length === 0 ? (
          <div style={{ fontFamily: FONT_SANS, fontSize: 13.5, color: COLORS.inkSoft }}>
            Todavia no tienes clientes registrados. Cuando agregues uno en Supabase
            (tabla "clientes"), va a aparecer aqui automaticamente.
          </div>
        ) : (
          <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 28 }}>
          {[
            ["Clientes activos", clientes.length],
            ["En buen camino", onTrack],
            ["Necesitan atencion", needsAttention],
          ].map(([l, v]) => (
            <div key={l} style={{ background: "white", border: `1px solid ${COLORS.line}`, borderRadius: 6, padding: "14px 16px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 11.5, color: COLORS.inkSoft, marginBottom: 4 }}>{l}</div>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 22, color: COLORS.ink }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {clientes.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                style={{
                  textAlign: "left",
                  background: c.id === selectedId ? "white" : "transparent",
                  border: `1px solid ${c.id === selectedId ? COLORS.line : "transparent"}`,
                  borderRadius: 6,
                  padding: "12px 14px",
                  cursor: "pointer",
                  fontFamily: FONT_SANS,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <StatusDot status={c.status} />
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: COLORS.ink }}>{c.name}</span>
                </div>
                <div style={{ fontSize: 11.5, color: COLORS.inkSoft }}>
                  Semana {c.weekNumber} &middot; racha {c.streak}d
                </div>
              </button>
            ))}
          </div>

          {selected && (
            <div style={{ background: "white", border: `1px solid ${COLORS.line}`, borderRadius: 6, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 20, color: COLORS.ink, marginBottom: 4 }}>
                    {selected.name}
                  </div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: COLORS.inkSoft }}>{selected.goal}</div>
                </div>
                <Badge tone={selected.status === "on-track" ? "olive" : "terracotta"}>
                  {selected.status === "on-track" ? "En buen camino" : "Necesita atencion"}
                </Badge>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 12, fontWeight: 500, color: COLORS.ink, marginBottom: 10 }}>
                    Habitos
                  </div>
                  <HabitGrid habits={selected.habits} />
                </div>
                <div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 12, fontWeight: 500, color: COLORS.ink, marginBottom: 10 }}>
                    Peso
                  </div>
                  <WeightChart values={selected.weight} />
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${COLORS.line}`, paddingTop: 16 }}>
                <div style={{ fontFamily: FONT_SANS, fontSize: 12, fontWeight: 500, color: COLORS.ink, marginBottom: 8 }}>
                  Notas internas
                </div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.inkSoft, lineHeight: 1.6 }}>
                  {selected.notes}
                </div>
              </div>
              <div style={{ borderTop: "1px solid #e0ddd8", paddingTop: 16, marginTop: 16 }}>
                <div style={{ fontFamily: FONT_SANS, fontSize: 12, fontWeight: 500, color: COLORS.ink, marginBottom: 12 }}>Mensajes del cliente</div>
                <MensajesCoach clienteId={selected.id} />
              </div>
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
}

function CoachLogin({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authError) {
      setLoading(false);
      setError("Correo o contraseña incorrectos.");
      return;
    }

    const { data: adminRow } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    setLoading(false);

    if (!adminRow) {
      setError("Este usuario no tiene permisos de coach.");
      await supabase.auth.signOut();
      return;
    }

    onSuccess();
  };

  return (
    <Centered>
      <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: 360 }}>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: 26, color: COLORS.ink, marginBottom: 8, fontWeight: 500 }}>
          Acceso de coach
        </h2>
        <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.inkSoft, marginBottom: 24 }}>
          Solo para administradores de {BRAND_NAME}.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          <Field label="Correo">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              style={inputStyle}
              required
            />
          </Field>
          <Field label="Contraseña">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              required
            />
          </Field>
        </div>
        {error && (
          <div
            style={{
              background: COLORS.terracottaLight,
              color: COLORS.terracottaDeep,
              fontFamily: FONT_SANS,
              fontSize: 12.5,
              padding: "10px 14px",
              borderRadius: 4,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}
        <button type="submit" style={{ ...primaryBtn, width: "100%", opacity: loading ? 0.7 : 1 }} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </Centered>
  );
}

function ClientLogin({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authError) {
      setLoading(false);
      setError("Correo o contraseña incorrectos.");
      return;
    }

    const { data: clienteRow } = await supabase
      .from("clientes")
      .select("id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    setLoading(false);

    if (!clienteRow) {
      setError("Este usuario no esta registrado como cliente activo.");
      await supabase.auth.signOut();
      return;
    }

    onSuccess();
  };

  return (
    <Centered>
      <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: 360 }}>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: 26, color: COLORS.ink, marginBottom: 8, fontWeight: 500 }}>
          Tu portal
        </h2>
        <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.inkSoft, marginBottom: 24 }}>
          Entra con el correo y contraseña que tu coach te dio.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          <Field label="Correo">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              style={inputStyle}
              required
            />
          </Field>
          <Field label="Contraseña">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              required
            />
          </Field>
        </div>
        {error && (
          <div
            style={{
              background: COLORS.terracottaLight,
              color: COLORS.terracottaDeep,
              fontFamily: FONT_SANS,
              fontSize: 12.5,
              padding: "10px 14px",
              borderRadius: 4,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}
        <button type="submit" style={{ ...primaryBtn, width: "100%", opacity: loading ? 0.7 : 1 }} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </Centered>
  );
}

export default function App() {
  useFonts();
  const [view, setView] = useState("landing");
  const [coachAuthed, setCoachAuthed] = useState(false);
  const [clientAuthed, setClientAuthed] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        const { data: adminRow } = await supabase
          .from("admins")
          .select("user_id")
          .eq("user_id", data.session.user.id)
          .maybeSingle();
        if (adminRow) setCoachAuthed(true);

        const { data: clienteRow } = await supabase
          .from("clientes")
          .select("id")
          .eq("user_id", data.session.user.id)
          .maybeSingle();
        if (clienteRow) setClientAuthed(true);
      }
      setCheckingSession(false);
    };
    checkSession();
  }, []);

  return (
    <div style={{ fontFamily: FONT_SANS, minHeight: "100vh", background: COLORS.cream }}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tabler-icons/2.44.0/iconfont/tabler-icons.min.css"
      />
      <NavBar view={view} setView={setView} />
      {view === "landing" && <Landing setView={setView} />}
      {view === "apply" && <ApplyForm setView={setView} />}
      {view === "portal" && (
        checkingSession ? (
          <div style={{ padding: "60px 28px", textAlign: "center", fontFamily: FONT_SANS, color: COLORS.inkSoft }}>
            Verificando sesion...
          </div>
        ) : clientAuthed ? (
          <ClientPortal />
        ) : (
          <ClientLogin onSuccess={() => setClientAuthed(true)} />
        )
      )}
      {view === "admin" && (
        checkingSession ? (
          <div style={{ padding: "60px 28px", textAlign: "center", fontFamily: FONT_SANS, color: COLORS.inkSoft }}>
            Verificando sesion...
          </div>
        ) : coachAuthed ? (
          <AdminPanel />
        ) : (
          <CoachLogin onSuccess={() => setCoachAuthed(true)} />
        )
      )}
      <WhatsAppFloat message={`Hola ${BRAND_NAME}, quisiera mas informacion sobre el coaching de habitos.`} />
    </div>
  );
}
