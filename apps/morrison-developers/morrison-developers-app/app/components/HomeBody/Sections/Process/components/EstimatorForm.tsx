'use client';

import { useState, useRef, useEffect } from 'react';
import { Timeline, timelineLabels } from '../index';
import { motion, AnimatePresence } from 'framer-motion';

type FeaturePillProps = {
  feature: string;
  projectFeatures: string[];
  setProjectFeatures: React.Dispatch<React.SetStateAction<string[]>>;
};

type ProjectType = 'portfolio' | 'ecommerce' | 'landing' | 'webapp' | 'internal';

const FeaturePill = ({ feature, projectFeatures, setProjectFeatures }: FeaturePillProps) => {
  const selected = projectFeatures.includes(feature);
  return (
    <button
      className={`pill ${selected ? 'active' : ''}`}
      onClick={() =>
        setProjectFeatures(prev =>
          selected ? prev.filter(f => f !== feature) : [...prev, feature]
        )
      }
    >
      {feature}
    </button>
  );
};

function Collapsible({
  id,
  label,
  isOpen,
  onToggle,
  children,
  showCount,
  highlight,
  className,
}: {
  id: string;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  showCount?: string | null;
  highlight?: boolean;
  className?: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
      setIsTransitioning(true);
    } else {
      setHeight(0);
      setIsTransitioning(true);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div className={`collapsible-container ${className || ''} ${isOpen ? 'open' : ''}`}>
      <button className="collapsible-trigger" onClick={onToggle} style={{ width: '100%' }}>
        <span className={`label ${highlight ? 'active-label' : ''}`}>{label}</span>
        {showCount && <span className="feature-count">{showCount}</span>}
        <span className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>
      <div
        ref={contentRef}
        className={`collapsible-content ${isOpen ? 'open' : ''}`}
        onTransitionEnd={handleTransitionEnd}
        // Animation logic for open/close transition
        style={{
          maxHeight: isOpen ? `${height}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          width: '100%',
          flexGrow: 1,
        }}
        // End animation logic
      >
        {children}
      </div>
    </div>
  );
}

export default function EstimatorForm({
  projectType,
  setProjectType,
  projectFeatures,
  setProjectFeatures,
  timeline,
  setTimeline,
  projectGoals,
  setProjectGoals,
}: {
  projectType: ProjectType;
  setProjectType: React.Dispatch<React.SetStateAction<ProjectType>>;
  projectFeatures: string[];
  setProjectFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  timeline: Timeline;
  setTimeline: React.Dispatch<React.SetStateAction<Timeline>>;
  projectGoals: string;
  setProjectGoals: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [activeMainSection, setActiveMainSection] = useState<string | null>(null);

  const sections = [
    {
      key: 'ux',
      label: 'UX & UI',
      features: [
        'Landing Page',
        'Blog',
        'Custom Animations',
        'Forms',
        'Interactive Elements',
        'Onboarding Flows',
      ],
    },
    {
      key: 'data',
      label: 'Admin & Data',
      features: [
        'Dashboard',
        'Admin Panel',
        'Analytics',
        'Custom Search',
        'Content Editing',
        'Data Exports',
      ],
    },
    {
      key: 'system',
      label: 'System Tools',
      features: [
        'Auth',
        'User Roles',
        'File Uploads',
        'Multi-language',
        'Performance Optimization',
        'Accessibility',
        'Dark Mode',
      ],
    },
    {
      key: 'commerce',
      label: 'Commerce',
      features: [
        'E-commerce',
        'Payments',
        'Subscriptions',
        'Booking System',
        'Coupon Codes',
        'Cart Abandonment Emails',
      ],
    },
    {
      key: 'integrations',
      label: 'Integrations',
      features: [
        'CMS',
        'API Integration',
        'SEO',
        'Design System',
        'CRM Integration',
        'Marketing Automation',
      ],
    },
    {
      key: 'support',
      label: 'Support',
      features: [
        'Bug Reporting',
        'User Feedback',
        'Live Chat Integration',
        'Testing Framework Setup',
      ],
    },
    {
      key: 'extras',
      label: 'Brand & Copy',
      features: [
        'Logo Design',
        'Brand Guide',
        'Pitch Deck',
        'Copywriting',
      ],
    },
  ];

  const currentIndex = timelineLabels.indexOf(timeline);

  const [selectedFeatureSectionKey, setSelectedFeatureSectionKey] = useState(sections[0].key);

  return (
    <div className="process-estimator">
      <h3>Timeline Estimator</h3>

      <Collapsible
        id="type"
        label="Project Type"
        isOpen={activeMainSection === 'type'}
        onToggle={() => setActiveMainSection(prev => (prev === 'type' ? null : 'type'))}
        className="estimator-section"
      >
        <div className="button-row pill-list">
          {[
            { value: 'portfolio', label: 'Portfolio Website' },
            { value: 'ecommerce', label: 'E-commerce Site' },
            { value: 'landing', label: 'Landing Page' },
            { value: 'webapp', label: 'Web App / Dashboard' },
            { value: 'internal', label: 'Internal Tool' },
          ].map(({ value, label }) => (
            <button
              key={value}
              className={`pill ${projectType === value ? 'active' : ''}`}
              onClick={() => setProjectType(value as ProjectType)}
            >
              {label}
            </button>
          ))}
        </div>
      </Collapsible>

      <Collapsible
        id="features"
        label="Project Features"
        isOpen={activeMainSection === 'features'}
        onToggle={() => setActiveMainSection(prev => (prev === 'features' ? null : 'features'))}
        className="estimator-section"
      >
        {activeMainSection === 'features' && (
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <select
              value={selectedFeatureSectionKey}
              onChange={(e) => setSelectedFeatureSectionKey(e.target.value)}
              style={{ marginBottom: '1rem' }}
            >
              {sections.map(section => (
                <option key={section.key} value={section.key}>
                  {section.label}
                </option>
              ))}
            </select>
            {sections
              .filter(section => section.key === selectedFeatureSectionKey)
              .map(section => (
                <div key={section.key} className="feature-page-section">
                  <fieldset className="project-features-list">
                    <div className="button-row pill-list">
                      {section.features.map((feature) => (
                        <FeaturePill
                          key={feature}
                          feature={feature}
                          projectFeatures={projectFeatures}
                          setProjectFeatures={setProjectFeatures}
                        />
                      ))}
                    </div>
                  </fieldset>
                </div>
              ))}
          </div>
        )}
      </Collapsible>

      <Collapsible
        id="timeline"
        label="Timeline"
        isOpen={activeMainSection === 'timeline'}
        onToggle={() => setActiveMainSection(prev => (prev === 'timeline' ? null : 'timeline'))}
        className="estimator-section"
      >
        <input
          type="range"
          className="slider"
          min={0}
          max={timelineLabels.length - 1}
          value={currentIndex}
          onChange={(e) => setTimeline(timelineLabels[Number(e.target.value)])}
          step={1}
        />
        <div className="timeline-labels">
          {timelineLabels.map((label) => (
            <span key={label} className="timeline-label">{label}</span>
          ))}
        </div>
      </Collapsible>
    </div>
  );
}
