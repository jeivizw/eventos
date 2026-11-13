import React, { useState } from 'react';
import './App.css';

// Banco de dados simulado de eventos e participantes
const INITIAL_EVENTS = [
  {
    id: 1,
    name: 'Festival de Inverno 2026',
    total: 500,
    checkedIn: 142,
    attendees: [
      { id: 'TCK-001', name: 'Ana Silva', checked: true },
      { id: 'TCK-002', name: 'Bruno Costa', checked: false },
      { id: 'TCK-003', name: 'Carlos Mendes', checked: false },
      { id: 'TCK-004', name: 'Diana Rocha', checked: true },
    ]
  },
  {
    id: 2,
    name: 'Conferência Tech 2026',
    total: 300,
    checkedIn: 210,
    attendees: [
      { id: 'TCK-101', name: 'Eduardo Lima', checked: true },
      { id: 'TCK-102', name: 'Fernanda Alves', checked: false },
      { id: 'TCK-103', name: 'Gabriel Souza', checked: true },
    ]
  },
  {
    id: 3,
    name: 'Workshop Design',
    total: 50,
    checkedIn: 12,
    attendees: [
      { id: 'TCK-201', name: 'Helena Martins', checked: false },
      { id: 'TCK-202', name: 'Igor Santos', checked: false },
    ]
  }
];

function App() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [selectedEventId, setSelectedEventId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastScanMessage, setLastScanMessage] = useState('');

  // Encontra o evento selecionado atualmente
  const currentEvent = events.find(ev => ev.id === selectedEventId);
  const pendingCount = currentEvent.total - currentEvent.checkedIn;
  const progressPercentage = Math.round((currentEvent.checkedIn / currentEvent.total) * 100);

  // Função para simular leitura de QR Code
  const handleScanQR = () => {
    if (currentEvent.checkedIn >= currentEvent.total) {
      setLastScanMessage('⚠️ Capacidade máxima atingida!');
      return;
    }

    const randomCode = `TCK-${Math.floor(100 + Math.random() * 900)}`;
    
    setEvents(events.map(ev => {
      if (ev.id === selectedEventId) {
        return { ...ev, checkedIn: ev.checkedIn + 1 };
      }
      return ev;
    }));

    setLastScanMessage(`✓ Check-in confirmado: Ingresso ${randomCode}`);
    setTimeout(() => setLastScanMessage(''), 4000);
  };

  // Função para alternar check-in manual na busca
  const toggleAttendeeCheckIn = (attendeeId) => {
    setEvents(events.map(ev => {
      if (ev.id === selectedEventId) {
        let delta = 0;
        const updatedAttendees = ev.attendees.map(att => {
          if (att.id === attendeeId) {
            delta = att.checked ? -1 : 1;
            return { ...att, checked: !att.checked };
          }
          return att;
        });
        return {
          ...ev,
          checkedIn: ev.checkedIn + delta,
          attendees: updatedAttendees
        };
      }
      return ev;
    }));
  };

  // Filtra participantes conforme o que foi digitado na busca
  const filteredAttendees = currentEvent.attendees.filter(att =>
    att.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    att.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container extreme-minimalist">
      
      {/* HEADER */}
      <header className="header">
        <h1>EventCraft</h1>
        <p className="subtitle">Real-time Control</p>
      </header>

      <main className="main-content">
        
        {/* SELETOR DE EVENTOS FUNCIONAL */}
        <section className="control-section event-selector">
          <h2>Selecione o Evento</h2>
          <div className="event-list-card">
            {events.map((ev) => (
              <button
                key={ev.id}
                className={`event-item ${ev.id === selectedEventId ? 'active' : ''}`}
                onClick={() => {
                  setSelectedEventId(ev.id);
                  setSearchTerm('');
                  setLastScanMessage('');
                }}
              >
                <span>{ev.name}</span>
                {ev.id === selectedEventId && <span className="status-dot red"></span>}
              </button>
            ))}
          </div>
        </section>

        {/* BOTÃO DE SCANNER FUNCIONAL */}
        <div>
          <button className="main-action-button scan-qr" onClick={handleScanQR}>
            <span>SCAN TICKET QR</span>
          </button>
          {lastScanMessage && (
            <p className="scan-feedback">{lastScanMessage}</p>
          )}
        </div>

        {/* BUSCA DE PARTICIPANTES FUNCIONAL */}
        <section className="control-section attendee-search">
          <input 
            type="text" 
            placeholder="Buscar Participante (Nome ou TCK)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="minimal-input"
          />
          
          {searchTerm && (
            <div className="search-results">
              {filteredAttendees.length > 0 ? (
                filteredAttendees.map(att => (
                  <div 
                    key={att.id} 
                    className="attendee-row"
                    onClick={() => toggleAttendeeCheckIn(att.id)}
                  >
                    <div>
                      <strong>{att.name}</strong>
                      <span className="attendee-id">{att.id}</span>
                    </div>
                    <span className={`badge ${att.checked ? 'checked' : 'pending'}`}>
                      {att.checked ? 'DENTRO' : 'CHECK-IN'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-results">Nenhum ingresso encontrado.</p>
              )}
            </div>
          )}
        </section>

        {/* DASHBOARD DE PROGRESSO DINÂMICO */}
        <section className="control-section dashboard-preview">
          <div className="dashboard-card stats-detailed">
            <h2>Progresso Check-in</h2>
            <div className="stats-grid">
              <div className="stat-block completed">
                <span className="label">CONCLUÍDO</span>
                <span className="value red">{currentEvent.checkedIn}</span>
              </div>
              <div className="stat-block pending">
                <span className="label">PENDENTE</span>
                <span className="value">{pendingCount}</span>
              </div>
              <div className="stat-block total">
                <span className="label">TOTAL</span>
                <span className="value">{currentEvent.total}</span>
              </div>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill red" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </section>

      </main>

      <footer className="footer">
        <p>Precise. Real-time. Control.</p>
      </footer>
    </div>
  );
}

export default App;