with open('/Users/danielroldan/Downloads/my-lifestyle-app/src/App.jsx', 'r') as f:
    lines = f.readlines()

target = None
for i, line in enumerate(lines):
    if 'function AdminPanel()' in line:
        target = i
        break

component = []
component.append('function MensajesCoach({ clienteId }) {\n')
component.append('  const [mensajes, setMensajes] = React.useState([]);\n')
component.append('  const [respuesta, setRespuesta] = React.useState("");\n')
component.append('  const [enviando, setEnviando] = React.useState(false);\n')
component.append('  React.useEffect(() => {\n')
component.append('    const cargar = async () => {\n')
component.append('      const { data } = await supabase.from("mensajes").select("*").eq("cliente_id", clienteId).order("created_at", { ascending: true });\n')
component.append('      setMensajes(data || []);\n')
component.append('    };\n')
component.append('    cargar();\n')
component.append('  }, [clienteId]);\n')
component.append('  const enviar = async () => {\n')
component.append('    if (!respuesta.trim()) return;\n')
component.append('    setEnviando(true);\n')
component.append('    await supabase.from("mensajes").insert({ cliente_id: clienteId, remitente: "coach", contenido: respuesta });\n')
component.append('    setRespuesta("");\n')
component.append('    const { data } = await supabase.from("mensajes").select("*").eq("cliente_id", clienteId).order("created_at", { ascending: true });\n')
component.append('    setMensajes(data || []);\n')
component.append('    setEnviando(false);\n')
component.append('  };\n')
component.append('  if (mensajes.length === 0) return <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.inkSoft }}>Sin mensajes todavia.</div>;\n')
component.append('  return (\n')
component.append('    <div>\n')
component.append('      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>\n')
component.append('        {mensajes.map((m) => (\n')
component.append('          <div key={m.id} style={{ display: "flex", justifyContent: m.remitente === "coach" ? "flex-end" : "flex-start" }}>\n')
component.append('            <div style={{ background: m.remitente === "coach" ? COLORS.olive : "white", color: m.remitente === "coach" ? COLORS.cream : COLORS.ink, borderRadius: 8, padding: "8px 12px", maxWidth: "80%", fontFamily: FONT_SANS, fontSize: 13 }}>{m.contenido}</div>\n')
component.append('          </div>\n')
component.append('        ))}\n')
component.append('      </div>\n')
component.append('      <div style={{ display: "flex", gap: 8 }}>\n')
component.append('        <input value={respuesta} onChange={(e) => setRespuesta(e.target.value)} placeholder="Escribe tu respuesta..." style={{ flex: 1, padding: "8px 12px", borderRadius: 6, border: "1px solid #e0ddd8", fontFamily: FONT_SANS, fontSize: 13 }} />\n')
component.append('        <button onClick={enviar} disabled={enviando} style={{ background: COLORS.olive, color: COLORS.cream, border: "none", borderRadius: 6, padding: "8px 16px", fontFamily: FONT_SANS, fontSize: 13, cursor: "pointer" }}>Enviar</button>\n')
component.append('      </div>\n')
component.append('    </div>\n')
component.append('  );\n')
component.append('}\n')
component.append('\n')

if target:
    lines = lines[:target] + component + lines[target:]
    with open('/Users/danielroldan/Downloads/my-lifestyle-app/src/App.jsx', 'w') as f:
        f.writelines(lines)
    print("Listo!")
else:
    print("No encontrado")