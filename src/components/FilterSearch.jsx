// components/FilterSearch.js
import React from 'react';
import '../styles/FilterSearch.css';


export default function FilterSearch({ filter, setFilter, search, setSearch }) {
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
    </div>
  );
}
