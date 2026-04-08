import { useLoaderData } from 'react-router';
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { CollectionBanner } from '~/components/CollectionBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import NewsletterForm from '~/components/Footer';
import '../styles/our-story.css';
import { Link } from "react-router";

import 'swiper/css';
import 'swiper/css/navigation';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Careers at Cullen | Diamond Hydrozen' },
    {
      name: 'description',
      content: 'Explore career opportunities at Cullen Jewellery. Join our passionate team dedicated to crafting timeless elegance and exceptional service.'
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  return {
    bannerData: BANNER_DATA,
    missionData: MISSION_DATA,
    lifeData: LIFE_DATA,
    progressData: PROGRESS_DATA,
    impactData: IMPACT_DATA,
    teamData: TEAM_DATA,
    benefitsData: BENEFITS_DATA,
    jobsData: JOBS_DATA,
    differenceData: DIFFERENCE_DATA,
    exploreData: EXPLORE_DATA,
  };
}

export default function Careers() {
  const data = useLoaderData();
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef(null);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  // Team section scroll logic
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Benefits section state
  const [activeBenefit, setActiveBenefit] = useState(null);

  // Sticky nav state
  const [activeSection, setActiveSection] = useState('life');
  const [showStickyNav, setShowStickyNav] = useState(false);

  // Jobs section state
  const [jobFilters, setJobFilters] = useState({
    keyword: '',
    location: '',
    department: ''
  });
  const jobsScrollContainerRef = useRef(null);
  const [showJobsLeftArrow, setShowJobsLeftArrow] = useState(false);
  const [showJobsRightArrow, setShowJobsRightArrow] = useState(true);

  const uniqueLocations = [...new Set(data.jobsData.map(job => job.location))];
  const uniqueDepartments = [...new Set(data.jobsData.map(job => job.department))];

  const filteredJobs = data.jobsData.filter(job => {
    const matchKeyword = job.title.toLowerCase().includes(jobFilters.keyword.toLowerCase());
    const matchLocation = jobFilters.location === '' || job.location === jobFilters.location;
    const matchDepartment = jobFilters.department === '' || job.department === jobFilters.department;
    return matchKeyword && matchLocation && matchDepartment;
  });

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleJobsScroll = () => {
    if (jobsScrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = jobsScrollContainerRef.current;
      setShowJobsLeftArrow(scrollLeft > 10);
      setShowJobsRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Approximate card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollJobs = (direction) => {
    if (jobsScrollContainerRef.current) {
      const scrollAmount = 320; // Card width + gap
      jobsScrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // Initial check for arrows with a slight delay to ensure DOM is ready
    const checkArrows = () => {
      handleScroll();
      handleJobsScroll();
    };

    // Check immediately
    checkArrows();

    // Check again after a short delay to ensure content is loaded
    const timeoutId = setTimeout(checkArrows, 100);

    window.addEventListener('resize', handleScroll);
    window.addEventListener('resize', handleJobsScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('resize', handleJobsScroll);
    };
  }, [data.teamData, data.jobsData]); // Re-run when data changes

  useEffect(() => {
    setMounted(true);

    // Sticky nav scroll handler
    const handleStickyScroll = () => {
      const scrollPosition = window.scrollY;
      setShowStickyNav(scrollPosition > 600);

      // Update active section based on scroll position
      const sections = ['life', 'benefits', 'jobs'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleStickyScroll);
    return () => window.removeEventListener('scroll', handleStickyScroll);
  }, []);

  // Values for the slider
  const values = [
    {
      title: 'Shine Together',
      description: [
        'We work together to bring our best. Everyone shares their skills, experiences, and ideas – and a great team makes use of all of them. When we bring our best, even a simple conversation is enough to spark an idea, and build a bridge over a complex problem.',
        'Teamwork extends beyond our employees. We’re on the same team as our clients too. It’s all about lifting each other up.'
      ]
    },
    {
      title: 'Act With Integrity',
      description: [
        'We do the right thing, even when no one is watching. Honesty, transparency, and ethical behavior are at the core of everything we do.',
        'We hold ourselves and each other accountable to the highest standards.'
      ]
    },
    {
      title: 'Pursue Progress',
      description: [
        'We embrace change and strive for continuous improvement. Every day is an opportunity to learn, grow, and innovate.',
        'We celebrate curiosity and encourage bold ideas.'
      ]
    },
    {
      title: 'Care Deeply',
      description: [
        'We genuinely care about our people, our clients, and our community. We listen, support, and uplift one another.',
        'Empathy and kindness guide our actions.'
      ]
    },
    {
      title: 'Own The Outcome',
      description: [
        'We take responsibility for our work and its impact. We follow through on our commitments and learn from our results.',
        'Success is a team effort, and we celebrate it together.'
      ]
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="careers-page">
      {/* Sticky Navigation */}
      {showStickyNav && (
        <div className="careers-sticky-nav">
          <div className="sticky-nav-container">
            <button
              className={`sticky-nav-btn ${activeSection === 'life' ? 'active' : ''}`}
              onClick={() => scrollToSection('life')}
            >
              LIFE AT CULLEN
            </button>
            <button
              className={`sticky-nav-btn ${activeSection === 'benefits' ? 'active' : ''}`}
              onClick={() => scrollToSection('benefits')}
            >
              BENEFITS
            </button>
            <button
              className={`sticky-nav-btn ${activeSection === 'jobs' ? 'active' : ''}`}
              onClick={() => scrollToSection('jobs')}
            >
              POSITIONS
            </button>
          </div>
        </div>
      )}
      {/* Banner Section */}
      <CollectionBanner collection={data.bannerData} />

      {/* Mission Statement Section */}
      <section className="career-mission">
        <div className="page-width">
          <h2 className="career-mission-title f-32 ff-n w-300 black-color">
            {data.missionData.title}<span className="ff-a f-32 black-color">{data.missionData.title_text_change}</span>
          </h2>
          <div className="career-mission-content">
            <div className="career-mission-left">
              <p className="career-mission-tagline f-15 f-m-18 ff-c w-300 black-color">
                {data.missionData.tagline}
              </p>
              <a href="#jobs" className="career-mission-btn desktop f-11 f-m-11 ff-n">
                OPEN POSITIONS
              </a>
            </div>
            <div className="career-mission-right">
              <p className="career-mission-text f-15 f-m-15 w-300 ff-c black-color">
                {data.missionData.description1}
              </p>

              <p className="career-mission-text f-15 f-m-15 w-300 ff-c black-color">
                {data.missionData.description2}
              </p>

              <a href="#jobs" className="career-mission-btn mobile f-11 f-m-11 ff-n">
                OPEN POSITIONS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Belong Section */}
      <section id="life" className="career-section belong-impact alt-bg">
        <div className="page-width">
          <div className='belong-impact-title'>
            <h2 className="career-section-main-heading f-32 ff-a w-300 black-color">Life at Cullen</h2>
          </div>
          <div className="career-section-inner two-col">
            <div className="career-section-image">
              <img src={data.lifeData.image} alt="Belong" />
            </div>
            <div className="career-section-text center-content">
              <h2 className="career-section-title title-border black-color f-26 l-h-1-1 ff-a w-300">{data.lifeData.title}</h2>
              <p className="career-section-desc black-color f-13 l-h-1-2 ff-c w-300">{data.lifeData.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="career-section progress-impact alt-bg">
        <div className="page-width">
          <div className="career-section-inner two-col reverse">
            <div className="career-section-text center-content">
              <h2 className="career-section-title title-border black-color f-26 l-h-1-1 ff-a w-300">{data.progressData.title}</h2>
              <p className="career-section-desc black-color f-13 l-h-1-2 ff-c w-300">{data.progressData.description1}</p>
              <p className="career-section-desc black-color f-13 l-h-1-2 ff-c w-300">{data.progressData.description2}</p>
            </div>
            <div className="career-section-image">
              <img src={data.progressData.image} alt="Progress" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="career-section careers-impact alt-bg">
        <div className="page-width">
          <div className="career-section-inner two-col">
            <div className="career-section-image">
              <img src={data.impactData.image} alt="Impact" />
            </div>
            <div className="career-section-text center-content">
              <h2 className="career-section-title title-border black-color f-26 l-h-1-1 ff-a w-300">{data.impactData.title}</h2>
              <p className="career-section-desc black-color f-13 l-h-1-2 ff-c w-300">{data.impactData.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Carousel Section */}
      <section className="careers-values-section alt-bg">
        <div className="page-width">
          <div className="careers-values-title">
            <h2 className="title-border f-32 ff-a w-300 black-color">Our Values</h2>
            <p className="careers-values-subtitle black-color f-13 l-h-1-2 ff-c w-300">
              Our five core values shape our culture and guide how we hire, develop, and recognise our team.
            </p>
          </div>
          <div className="careers-values-wrapper">
            <button
              ref={setPrevEl}
              className="carousel-arrow careers-carousel-prev"
              type="button"
              aria-label="Previous value"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="careers-values-carousel-container">
              <Swiper
                modules={[Navigation]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                navigation={{
                  prevEl: prevEl,
                  nextEl: nextEl,
                }}
                loop={false}
                speed={600}
                watchOverflow
                observer
                observeParents
                slidesPerView={1}
                spaceBetween={30}
                centeredSlides={true}
                className="careers-values-carousel"
              >
                {values.map((value, index) => (
                  <SwiperSlide key={value.title} className="careers-value-slide">
                    <div className="careers-values-card">
                      <span className="careers-values-card-text green-color f-80 f-m-24 l-h-1-2 ff-a w-300"><em>{value.title}</em></span>
                    </div>
                    <div className="careers-values-description black-color f-13 l-h-1-2 ff-c w-300">
                      {value.description.map((desc, i) => (
                        <p key={i}>{desc}</p>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <button
              ref={setNextEl}
              className="carousel-arrow careers-carousel-next"
              type="button"
              aria-label="Next value"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="careers-team-section alt-bg">
        <div className="careers-team-header">
          <h2 className="careers-team-title title-border f-32 ff-a w-300 black-color">Our Team</h2>
          <p className="careers-team-subtitle black-color f-13 l-h-1-2 ff-c w-300">
            Hear from our team and their experience with Cullen.
          </p>
        </div>

        <div className="careers-team-carousel-wrapper">
          <div className="careers-team-carousel-container">
            {showLeftArrow && (
              <button
                className="team-carousel-arrow team-carousel-prev"
                aria-label="Previous team member"
                onClick={() => scroll('left')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {showRightArrow && (
              <button
                className="team-carousel-arrow team-carousel-next"
                aria-label="Next team member"
                onClick={() => scroll('right')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            <div
              className="careers-team-scroll-area"
              ref={scrollContainerRef}
              onScroll={handleScroll}
            >
              {data.teamData.map((member, index) => (
                <div key={index} className="careers-team-card-wrapper">
                  <div className="careers-team-card">
                    <h3 className="careers-team-name black-color f-20 l-h-1-2 ff-a w-300">{member.name}</h3>
                    <h4 className="careers-team-role black-color f-10 l-h-1 ff-n w-400">{member.role}</h4>
                    <p className="careers-team-desc black-color f-13 l-h-1-2 ff-c w-300">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="careers-benefits-section alt-bg">
        <div className="page-width">
          <h2 className="careers-benefits-title f-32 ff-a w-300 black-color">{data.benefitsData.title}</h2>
          <div className="careers-benefits-content">
            <div className="careers-benefits-accordion">
              {data.benefitsData.items.map((item, index) => (
                <div key={index} className={`benefits-item ${activeBenefit === index ? 'active' : ''}`}>
                  <button
                    className="benefits-header black-color f-10 ff-n w-300"
                    onClick={() => setActiveBenefit(activeBenefit === index ? null : index)}
                    aria-expanded={activeBenefit === index}
                  >
                    <span className="benefits-icon">
                      {activeBenefit === index ? (
                        <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.117 8.467h12.7" className="stroke" style={{ fill: 'none', fillOpacity: 1, strokeWidth: 1.05831, stroke: 'rgb(0, 0, 0)', strokeOpacity: 1, strokeDasharray: 'none', strokeLinecap: 'round' }}></path>
                        </svg>
                      ) : (
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: activeBenefit === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    {item.title}
                  </button>
                  <div
                    className="benefits-body black-color f-13 l-h-1-2 ff-c w-300"
                    style={{
                      maxHeight: activeBenefit === index ? '200px' : '0',
                      opacity: activeBenefit === index ? 1 : 0
                    }}
                  >
                    <p>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="careers-benefits-image">
              <img src={data.benefitsData.image} alt="Our Benefits" />
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="careers-jobs-section" id="jobs">
        <h2 className="careers-jobs-title f-32 ff-a w-300 white-color">Open Positions</h2>

        <div className="careers-jobs-filter">
          <div className="filter-group">
            <label htmlFor="filter-keyword" className="white-color f-13 l-h-1-2 ff-c w-300">What:</label>
            <input
              type="text"
              id="filter-keyword"
              placeholder="Enter Keywords"
              className="black-color f-13 l-h-1-2 ff-c w-300"
              value={jobFilters.keyword}
              onChange={(e) => setJobFilters({ ...jobFilters, keyword: e.target.value })}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="filter-location" className="white-color f-13 l-h-1-2 ff-c w-300">Where:</label>
            <div className="select-wrapper black-color">
              <select
                id="filter-location"
                className="black-color f-13 l-h-1-2 ff-c w-300"
                value={jobFilters.location}
                onChange={(e) => setJobFilters({ ...jobFilters, location: e.target.value })}
              >
                <option value="">Select Location</option>
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="filter-group">
            <label htmlFor="filter-department" className="white-color f-13 l-h-1-2 ff-c w-300">Team:</label>
            <div className="select-wrapper black-color">
              <select
                id="filter-department"
                className="black-color f-13 l-h-1-2 ff-c w-300"
                value={jobFilters.department}
                onChange={(e) => setJobFilters({ ...jobFilters, department: e.target.value })}
              >
                <option value="">Select Department</option>
                {uniqueDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="careers-jobs-list-wrapper">
          {showJobsLeftArrow && (
            <button
              className="jobs-carousel-arrow jobs-carousel-prev"
              aria-label="Previous job"
              onClick={() => scrollJobs('left')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {showJobsRightArrow && (
            <button
              className="jobs-carousel-arrow jobs-carousel-next"
              aria-label="Next job"
              onClick={() => scrollJobs('right')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <div className="careers-jobs-list-container" ref={jobsScrollContainerRef} onScroll={handleJobsScroll}>
            <div className="careers-jobs-list">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <div key={index} className="careers-job-card">
                    <div className="job-card-content">
                      <h3 className="job-title black-color f-20 l-h-1-2 ff-a w-300">{job.title}</h3>
                      <p className="job-department black-color f-10 l-h-1-2 ff-n w-400">{job.department}</p>
                      <p className="job-location black-color f-13 l-h-1-2 ff-c w-300">{job.location}</p>
                    </div>
                    <Link to={job.link} className="job-link green-color f-13 l-h-1-2 ff-c w-300">
                      Read More
                      <svg
                        viewBox="0 0 16.933 16.933"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.408 3.175H5.292a2.112 2.112 0 0 0-2.117 2.117v6.35c0 1.172.944 2.116 2.117 2.116h6.35a2.112 2.112 0 0 0 2.116-2.117V9.525"
                          className="stroke"
                          style={{
                            fill: "none",
                            fillOpacity: 1,
                            stroke: "var(--primary_color)",
                            strokeWidth: 1.58747,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                            stopColor: "rgb(0, 0, 0)",
                          }}
                        />

                        <path
                          d="m8.466 8.466 6.35-6.35"
                          className="stroke"
                          style={{
                            fill: "none",
                            stroke: "var(--primary_color)",
                            strokeWidth: 1.58747,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeOpacity: 1,
                            strokeDasharray: "none",
                          }}
                        />

                        <path
                          d="M10.583 2.117h4.233V6.35"
                          className="stroke"
                          style={{
                            fill: "none",
                            stroke: "var(--primary_color)",
                            strokeWidth: 1.58747,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                          }}
                        />
                      </svg>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="no-jobs-found">
                  <p>No positions found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Difference Section */}
      <section className="careers-difference-section alt-bg">
        <div className="page-width">
          <div className="careers-difference-header">
            <h2 className="careers-difference-title">{data.differenceData.title}</h2>
            <div className="careers-title-line"></div>
            <p className="careers-difference-subtitle">{data.differenceData.subtitle}</p>
          </div>
          <div className="careers-difference-video-wrapper">
            <div className="video-container">
              <iframe
                src={data.differenceData.videoUrl}
                title="Our Difference Video"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="careers-explore-section">
        <div className="page-width">
          <div className="careers-explore-grid">
            {data.exploreData.map((item, index) => (
              <a href={item.link} key={index} className="careers-explore-card">
                <div className="explore-card-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="explore-card-overlay">
                  <h3 className="explore-card-title">{item.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="newsletter-touch">
        <div className="two-parts-form">
          <div className="shop-by-style-header">
            <h2>Stay in Touch</h2>
            <p>The latest on rings, diamonds, and more straight to your inbox.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>
      {/* Footer UVPs */}
      <UvpIconFooter data={OUR_STORY_UVPS} />
    </div>
  );
}

// ============================================
// DATA CONFIGURATIONS
// ============================================

const BANNER_DATA = {
  handle: 'careers',
  title: null,
  description: null,
  image: null,
};

const MISSION_DATA = {
  title: "AT CULLEN, WE'RE DEFINED BY ",
  title_text_change: "YOU.",
  tagline: "OUR TEAM MAKES US WHO WE ARE",
  description1: "Cullen began with a mission to bring transparency and innovation to the jewellery world by delivering accessible, ethical and premium fine jewellery to people everywhere.",
  description2: "Today our impact has grown, but the mission is the same. We're building an environment where exceptional people can do their best work, be heard, and help carry this mission even further.",
};

const LIFE_DATA = {
  image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/career_belong.jpg?v=1769064432',
  title: 'Belong',
  description: "We put above and beyond care at the heart of everything—fostering a culture where people feel valued, supported, and connected. By prioritising others and ensuring equal access to opportunity, we create a sense of shared purpose and authentic community.",
};

const PROGRESS_DATA = {
  image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/career_progress.jpg?v=1769064600',
  title: 'Progress',
  description1: "It's a culture of continuous improvement, innovation, and forward momentum. We back bold ideas and support individual growth at every level. Progress here means constant innovation, agile and adaptive thinking, and a drive to lead the way.",
  description2: "We're not here to keep up—we're here to drive what's next through boundary-pushing ideas.",
};

const IMPACT_DATA = {
  image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/career_impact.jpg?v=1769064600',
  title: 'Impact',
  description: "We think about the way we leave our mark on the world. This means taking responsibility by creating opportunities for positive change that uplift our community and planet. We aim to make a difference in both every day interactions and on a global scale through our intentional restorative initiatives.",
};

const TEAM_DATA = [
  {
    name: "Samuel,",
    role: "TRAINING AND DEVELOPMENT MANAGER",
    description: "I’ve been with Cullen for 14 months, starting in market research before transitioning to the People & Culture team. My day to day generally looks like writing learning material, delivering training sessions and strategising for the future. Through mentorship from colleagues and managers, along with internal and external leadership training, the professional development opportunities have been extensive. Cullen offers exciting growth avenues for those who are enthusiastic, hard-working, and want to be a part of a culture that is purpose-driven."
  },
  {
    name: "Liana,",
    role: "TECHNOLOGY PROJECT MANAGER",
    description: "Cullen Jewellery is truly an amazing place to work. The strong, positive culture is led from the top and shines through in everything we do. It’s incredibly inspiring to be part of a team that genuinely lives its values, supports one another, and is united by a shared purpose. I feel proud to be part of such a passionate and values-driven organisation."
  },
  {
    name: "Tom,",
    role: "HEAD OF NATIONAL RETAIL",
    description: "Cullen is an incredible place to work! The business is rapidly growing which means everyday is full of excitement, challenge, and opportunity. I have been here for one year and it has been the best year of my career yet - my role has changed from the head office into more of a retail setting which was an opportunity that has aligned with my interests and skills. I get to work alongside other people with the same mindset, which makes coming to work rewarding and fun."
  },
  {
    name: "De Wett,",
    role: "JEWELLER",
    description: "After working in the UK for 20 years, it was a big leap to move across the world to join Cullen, but the company’s support during that transition made it a lot easier than I ever anticipated. From the very start, I felt welcomed and comfortable in my new surroundings, which was incredibly appreciated."
  },
  {
    name: "Kate,",
    role: "ASSISTANT SHOWROOM MANAGER",
    description: "Taking the leap and moving to a new company was not something I took lightly. I was apprehensive before starting, worrying if I had made the right call. But my mind was put at ease from the get go! On my first day I was welcomed by friendly and inviting people. I feel very lucky that I get to do a job that I truly love and enjoy. No day is the same at Cullen, with change and new ideas always encouraged. I am grateful that I get to work alongside such inspiring people."
  },
  {
    name: "Sherry,",
    role: "CUSTOM DESIGN SPECIALIST",
    description: "Working at Cullen Jewellery has been a great experience! From being part of an amazing team of people that I genuinely enjoy working (and laughing) with, to advancing in my role within the Company, utilising the skills I have learned to move into a more specialised area that I have a great passion for!"
  }
];

const BENEFITS_DATA = {
  title: "Our Benefits",
  image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/our_benefit_image.jpg?v=1769148910", // Using existing image as placeholder
  items: [
    {
      title: "PROFESSIONAL DEVELOPMENT",
      content: "We are committed to your growth. We offer various training programs, workshops, and opportunities to attend conferences to help you advance your career."
    },
    {
      title: "TEAM DISCOUNTS",
      content: "Enjoy exclusive discounts on our premium jewellery collections. We love seeing our team wearing what they create and sell."
    },
    {
      title: "EMPLOYEE ASSISTANCE PROGRAM",
      content: "Your well-being matters. Our EAP provides confidential support services for personal and work-related issues to ensure you feel your best."
    },
    {
      title: "VOLUNTEER LEAVE",
      content: "We support your passion for giving back. Take paid time off to volunteer for causes that are important to you and our community."
    },
    {
      title: "CHILD SPONSORSHIP",
      content: "We believe in a bright future for everyone. Through our sponsorship programs, we help support children in need around the world."
    },
    {
      title: "INTERNATIONAL GROWTH",
      content: "As a global brand, we offer opportunities for international travel and work assignments, broadening your horizons and experience."
    }
  ]
};

const JOBS_DATA = [
  {
    title: "Graphic Designer - UX/UI",
    department: "Content",
    location: "Kew, Australia",
    link: "#"
  },
  {
    title: "Senior Copywriter",
    department: "Content",
    location: "Kew, Australia",
    link: "#"
  },
  {
    title: "Social Media Graduate",
    department: "Brand & Marketing",
    location: "Kew, Australia",
    link: "#"
  },
  {
    title: "Youtube Content Creator",
    department: "Brand & Marketing",
    location: "Kew, Australia",
    link: "#"
  },
  {
    title: "Learning & Development Coordinator",
    department: "People & Culture",
    location: "Kew, Australia",
    link: "#"
  },
  {
    title: "Jewellery Consultant",
    department: "Retail",
    location: "Melbourne, Australia",
    link: "#"
  },
  {
    title: "Production Assistant",
    department: "Production",
    location: "Kew, Australia",
    link: "#"
  }
];

const DIFFERENCE_DATA = {
  title: "Our Difference",
  subtitle: "The Cullen Difference is...",
  videoUrl: "https://www.youtube.com/embed/VoMA8JNEOtQ?si=RmpOxMP44-_i16AS"
};

const EXPLORE_DATA = [
  {
    title: "SUSTAINABILITY",
    image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/image_1.jpg?v=1769430528",
    link: "/pages/sustainability"
  },
  {
    title: "SHOWROOMS",
    image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/image_2.jpg?v=1769430528",
    link: "/pages/showrooms"
  },
  {
    title: "OUR STORY",
    image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/image_3.jpg?v=1769430528",
    link: "/pages/our-story"
  },
  {
    title: "OUR IMPACT",
    image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/image_4.jpg?v=1769430527",
    link: "/pages/impact"
  }
];
const OUR_STORY_UVPS = [
  {
    link: '/shipping',
    label: 'Worldwide<br>Express Shipping',
    svg: `
      <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16.75H2v-1.5h10v1.5Zm13.074 8.417c-.332.37-.807.583-1.304.583H8.196a1.752 1.752 0 0 1-1.74-1.942l.448-4.058H4v-1.5h4.578l-.63 5.723a.248.248 0 0 0 .248.277H23.77a.247.247 0 0 0 .186-.083.247.247 0 0 0 .062-.194l-1.47-13.223H9.454l-.312 2.827-1.492-.165.46-4.162h3.641v-.92c0-2.344 1.907-4.25 4.25-4.25s4.25 1.906 4.25 4.25v.92h3.642l1.617 14.557Z" fill="#6b6b6b"/>
      </svg>
    `,
  },
  {
    link: '/free-resizing',
    label: 'Free<br>Resizing',
    svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M24.289 18.18c0 5.122-4.167 9.289-9.289 9.289s-9.289-4.167-9.289-9.29a9.286 9.286 0 0 1 5.615-8.533l.593 1.376a7.788 7.788 0 0 0-4.708 7.158c0 4.295 3.495 7.789 7.789 7.789s7.789-3.494 7.789-7.79c0-4.294-3.495-7.788-7.789-7.788-.259 0-.518.018-.768.044l-.367.037-4.585-4.84 2.495-3.382h6.45l2.492 3.377-2.55 2.733-1.097-1.024 1.7-1.82-1.302-1.766h-4.936l-1.3 1.761 3.22 3.4c.181-.013.364-.02.548-.02 5.122 0 9.289 4.167 9.289 9.289ZM11.75 18h-1.5v4.75H15v-1.5h-2.19l5.44-5.44V18h1.5v-4.75H15v1.5h2.19l-5.44 5.44V18Z" fill="#fff"></path></svg>`,
  },
  {
    link: '/warranty',
    label: 'Lifetime Ring<br>Warranty',
    svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 2.587 4.25 8.793v7.362a8.774 8.774 0 0 0 4.375 7.577L15 27.413l6.375-3.68a8.774 8.774 0 0 0 4.375-7.578V8.793L15 2.587Zm9.25 13.568a7.271 7.271 0 0 1-3.625 6.279L15 25.68l-5.625-3.247a7.271 7.271 0 0 1-3.625-6.28V9.66L15 4.32l9.25 5.34v6.495Zm-11.733.268 3.906-3.906a3.516 3.516 0 0 1 4.967 0 3.516 3.516 0 0 1 0 4.966c-.685.685-1.584 1.027-2.484 1.027s-1.799-.342-2.483-1.027l-.572-.571 1.06-1.06.572.57a2.015 2.015 0 0 0 2.846 0 2.014 2.014 0 0 0 0-2.845 2.015 2.015 0 0 0-2.846 0l-3.906 3.906a3.516 3.516 0 0 1-4.967 0 3.516 3.516 0 0 1 0-4.966 3.516 3.516 0 0 1 4.967 0l.589.588-1.061 1.06-.588-.588a2.015 2.015 0 0 0-2.846 0 2.014 2.014 0 0 0 0 2.846 2.015 2.015 0 0 0 2.846 0Z" fill="#fff"></path></svg>`,
  },
  {
    link: '/engagement-rings?metal=yellow_gold',
    label: 'Free Ring<br>Customisation',
    svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="m28.42 9.978-4.77 4.769a4.152 4.152 0 0 1-2.331 1.166l-4.204.6-3.11 3.11-1.06-1.061 3.11-3.11.6-4.203a4.15 4.15 0 0 1 1.166-2.332l4.77-4.77 1.06 1.061-4.77 4.77a2.642 2.642 0 0 0-.741 1.483l-.494 3.46 3.46-.494a2.638 2.638 0 0 0 1.484-.741l4.769-4.769 1.06 1.06ZM8.07 21.118c-2.905 0-5.097-2.256-5.097-5.28 0-3.01 2.213-5.28 5.147-5.28 1.144 0 2.063.238 2.894.749.371.228.734.513 1.14.896l1.028-1.092A8.466 8.466 0 0 0 11.8 10.03c-1.077-.662-2.247-.97-3.68-.97-3.727 0-6.647 2.977-6.647 6.813 0 3.782 2.898 6.746 6.597 6.746 2.586 0 4.076-1.136 5.193-2.247l-1.057-1.063c-1.093 1.086-2.214 1.81-4.136 1.81Zm7.936-.38h4v-1.5h-4v1.5Zm-1.408 1.9 2.828 2.83 1.06-1.061-2.828-2.829-1.06 1.06Z" fill="#fff"></path></svg>`,
  },
];

/** @typedef {import('./+types/careers').Route} Route */
