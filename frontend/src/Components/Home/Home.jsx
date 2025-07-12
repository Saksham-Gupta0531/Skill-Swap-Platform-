import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import Filter from '../filter/Filter.jsx'
import Card from '../RequestCard/Cards.jsx'
import './Home.css'

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsData, setCardsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cardsPerPage = 5;

  const sampleCardsData = [
    {
      id: 1, name: "Joe Wills", profilePhoto: "Profile Photo",
      skillsOffered: ["Java Script", "Python"],
      skillsWanted: ["ReactJS", "Graphic Designer"],
      rating: "4.0/5"
    },
    {
      id: 2, name: "Alice Johnson", profilePhoto: "Profile Photo",
      skillsOffered: ["React", "Node.js"],
      skillsWanted: ["MongoDB", "AWS"],
      rating: "4.5/5"
    },
    {
      id: 3, name: "Bob Smith", profilePhoto: "Profile Photo",
      skillsOffered: ["UI/UX Design", "Figma"],
      skillsWanted: ["React", "TypeScript"],
      rating: "4.2/5"
    },
    {
      id: 4, name: "Carol Davis", profilePhoto: "Profile Photo",
      skillsOffered: ["Python", "Machine Learning"],
      skillsWanted: ["Deep Learning", "TensorFlow"],
      rating: "4.8/5"
    },
    {
      id: 5, name: "David Wilson", profilePhoto: "Profile Photo",
      skillsOffered: ["Java", "Spring Boot"],
      skillsWanted: ["Microservices", "Docker"],
      rating: "4.3/5"
    },
    {
      id: 6, name: "Eva Brown", profilePhoto: "Profile Photo",
      skillsOffered: ["Vue.js", "CSS"],
      skillsWanted: ["Angular", "SASS"],
      rating: "4.1/5"
    },
    {
      id: 7, name: "Frank Miller", profilePhoto: "Profile Photo",
      skillsOffered: ["PHP", "Laravel"],
      skillsWanted: ["React", "API Design"],
      rating: "4.4/5"
    },
    {
      id: 8, name: "Grace Lee", profilePhoto: "Profile Photo",
      skillsOffered: ["Flutter", "Dart"],
      skillsWanted: ["iOS Development", "Swift"],
      rating: "4.6/5"
    },
    {
      id: 9, name: "Henry Taylor", profilePhoto: "Profile Photo",
      skillsOffered: ["C++", "Algorithm Design"],
      skillsWanted: ["Rust", "Go"],
      rating: "4.7/5"
    },
    {
      id: 10, name: "Ivy Chen", profilePhoto: "Profile Photo",
      skillsOffered: ["Data Science", "R"],
      skillsWanted: ["Python", "Tableau"],
      rating: "4.9/5"
    }
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        setCardsData(sampleCardsData);
        setFilteredData(sampleCardsData);
      } catch (err) {
        setError("Failed to load cards.");
      }
      setLoading(false);
    }, 500);
  }, []);

  const handleFilterChange = (searchTerm) => {
    const lower = searchTerm.toLowerCase();
    const filtered = cardsData.filter(card =>
      card.skillsWanted.some(skill => skill.toLowerCase().includes(lower)) ||
      card.skillsOffered.some(skill => skill.toLowerCase().includes(lower)) ||
      card.name.toLowerCase().includes(lower)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = filteredData.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        end = Math.min(totalPages, 5);
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(1, totalPages - 4);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className='HomeMaindiv'>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="Homefilter">
        <Filter onChange={handleFilterChange} />
      </div>
      <div className='RequestCards'>
        <div className="cardsContainer">
          {error ? (
            <div className="errorState">{error}</div>
          ) : loading ? (
            <div className="loadingState">Loading cards...</div>
          ) : currentCards.length > 0 ? (
            currentCards.map(card => (
              <Card key={card.id} userData={card} />
            ))
          ) : (
            <div className="emptyState">No cards found</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="paginationSection">
            <button
              className="paginationArrow"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {getPageNumbers().map(pageNumber => (
              <button
                key={pageNumber}
                className={`paginationButton ${currentPage === pageNumber ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              className="paginationArrow"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
