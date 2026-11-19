/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from "react-router-dom";
import { ParticleBackground } from "./components/ParticleBackground";
import { Home } from "./pages/Home";
import { Success } from "./pages/Success";

export default function App() {
  return (
    <div className="relative min-h-screen font-sans bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-background flex flex-col">
      <ParticleBackground />
      <div className="fixed inset-0 pointer-events-none noise-bg mix-blend-overlay opacity-20 z-50"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}
