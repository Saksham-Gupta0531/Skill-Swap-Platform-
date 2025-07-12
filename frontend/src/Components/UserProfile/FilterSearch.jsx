// components/FilterSearch.js
import React from 'react';
import './FilterSearch.css';

export default function FilterSearch({ filter, setFilter, search, setSearch, skillSearch, setSkillSearch }) {
  return (
    <div className="filter-search">
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
      </select>

      <input 
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <input 
        type="text"
        placeholder="Search by skill"
        value={skillSearch}
        onChange={e => setSkillSearch(e.target.value)}
      />
    </div>
  );
}
