// pages/SwapRequests.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SwapRequestCard from '../components/SwapRequestCard';
import FilterSearch from '../components/FilterSearch';
import Pagination from '../components/Pagination';
import '../styles/SwapRequests.css';

import { dummyRequests } from '../utils/constants';

export default function SwapRequests() {
  const [requests, setRequests] = useState(dummyRequests);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
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
    .filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <>
      <Navbar />
      <div className="container">
        <FilterSearch filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />
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
