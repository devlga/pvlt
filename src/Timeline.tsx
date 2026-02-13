// @ts-expect-error "fff"
import React, { useState, useEffect, useRef, useMemo } from "react";
const {BASE_URL} = import.meta.env; 

// --- Configuration ---
const SIDE_PADDING = 400; // Increased padding for "breathing room" on sides
const END_PADDING = 400;  // Extra padding on the right to clear fixed elements
const ITEM_WIDTH = 400; // Slightly wider cards
const GAP = 80; // Wider gap
const ITEM_COUNT = 25; // Reduced count for cleaner demo, but scalable
const SCROLL_HEIGHT_MULTIPLIER = 8; // Higher multiplier = Slower horizontal scroll

// --- Helper: Generate Data ---

const TIMELINE_DATA = [
  {
    date: "Jan. 2025",
    title: "Just Met",
    description:
      "They started their journey - just talking and getting to know each other.",
    src: BASE_URL + `/timeline1.jpg`,
  },
  {
    date: "Feb. 2025",
    title: "Started Courting",
    description:
      "He convinced her to open your heart for him.",
    src: BASE_URL + `/timeline2.jpg`,
  },
    {
    date: "Feb. 2025",
    title: "Started OJT",
    description:
      "She started the last part of her journey in college.",
    src: BASE_URL + `/timeline3.jpg`,
  },
  {
    date: "Mar. 2025",
    title: "Officially Dating",
    description:
      "They officially became a power couple.",
    src: BASE_URL + `/timeline4.jpg`,
  },
  {
    date: "Apr. 2025",
    title: "First Monthsary",
    description:
      "They officially spend a month together.",
    src: BASE_URL + `/timeline5.jpg`,
  },
    {
    date: "May 2025",
    title: "Her Brother Graduated",
    description:
      "Her brother graduated college - they were both proud.",
    src: BASE_URL + `/timeline6.jpg`,
  },
    {
    date: "Jul. 2025",
    title: "Kate Graduated",
    description:
      "His proudest moment was her holding that certificate in her hand.",
    src: BASE_URL + `/timeline7.jpg`,
  },
    {
    date: "Aug. 2025",
    title: "Justin's Birthday",
    description:
      "She surprised him with a cake and a birthday hat - this was his second happiest moment.",
    src: BASE_URL + `/timeline8.jpg`,
  },
      {
    date: "Aug. 2025",
    title: "First Flight to Manila",
    description:
      "His first flight ever was to see her, he remained strong although he flew alone.",
    src: BASE_URL + `/timeline9.jpg`,
  },
    {
    date: "Sep. 2025",
    title: "Meet In Person",
    description:
      "They met in Manila and explored the city together.",
    src: BASE_URL + `/timeline10.jpg`,
  },
      {
    date: "Sep. 2025",
    title: "SM Mall of Asia",
    description:
      "She brought him to a giant mall for the first time.",
    src: BASE_URL + `/timeline11.jpg`,
  },
        {
    date: "Sep. 2025",
    title: "Intramuros Trip",
    description:
      "They explored history together and he got to hold her hand for the entire time.",
    src: BASE_URL + `/timeline12.jpg`,
  },
          {
    date: "Sep. 2025",
    title: "Flight to Cauayan",
    description:
      "They fly together toward her home.",
    src: BASE_URL + `/timeline13.jpg`,
  },
          {
    date: "Sep. 2025",
    title: "First Time in Isabela",
    description:
      "He got to see the province for the first time. He met your family and lots of new friends.",
    src: BASE_URL + `/timeline14.jpg`,
  },
          {
    date: "Sep. 2025",
    title: "Kate's Birthday",
    description:
      "They got to celebrate another year of her life -- but this time together.",
    src: BASE_URL + `/timeline15.jpg`,
  },
          {
    date: "Sep. 2025",
    title: "Roadtrip to Baguio",
    description:
      "He got to experience how clingy you are while riding.",
    src: BASE_URL + `/timeline16.jpg`,
  },
          {
    date: "Sep. 2025",
    title: "Made It to Baguio",
    description:
      "They made it to Baguio and got to experience its beauty together.",
    src: BASE_URL + `/timeline17.jpg`,
  },
          {
    date: "Sep. 2025",
    title: "Justin Goes Back Home",
    description:
      "Justin goes back home. It was a sad goodbye for them both.",
    src: BASE_URL + `/timeline18.jpg`,
  },
    {
    date: "Oct. 2025",
    title: "Kate Moves to Baguio",
    description:
      "Kate moves to Baguio to finally start the next chapter of her life.",
    src: BASE_URL + `/timeline19.jpg`,
  },
    {
    date: "Nov. 2025",
    title: "First Job",
    description:
      "She finally got accepted to her first job!",
    src: BASE_URL + `/timeline20.jpg`,
  },
      {
    date: "Feb. 2026",
    title: "First Valentine's Day",
    description:
      "They look back on how far they've made it together.",
    src: BASE_URL + `/timeline21.jpg`,
  }
];
const generateItems = () => {
  return TIMELINE_DATA.map((datum, i) => {
    // Parallax randomness
    const depth = 0.5 + Math.random() * 0.5; // Depth factor (0.5 to 1.0)

    return {
      id: i,
      date: datum.date,
      title: datum.title,
      description: datum.description,
      src: BASE_URL +  datum.src,

      // Timeline Mode (Linear)
      t_x: i * (ITEM_WIDTH + GAP) + SIDE_PADDING,
      t_width: ITEM_WIDTH,
      t_depth: 1,

      // Parallax Mode (Scattered)
      p_x: i * (ITEM_WIDTH + GAP) * 0.8 + SIDE_PADDING + Math.random() * 100,
      p_y: 20 + Math.random() * 40, // Random vertical position (20-60vh)
      p_width: 300 * depth, // Size varies by depth
      p_depth: depth,
    };
  });
};

const HorizontalScrollPage = () => {
 const [mode, setMode] = useState('timeline'); // 'timeline' | 'parallax'
  const [items] = useState(() => generateItems());
  
  // Ref for the tall container that creates the scroll space
  const sectionRef = useRef(null);
  
  // 1. Calculate Content Width accurately
  // This is the true width of the "film strip" we are scrolling
  const totalContentWidth = useMemo(() => {
    if (mode === 'timeline') {
      const lastItem = items[items.length - 1];
      // Last item Position + Last item Width + End Padding
      return lastItem.t_x + lastItem.t_width + END_PADDING;
    } else {
      const lastItem = items[items.length - 1];
      // Note: In parallax, the 'visual' width can vary due to depth, 
      // but we use the calculated track position as a baseline.
      return lastItem.p_x + lastItem.p_width + END_PADDING;
    }
  }, [items, mode]);

  // 2. Dynamic Scroll Height
  // We calculate how tall the container needs to be to make the scroll feel "natural".
  // A good rule of thumb: 1px of vertical scroll = 1px of horizontal movement (1:1 ratio)
  // or slightly accelerated.
  const containerHeight = useMemo(() => {
    // If we want a 1:1 scroll feeling, height = totalContentWidth
    // We add 'window.innerHeight' to account for the viewport itself
    // We clamp it to a minimum so it doesn't break on small content
    if (typeof window === 'undefined') return 4000;
    return Math.max(2000, totalContentWidth);
  }, [totalContentWidth]);


  // --- Scroll Logic ---
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = sectionRef.current.offsetHeight;

      // Start scrolling when the section reaches top of viewport
      const start = 0;
      // End scrolling when the bottom of the section reaches bottom of viewport
      const end = sectionHeight - viewportHeight;
      
      // Current scroll position relative to the section start
      const scrollDist = -sectionRect.top;
      
      // Calculate progress (0 to 1)
      let progress = scrollDist / end;
      progress = Math.max(0, Math.min(progress, 1));

      // Total horizontal distance to move
      const maxTranslate = totalContentWidth - window.innerWidth;
      
      // Calculate current translation
      // If content is smaller than viewport, don't scroll
      const currentTranslate = maxTranslate > 0 ? progress * maxTranslate : 0;

      // Apply updates
      updateItems(currentTranslate);
    };

    const updateItems = (scrollOffset) => {
      items.forEach(item => {
        const el = document.getElementById(`item-${item.id}`);
        if (!el) return;

        const isTimeline = mode === 'timeline';
        const itemX = isTimeline ? item.t_x : item.p_x;
        const itemY = isTimeline ? 50 : item.p_y;
        const itemDepth = isTimeline ? 1 : item.p_depth;
        const width = isTimeline ? item.t_width : item.p_width;
        
        // Parallax Math:
        // visualX is the screen position. 
        // We subtract the scrollOffset multiplied by depth.
        // Higher depth (closer) moves faster (larger subtraction).
        const visualX = itemX - (scrollOffset * itemDepth);

        el.style.transform = `translate3d(${visualX}px, ${isTimeline ? '-50%' : '0'}, 0)`;
        el.style.top = isTimeline ? '50%' : `${itemY}%`;
        el.style.width = `${width}px`;
        el.style.zIndex = Math.floor(itemDepth * 100);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial sync
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [items, totalContentWidth, mode]);

  return (
    <div className="bg-white  text-neutral-900 font-nunito select-none">
      <section
        ref={sectionRef}
        className="relative w-full"
        style={{ height: `${SCROLL_HEIGHT_MULTIPLIER * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-neutral-900 text-white">
          {/* Background Decor */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10"></div>
          </div>

          {/* Controls */}
          <div className="absolute top-8 left-8 z-50 flex items-center gap-4">
            <button
              onClick={() =>
                setMode((m) => (m === "timeline" ? "parallax" : "timeline"))
              }
              className="flex cursor-pointer items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors"
            >
              <span>
                {mode === "timeline" ? "Parallax Mode" : "Timeline Mode"}
              </span>
            </button>
          </div>

          {/* Title Overlay */}
          <div className="absolute top-8 right-8 z-50 text-right opacity-50">
            <span className="block text-xs font-mono uppercase tracking-widest">
              Kitkat & Tino
            </span>
            <span className="block text-4xl font-bold font-serif">
              2025 - ∞
            </span>
          </div>

          {/* The Track */}
          <div className="absolute inset-0 w-full h-full">
            {items.map((item) => (
              <div
                key={item.id}
                id={`item-${item.id}`}
                className="absolute will-change-transform"
                style={{
                  top: "55%",
                  left: 0,
                  // width set by JS
                }}
              >
                {/* Content Card */}
                <div
                  className={`relative group transition-all cursor-pointer ${mode === "timeline" ? "" : ""}`}
                >
                  {/* Image wrapper */}
                  <div
                    className={`relative overflow-hidden bg-neutral-800 shadow-2xl duration-500
                      ${mode === "timeline" ? "max-h-[50vh] rounded-xl" : "outline-6 outline-white"}
                    `}
                    style={{ aspectRatio: "3/4" }}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-opacity duration-700 transform ease-in-out ${mode !== "timeline" && "group-hover:opacity-100 opacity-70"}`}
                    />

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 ${mode !== "timeline" && "group-hover:opacity-100"}`}>
                      <span className="text-[#E54666] font-mono text-xs uppercase mb-2">
                        {item.date}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Timeline Static Text (Only visible if not hovered in timeline mode, creates a clean look) */}
                  <div
                    className={`mt-6 transition-opacity duration-300 ${mode === "timeline" ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="h-px w-12 bg-white/50 mb-4"></div>
                    <span className="text-4xl font-light text-neutral-500 block mb-2">
                      {item.date}
                    </span>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <h4 className="text-xl text-neutral-300 font-[300] text-pretty">{item.description}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HorizontalScrollPage;
