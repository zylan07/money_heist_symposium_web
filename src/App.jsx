import React, { useState } from 'react';
import Navbar from './components/Navigation/Navbar';
import Hero from './components/Hero/Hero';
import RegistrationAlertStrip from './components/AlertStrip/RegistrationAlertStrip';
import EventCountdown from './components/Countdown/EventCountdown';
import Operation from './components/Operation/Operation';
import Missions from './components/Missions/Missions';
import MissionIntelVault from './components/MissionIntel/MissionIntelVault';
import PlanTimeline from './components/Plan/PlanTimeline';
import MissionAccess from './components/MissionAccess/MissionAccess';
import BaseLocation from './components/BaseLocation/BaseLocation';
import CommandChannel from './components/CommandChannel/CommandChannel';
import Partners from './components/Partners/Partners';
import Footer from './components/Footer/Footer';
import CinematicAtmosphere from './components/Atmosphere/CinematicAtmosphere';

export default function App() {
  const [activeMissionId, setActiveMissionId] = useState(null);

  const handleSelectMission = (missionId) => {
    setActiveMissionId(missionId);
  };

  const handleCloseVault = () => {
    setActiveMissionId(null);
  };

  return (
    <div className="bg-transparent text-[#e5e1e4] min-h-screen relative font-body-md overflow-x-hidden">
      {/* Persistent Global Heist Atmosphere & Dust System */}
      <CinematicAtmosphere />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Experience Stream */}
      <main className="w-full relative z-10">
        {/* HERO SECTION */}
        <Hero />

        {/* REGISTRATION CLOSING SOON — MOVING RIGHT → LEFT TICKER */}
        <RegistrationAlertStrip />

        {/* MISSION COUNTDOWN TO SYMPOSIUM LAUNCH */}
        <EventCountdown />

        {/* SECTION 01 — THE OPERATION */}
        <Operation />

        {/* SECTION 02 — MISSIONS */}
        <Missions
          onSelectMission={handleSelectMission}
          activeMissionId={activeMissionId}
        />

        {/* SECTION 03 — THE PLAN */}
        <PlanTimeline />

        {/* SECTION 04 — MISSION ACCESS */}
        <MissionAccess />

        {/* SECTION 05 — BASE LOCATION */}
        <BaseLocation />

        {/* SECTION 06 — COMMAND CHANNEL */}
        <CommandChannel />

        {/* SECTION 07 — PARTNERS & POWERED BY */}
        <Partners />
      </main>

      {/* CLOSING FRAME FOOTER */}
      <Footer />

      {/* SUBTERRANEAN 3D BRIEFING ROOM & VAULT OVERLAY */}
      {activeMissionId && (
        <MissionIntelVault
          missionId={activeMissionId}
          onClose={handleCloseVault}
        />
      )}
    </div>
  );
}
