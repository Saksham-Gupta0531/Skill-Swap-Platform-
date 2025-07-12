// pages/SwapRequests.jsx
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import SwapRequestCard from './SwapRequestCard';
import FilterSearch from './FilterSearch';
import Pagination from './Pagination';
import './SwapRequests.css';
import { dummyRequests } from '../utils/constants';

export default function SwapRequests() {
  const [requests, setRequests] = useState(dummyRequests);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [skillSearch, setSkillSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 4;

  const handleAccept = (id) => {
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'Accepted' } : r)
    );
  };

  const handleReject = (id) => {
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r)
    );
  };

  const filtered = requests
    .filter(r => !filter || r.status === filter)
    .filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) &&
      (
        skillSearch.trim() === '' ||
        r.skillsOffered.some(skill => skill.toLowerCase().includes(skillSearch.toLowerCase())) ||
        r.skillsWanted.some(skill => skill.toLowerCase().includes(skillSearch.toLowerCase()))
      )
    );

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <>
      <Navbar />
      <div className="container">
        <FilterSearch
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          skillSearch={skillSearch}
          setSkillSearch={setSkillSearch}
        />
        {paginated.map(request => (
          <SwapRequestCard
            key={request.id}
            request={request}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))}
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </>
  );
}
