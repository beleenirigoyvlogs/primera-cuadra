import React from 'react';
import { RUBROS } from '../data/nicheData';

export default function NicheSwitcher({ currentNiche, onSelectNiche }) {
  const rubrosList = Object.values(RUBROS);

  return (
    <div className="segmented-pill-bar-container">
      <div className="segmented-pill-bar" role="tablist">
        {rubrosList.map((rubro) => {
          const isActive = currentNiche === rubro.id;
          return (
            <button
              key={rubro.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`pill-tab-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectNiche(rubro.id)}
            >
              <span>{rubro.badge.split(' ')[0]}</span>
              <span>{rubro.rubroName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
