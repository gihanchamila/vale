"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Stars,
  BookOpen,
  Image as ImageIcon,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { VALENTINE_DATA } from "@/data/content";
import { fireConfetti } from "@/components/Confetti";
import FloatingHearts from "@/components/FloatingHearts";

export default function ValentinePage() {
  const [step, setStep] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const extraQuestions = [
    "First, do you realize that being this pretty is actually illegal in 12 countries? 🚔",
    "Are you ready to spend another 365 days deciding what we should eat for dinner? 🍕",
    "Do you promise not to get mad when I say 'I'm not hungry' and then eat half your fries? 🍟",
    "If we were in a zombie apocalypse, you'd let me hide behind you, right? 🧟‍♂️",
    "On a scale of 1 to 10, how lucky are you to have a boyfriend who built you an entire app? (Choose 11) 💻",
    "Okay, enough jokes... are you ready for the real question now? 🥺",
  ];

  const handleNextQuestion = () => {
    if (questionIndex < extraQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setStep(2); // Move to the big Valentine question
    }
  };

  const handleNoHover = () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 300 - 150;
    setNoButtonPos({ x, y });
    setNoCount(noCount + 1);
  };

  const handleYes = () => {
    fireConfetti();
    setStep(3);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-rose-50 px-4">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {/* STEP 0: INTRO */}
        {step === 0 && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="w-20 h-20 text-pink-500 fill-pink-500 mx-auto mb-6" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {VALENTINE_DATA.introTitle}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {VALENTINE_DATA.introMessage}
            </p>
            <button
              onClick={() => setStep(1)}
              className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition-colors"
            >
              Click to Open ✨
            </button>
          </motion.div>
        )}

        {/* STEP 1: EXTRA CUTE QUESTIONS */}
        {step === 1 && (
          <motion.div
            key="extra"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 max-w-md ">
              {extraQuestions[questionIndex]}
            </h2>
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 mx-auto bg-pink-500 text-white px-6 py-2 rounded-full font-bold hover:bg-pink-600 transition-all"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* STEP 2: THE BIG VALENTINE QUESTION */}
        {step === 2 && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center flex flex-col items-center"
          >
            <h2 className="text-4xl font-bold text-pink-600 mb-6">
              {VALENTINE_DATA.question}
            </h2>
            <div className="flex gap-4 items-center relative">
              <button
                onClick={handleYes}
                className="bg-pink-500 text-white px-6 py-2 rounded-full font-bold  hover:scale-110 transition-transform"
              >
                Yes!
              </button>
              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={handleNoHover}
                className="bg-white text-gray-400 px-6 py-2 rounded-full border border-gray-200"
              >
                {
                  VALENTINE_DATA.noTexts[
                    Math.min(noCount, VALENTINE_DATA.noTexts.length - 1)
                  ]
                }
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 3 && (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-md"
          >
            <Stars className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl font-black text-pink-600 mb-8">
              {VALENTINE_DATA.yesResponse}
            </h1>

            <button
              onClick={() => {
                setStep(0);
                setQuestionIndex(0);
                setNoCount(0);
              }}
              className="mt-8 text-gray-400 text-sm flex items-center justify-center gap-2 mx-auto"
            >
              <RotateCcw size={14} /> Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
