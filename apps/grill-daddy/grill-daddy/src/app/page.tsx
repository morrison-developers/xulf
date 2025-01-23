'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const StyledLandingPage = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 40em;
  margin: 0 auto;
  .section {
    margin-bottom: 40px;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .collapsible {
    margin-bottom: 15px;
  }

  .collapsible-header {
    font-weight: bold;
    cursor: pointer;
    background: #f5f5f5;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .collapsible-content {
    margin-top: 10px;
    padding: 10px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-radius: 0 0 5px 5px;
  }

  .cta-button {
    display: block;
    margin: 20px auto;
    padding: 15px 30px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: #4caf50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
  }

  .cta-button:hover {
    background: #45a049;
  }
`;

const FAQSection = ({ title, items }: { title: string; items: { question: string; answer: string }[] }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="section">
      <h2>{title}</h2>
      {items.map((item, index) => (
        <div key={index} className="collapsible">
          <div
            className="collapsible-header"
            onClick={() => toggleFAQ(index)}
          >
            {item.question}
          </div>
          {expandedIndex === index && (
            <div className="collapsible-content">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function LandingPage() {
  const router = useRouter();

  const technicalFAQ = [
    {
      question: 'What technology stack is used in this project?',
      answer: `This project uses the latest version of Next.js with the App Router, React, TypeScript, and styled-components for styling. State management is handled using React Context and the useReducer hook. LocalStorage ensures state persistence.`,
    },
    {
      question: 'How are timers handled?',
      answer: `Timers are managed centrally within the GrillContext. Each item has a remainingTime property that updates every second using a setInterval. Timestamps are used to persist timer states across page reloads.`,
    },
    {
      question: 'What are some upcoming features?',
      answer: `
        - User authentication and profiles.
        - Integration with a backend to store grill session history.
        - Push notifications for timer alerts.
        - Support for multiple grills or sessions.
        - Enhanced UI animations and themes.
      `,
    },
  ];

  const userFAQ = [
    {
      question: 'What is this app?',
      answer: `This is a BBQ grill management app that helps you track your grilling process. Add items to the grill, set timers, and get notifications when it’s time to flip or remove your food.`,
    },
    {
      question: 'How does it work?',
      answer: `Enter the items you want to grill along with their thickness and desired doneness. The app calculates start times and timers for each phase of the cooking process.`,
    },
    {
      question: 'What happens if I refresh the page?',
      answer: `Your session is saved locally in your browser, so timers and grill items remain intact even if you close or refresh the page.`,
    },
  ];

  return (
    <StyledLandingPage>
      <h1>Welcome to Grillio</h1>

      <div className="section">
        <p>
          Grillio is your ultimate BBQ assistant, designed to make grilling
          easier and more enjoyable. Whether you're cooking burgers, steaks, or
          veggies, this app ensures everything is cooked perfectly every time.
          Developed with care using modern web technologies, Grillio is the
          ideal companion for both casual and serious grillers.
        </p>
      </div>

      <FAQSection title="User FAQ" items={userFAQ} />
      <FAQSection title="Technical FAQ" items={technicalFAQ} />

      <button
        className="cta-button"
        onClick={() => router.push('/dashboard')}
      >
        Setup Your Grill
      </button>
    </StyledLandingPage>
  );
}