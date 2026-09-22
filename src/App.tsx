import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { GameStage } from './types';
import { StageCinematic } from './components/StageCinematic';
import { StageClueboard } from './components/StageClueboard';
import { StageCamcorder } from './components/StageCamcorder';
import { StageFileRoom } from './components/StageFileRoom';

export function App() {
  const [stage, setStage] = useState<GameStage>('STAGE_CINEMATIC');

  const goToClueboard = () => {
    setStage('STAGE_CLUEBOARD');
  };

  const goToCamcorder = () => {
    setStage('STAGE_CAMCORDER');
  };

  const goToFileRoom = () => {
    setStage('STAGE_FILEROOM');
  };

  const returnToClueboard = () => {
    setStage('STAGE_CLUEBOARD');
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
            <StageClueboard onOpenArchive={goToCamcorder} onOpenFileRoom={goToFileRoom} />
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

        {stage === 'STAGE_FILEROOM' && (
          <motion.div
            key="fileroom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <StageFileRoom onReturn={returnToClueboard} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
