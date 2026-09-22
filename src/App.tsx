import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { GameStage } from './types';
import { StageCinematic } from './components/StageCinematic';
import { StageClueboard } from './components/StageClueboard';
import { StageCamcorder } from './components/StageCamcorder';

export function App() {
  const [stage, setStage] = useState<GameStage>('STAGE_CINEMATIC');

  const goToCinematic = () => {
    setStage('STAGE_CINEMATIC');
  };

  const goToClueboard = () => {
    setStage('STAGE_CLUEBOARD');
  };

  const goToCamcorder = () => {
    setStage('STAGE_CAMCORDER');
  };

  const returnToClueboard = () => {
    setStage('STAGE_CLUEBOARD');
  };

  const restartGame = () => {
    setStage('STAGE_CINEMATIC');
  };

  return (
    <main className="w-screen h-screen overflow-hidden select-none bg-black text-stark font-mono relative">
      <AnimatePresence mode="wait">

        {stage === 'STAGE_CINEMATIC' && (
          <motion.div
            key="cinematic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <StageCinematic onComplete={goToClueboard} />
          </motion.div>
        )}

        {stage === 'STAGE_CLUEBOARD' && (
          <motion.div
            key="clueboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <StageClueboard onRestart={restartGame} onOpenArchive={goToCamcorder} />
          </motion.div>
        )}

        {stage === 'STAGE_CAMCORDER' && (
          <motion.div
            key="camcorder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <StageCamcorder onReturn={returnToClueboard} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
