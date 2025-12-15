import React, { useEffect, useMemo, useState } from "react";

/**
 * Landing boda (React + Tailwind) — sin menú, responsive.
 * Fotos: public/foto1.jpg ... public/foto5.jpg
 * Contador: 14 Mar 2026 12h30 Ecuador (UTC-5) => 17:30Z
 */

const COLORS = {
  bone: "#F6F1E9",
  clay: "#9f6d47", // Clay Dust
  walnut: "#623d20", // Walnut Brown
  ink: "#2b1d13",
};

const RSVP_URL = "#"; // TODO: pega aquí tu link (Google Form / WhatsApp)
const TRANSPORTE_URL = "#"; // TODO: pega aquí tu link de transporte
const MAPS_URL = "https://maps.app.goo.gl/5dtPZgpTsiLKbUWa9?g_st=ipc";

// 14 Marzo 2026 12h30 Ecuador (UTC-5) => 17:30Z
const WEDDING_UTC = new Date(Date.UTC(2026, 2, 14, 17, 30, 0));

function pad2(n) {
  return String(n).padStart(2, "0");
}

function useCountdown(targetUtcDate) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, []);

  return useMemo(() => {
    const diff = Math.max(0, targetUtcDate.getTime() - now);
    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, done: diff === 0 };
  }, [now, targetUtcDate]);
}

function DividerPampa({ className = "" }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <svg
        width="120"
        height="26"
        viewBox="0 0 120 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80"
      >
        <path
          d="M10 18C32 18 54 6 74 6C94 6 106 14 110 18"
          stroke={COLORS.clay}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M38 16C36 12 34 10 30 8"
          stroke={COLORS.clay}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M46 14C44 10 42 8 38 6"
          stroke={COLORS.clay}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M54 12C52 8 50 6 46 4"
          stroke={COLORS.clay}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M62 11C60 7 58 5 54 3"
          stroke={COLORS.clay}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Section({ children, className = "" }) {
  return <section className={`px-5 sm:px-8 ${className}`}>{children}</section>;
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-black/5 bg-white/70 shadow-sm backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

function TitleScript({ children, className = "" }) {
  return (
    <div
      className={`font-script text-[46px] leading-none sm:text-[56px] ${className}`}
      style={{ color: COLORS.clay }}
    >
      {children}
    </div>
  );
}

function TitleSerif({ children, className = "" }) {
  return (
    <h2
      className={`font-serif text-[28px] sm:text-[34px] tracking-wide ${className}`}
      style={{ color: COLORS.walnut }}
    >
      {children}
    </h2>
  );
}

function Body({ children, className = "" }) {
  return <p className={`font-serif text-[17px] leading-7 ${className}`}>{children}</p>;
}

function Img({ src, alt, className = "" }) {
  const [broken, setBroken] = useState(false);

  const placeholder =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
        <defs>
          <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
            <stop offset='0' stop-color='${COLORS.bone}'/>
            <stop offset='1' stop-color='${COLORS.clay}20'/>
          </linearGradient>
        </defs>
        <rect width='100%' height='100%' fill='url(#g)'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
          font-family='Georgia' font-size='42' fill='${COLORS.walnut}'>${alt}</text>
      </svg>
    `);

  return (
    <img
      src={broken ? placeholder : src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );
}

function Icon({ name, className = "" }) {
  const common = {
    fill: "none",
    stroke: COLORS.clay,
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    shoe: (
      <svg viewBox="0 0 48 48" className={className}>
        <path
          {...common}
          d="M8 31c6 0 10-3 14-8l6 4c4 3 8 5 12 5 2 0 4 1 4 4v2H6v-3c0-2 1-4 2-4z"
        />
        <path {...common} d="M22 23l-3-7" />
        <path {...common} d="M28 27l4-4" />
      </svg>
    ),
    time: (
      <svg viewBox="0 0 48 48" className={className}>
        <circle {...common} cx="24" cy="26" r="14" />
        <path {...common} d="M24 26l6-4" />
        <path {...common} d="M18 8h12" />
        <path {...common} d="M20 8l-2 4" />
        <path {...common} d="M28 8l2 4" />
      </svg>
    ),
    adults: (
      <svg viewBox="0 0 48 48" className={className}>
        <circle {...common} cx="18" cy="16" r="4" />
        <circle {...common} cx="30" cy="16" r="4" />
        <path {...common} d="M10 38v-6c0-4 3-7 7-7h2c4 0 7 3 7 7v6" />
        <path {...common} d="M22 38v-6c0-4 3-7 7-7h2c4 0 7 3 7 7v6" />
      </svg>
    ),
    taxi: (
      <svg viewBox="0 0 48 48" className={className}>
        <path {...common} d="M12 30l3-10c1-3 4-5 7-5h4c3 0 6 2 7 5l3 10" />
        <path {...common} d="M10 30h28" />
        <path {...common} d="M12 30v6" />
        <path {...common} d="M36 30v6" />
        <circle {...common} cx="16" cy="36" r="2" />
        <circle {...common} cx="32" cy="36" r="2" />
        <path {...common} d="M20 15v-3h8v3" />
      </svg>
    ),
    hanger: (
      <svg viewBox="0 0 48 48" className={className}>
        <path {...common} d="M24 12c0-2 1-4 3-4 2 0 3 1 3 3 0 2-2 3-4 4" />
        <path
          {...common}
          d="M12 28l12-8 12 8c2 1 1 4-1 4H13c-2 0-3-3-1-4z"
        />
        <path {...common} d="M18 32v6" />
        <path {...common} d="M30 32v6" />
      </svg>
    ),
  };

  return icons[name] ?? null;
}

function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_UTC);

  const items = [
    { label: "Días", value: days },
    { label: "Horas", value: pad2(hours) },
    { label: "Minutos", value: pad2(minutes) },
    { label: "Segundos", value: pad2(seconds) },
  ];

  return (
    <div className="mx-auto mt-6 grid max-w-[520px] grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((it) => (
        <Card key={it.label} className="px-4 py-4 text-center">
          <div className="font-serif text-[28px] sm:text-[30px]" style={{ color: COLORS.walnut }}>
            {it.value}
          </div>
          <div className="mt-1 text-[12px] tracking-widest" style={{ color: COLORS.clay }}>
            {it.label.toUpperCase()}
          </div>
        </Card>
      ))}
    </div>
  );
}

function Button({ href, onClick, children, className = "" }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 font-serif text-[15px] transition active:scale-[0.99]";
  const style = {
    background: "rgba(159,109,71,0.16)",
    border: `1px solid rgba(98,61,32,0.20)`,
    color: COLORS.walnut,
  };

  if (href) {
    return (
      <a
        href={href}
        target={href === "#" ? undefined : "_blank"}
        rel="noreferrer"
        className={`${base} hover:opacity-90 ${className}`}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${base} hover:opacity-90 ${className}`}
      style={style}
      type="button"
    >
      {children}
    </button>
  );
}

function RSVPBlock() {
  const [pases, setPases] = useState(2);
  const [nombre, setNombre] = useState("");
  const [msg, setMsg] = useState("");

  function confirm() {
    const n = nombre.trim() || "Invitado";
    setMsg(
      `Gracias por confirmar tu asistencia, ${n}. Tienes ${pases} pase${pases === 1 ? "" : "s"}. Úsalos sabiamente ✨`
    );
  }

  return (
    <Card className="mx-auto max-w-[720px] p-5 sm:p-7">
      <div className="text-center">
        <TitleSerif>Confirmar Asistencia</TitleSerif>
        <div className="mt-2 font-serif text-[15px]" style={{ color: COLORS.clay }}>
          Confirmar tu asistencia antes del <b>15 de Enero</b>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <label className="sm:col-span-2">
          <div className="mb-1 text-[12px] tracking-widest" style={{ color: COLORS.walnut }}>
            NOMBRE
          </div>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe tu nombre"
            className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 font-serif outline-none focus:ring-2"
          />
        </label>

        <label>
          <div className="mb-1 text-[12px] tracking-widest" style={{ color: COLORS.walnut }}>
            PASE
          </div>
          <select
            value={pases}
            onChange={(e) => setPases(Number(e.target.value))}
            className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 font-serif outline-none focus:ring-2"
          >
            <option value={1}>1 persona</option>
            <option value={2}>2 personas</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
        <Button onClick={confirm}>Confirmar</Button>
        <Button href={RSVP_URL}>Abrir link de confirmar</Button>
      </div>

      {msg ? (
        <div
          className="mx-auto mt-4 max-w-[620px] rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-center font-serif"
          style={{ color: COLORS.walnut }}
        >
          {msg}
        </div>
      ) : null}

      <div className="mt-5 text-center text-[12px]" style={{ color: COLORS.clay }}>
        (Si el link aún no está listo, el botón no abrirá nada.)
      </div>
    </Card>
  );
}

const BASE = import.meta.env.BASE_URL;
const withBase = (p) => `${BASE}${String(p).replace(/^\/+/, "")}`;



export default function App() {
  return (
    <div className="min-h-screen" style={{ background: COLORS.bone, color: COLORS.ink }}>
      {/* Fonts (Google Fonts) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Allura&display=swap');
        :root { color-scheme: light; }
        .font-serif { font-family: 'Cormorant Garamond', ui-serif, Georgia, serif; }
        .font-script { font-family: 'Allura', ui-serif, Georgia, serif; }
      `}</style>

      {/* HERO */}
      <div className="mx-auto max-w-[980px] px-4 pt-6 sm:pt-10">
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/40 shadow-sm">
          <Img src={withBase("foto1.jpg")} alt="foto1" className="h-[62vh] w-full object-cover sm:h-[72vh]" />
        </div>
      </div>

      <DividerPampa />

      {/* BLESSING + COUNTDOWN */}
      <Section>
        <div className="mx-auto max-w-[820px] text-center">
          <Body className="text-[18px]" style={{ color: COLORS.walnut }}>
            Con la bendición de Dios y de nuestros padres
          </Body>

          <div className="mt-3">
            <TitleScript>¡Nos Casamos!</TitleScript>
          </div>

          <div className="mt-3 font-serif text-[20px] tracking-wide" style={{ color: COLORS.walnut }}>
            14 Marzo del 2026
          </div>

          <Countdown />

          <div className="mx-auto mt-7 max-w-[720px]">
            <Body className="text-[18px]" style={{ color: COLORS.walnut }}>
              “Así que ya no son dos, sino uno solo. Por los tanto, lo que Dios ha unido, que no lo
              separe el hombre.” <b>Mateo 19:6</b>
            </Body>
          </div>
        </div>
      </Section>

      <DividerPampa />

      {/* FOTO2 */}
      <div className="mx-auto max-w-[980px] px-4">
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/40 shadow-sm">
          <Img src={withBase("foto2.jpg")} alt="foto2" className="h-[52vh] w-full object-cover sm:h-[60vh]" />
        </div>
      </div>

      <DividerPampa />

      {/* FOTO3 */}
      <div className="mx-auto max-w-[980px] px-4">
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/40 shadow-sm">
          <Img src={withBase("foto3.jpg")} alt="foto3" className="h-[52vh] w-full object-cover sm:h-[60vh]" />
       </div>
      </div>

      {/* CEREMONIA */}
      <Section className="py-10">
        <div className="mx-auto max-w-[820px] text-center">
          <DividerPampa className="py-2" />
          <TitleSerif>Ceremonia y Recepción</TitleSerif>
          <div className="mt-2 font-serif text-[22px]" style={{ color: COLORS.clay }}>
            Villa Fiorenza
          </div>

          <div className="mx-auto mt-4 max-w-[760px]">
            <Body style={{ color: COLORS.walnut }}>
              <b>Dirección:</b> San Felipe y Manuel Burbano Puembo, Pichincha, Ecuador
            </Body>
          </div>

          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={MAPS_URL}>Ubicación</Button>
          </div>

          <div className="mx-auto mt-6 grid max-w-[520px] gap-3 sm:grid-cols-2">
            <Card className="px-5 py-4 text-center">
              <div className="text-[12px] tracking-widest" style={{ color: COLORS.clay }}>
                HORA
              </div>
              <div className="mt-1 font-serif text-[24px]" style={{ color: COLORS.walnut }}>
                12h30
              </div>
            </Card>
            <Card className="px-5 py-4 text-center">
              <div className="text-[12px] tracking-widest" style={{ color: COLORS.clay }}>
                RECEPCIÓN
              </div>
              <div className="mt-1 font-serif text-[24px]" style={{ color: COLORS.walnut }}>
                15h00
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <DividerPampa />

      {/* RSVP */}
      <Section className="pb-10">
        <RSVPBlock />
      </Section>

      {/* TIPS */}
      <Section className="py-10">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center">
            <TitleSerif>TIPS QUE DEBES TOMAR EN CUENTA</TitleSerif>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Card className="p-5 sm:p-6">
              <div className="flex gap-4">
                <Icon name="shoe" className="h-12 w-12" />
                <div>
                  <div className="font-serif text-[18px]" style={{ color: COLORS.walnut }}>
                    Zapatos
                  </div>
                  <div className="mt-1 font-serif text-[16px]" style={{ color: COLORS.ink }}>
                    Que tus zapatos no impidan un gran baile, lleva tus zapatos cómodos
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <div className="flex gap-4">
                <Icon name="time" className="h-12 w-12" />
                <div>
                  <div className="font-serif text-[18px]" style={{ color: COLORS.walnut }}>
                    Puntualidad
                  </div>
                  <div className="mt-1 font-serif text-[16px]" style={{ color: COLORS.ink }}>
                    Procura llegar a tiempo para que no te pierdas ningún detalle
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <div className="flex gap-4">
                <Icon name="adults" className="h-12 w-12" />
                <div>
                  <div className="font-serif text-[18px]" style={{ color: COLORS.walnut }}>
                    Solo adultos
                  </div>
                  <div className="mt-1 font-serif text-[16px]" style={{ color: COLORS.ink }}>
                    Amamos a los niños pero esta vez la fiesta es solo para adultos
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <div className="flex gap-4">
                <Icon name="taxi" className="h-12 w-12" />
                <div>
                  <div className="font-serif text-[18px]" style={{ color: COLORS.walnut }}>
                    Transporte
                  </div>
                  <div className="mt-1 font-serif text-[16px]" style={{ color: COLORS.ink }}>
                    Si deseas transporte seguro, mira las opciones que te recomendamos
                  </div>
                  <div className="mt-3">
                    <Button href={TRANSPORTE_URL}>Transporte</Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 sm:p-6 sm:col-span-2">
              <div className="flex gap-4">
                <Icon name="hanger" className="h-12 w-12" />
                <div className="flex-1">
                  <div className="font-serif text-[18px]" style={{ color: COLORS.walnut }}>
                    Dress Code
                  </div>
                  <div className="mt-1 font-serif text-[16px]" style={{ color: COLORS.ink }}>
                    <b>¡Que la elegancia predomine!</b> Recuerda que la vestimenta es formal.
                    <div className="mt-2">
                      Nos reservamos los colores <b>café</b> y <b>blanco</b> exclusivo para novios
                      y la corte.
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div
                      className="h-6 w-6 rounded-full border border-black/10"
                      style={{ background: COLORS.walnut }}
                      title="Walnut Brown"
                    />
                    <div
                      className="h-6 w-6 rounded-full border border-black/10"
                      style={{ background: "#ffffff" }}
                      title="White"
                    />
                    <div className="ml-2 font-serif text-[14px]" style={{ color: COLORS.clay }}>
                      (reservados)
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <DividerPampa />

      {/* FOTO4 */}
      <div className="mx-auto max-w-[980px] px-4">
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/40 shadow-sm">
          <Img src={withBase("foto4.jpg")} alt="foto4" className="h-[52vh] w-full object-cover sm:h-[60vh]" />
        </div>
      </div>

      <Section className="py-10">
        <RSVPBlock />
      </Section>

      <DividerPampa />

      {/* OBSEQUIO */}
      <Section className="py-10">
        <div className="mx-auto max-w-[920px]">
          <div className="text-center">
            <TitleSerif>OBSEQUIO</TitleSerif>
            <div className="mx-auto mt-3 max-w-[760px]">
              <Body style={{ color: COLORS.walnut }}>
                Si deseas darnos un detalle puedes hacerlo dentro de un sobre que se receptara en la
                recepción o mediante transferencia
              </Body>
              <div className="mt-4 font-serif text-[22px]" style={{ color: COLORS.clay }}>
                Andy &amp; Dany
              </div>
              <div className="mt-1 font-serif" style={{ color: COLORS.walnut }}>
                Agradecemos tu gentileza
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card className="p-5 sm:p-6">
              <div className="font-serif text-[18px]" style={{ color: COLORS.walnut }}>
                Banco Pichincha
              </div>
              <div className="mt-3 space-y-1 font-serif text-[16px]" style={{ color: COLORS.ink }}>
                <div>
                  <b>Andy Josue Minchala Leon</b>
                </div>
                <div>Cuenta ahorros</div>
                <div>CI: 0106766116</div>
                <div>Número: 2213379443</div>
                <div>Correo: danysu09@gmail.com</div>
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <div className="font-serif text-[18px]" style={{ color: COLORS.walnut }}>
                Cooperativa Jep
              </div>
              <div className="mt-3 space-y-1 font-serif text-[16px]" style={{ color: COLORS.ink }}>
                <div>
                  <b>Andy Josue Minchala Leon</b>
                </div>
                <div>Cuenta ahorros</div>
                <div>CI: 0106766116</div>
                <div>Número: 406013409303</div>
                <div>Correo: danysu09@gmail.com</div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <DividerPampa />

      {/* FOTO5 */}
      <div className="mx-auto max-w-[980px] px-4 pb-14">
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/40 shadow-sm">
          <Img src={withBase("foto5.jpg")} alt="foto5" className="h-[52vh] w-full object-cover sm:h-[60vh]" />
        </div>

        <div className="mt-8 text-center font-serif text-[14px]" style={{ color: COLORS.clay }}>
          Hecho con cariño. ✦
        </div>
      </div>
    </div>
  );
}
