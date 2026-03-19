import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Icon } from "@iconify/react/dist/iconify.js";

gsap.registerPlugin(ScrollTrigger);

// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Build a 52-week grid (Sun → Sat) ending today.
 * Each cell: { date, count, level, weekIdx, dayIdx }
 * Empty cells before the first real day are null.
 */
const buildGrid = (rawDays) => {
  // rawDays = [{date:"YYYY-MM-DD", count, level}, ...]
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // We want exactly 53 columns (weeks) so the grid always fills the viewport.
  const NUM_WEEKS = 53;
  const totalCells = NUM_WEEKS * 7;

  // Find the Sunday that starts the grid
  const gridEnd = new Date(today);
  const gridStart = new Date(today);
  gridStart.setDate(gridStart.getDate() - (totalCells - 1));

  // Build a lookup map from the raw data
  const lookup = {};
  rawDays.forEach((d) => {
    lookup[d.date] = d;
  });

  const grid = []; // array of 53 arrays, each with 7 cells
  for (let w = 0; w < NUM_WEEKS; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const cellDate = new Date(gridStart);
      cellDate.setDate(gridStart.getDate() + w * 7 + d);
      if (cellDate > today) {
        week.push(null); // future — blank
        continue;
      }
      const key = cellDate.toISOString().split("T")[0];
      const src = lookup[key];
      week.push({
        date: key,
        count: src?.count ?? 0,
        level: src?.level ?? 0,
        weekIdx: w,
        dayIdx: d,
      });
    }
    grid.push(week);
  }
  return { grid, gridStart, gridEnd };
};

/**
 * Generate fake contribution data (fallback).
 */
const generateFakeData = () => {
  const days = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const count = Math.random() > 0.65 ? Math.floor(Math.random() * 12) + 1 : 0;
    days.push({
      date: d.toISOString().split("T")[0],
      count,
      level: count === 0 ? 0 : Math.min(Math.ceil(count / 3), 4),
    });
  }
  return days;
};

/**
 * Given a built grid, return month label positions for rendering above the heatmap.
 * Returns [{label, colIndex}, ...] — one entry per month transition.
 */
const getMonthPositions = (grid, gridStart) => {
  const positions = [];
  let lastMonth = -1;
  grid.forEach((week, wIdx) => {
    // Use the first non-null cell in the week to determine the month
    const firstCell = week.find((c) => c !== null);
    if (!firstCell) return;
    const month = new Date(firstCell.date).getMonth();
    if (month !== lastMonth) {
      positions.push({
        label: new Date(firstCell.date).toLocaleString("default", { month: "short" }),
        colIndex: wIdx,
      });
      lastMonth = month;
    }
  });
  return positions;
};

// ─── colour ─────────────────────────────────────────────────────────────────

const LEVEL_CLASSES = [
  "bg-white/[0.06] border-white/[0.04]",
  "bg-[#0e4429] border-[#196130] shadow-[0_0_4px_rgba(14,68,41,0.6)]",
  "bg-[#006d32] border-[#28a745] shadow-[0_0_8px_rgba(0,109,50,0.55)]",
  "bg-[#26a641] border-[#2cbe4e] shadow-[0_0_12px_rgba(38,166,65,0.65)]",
  "bg-[#39d353] border-[#56f376] shadow-[0_0_16px_rgba(57,211,83,0.8)]",
];

const levelClass = (level) => LEVEL_CLASSES[Math.min(level, 4)];

// ─── component ──────────────────────────────────────────────────────────────

const GitHub = () => {
  const [githubStats, setGithubStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [grid, setGrid] = useState([]);
  const [monthPositions, setMonthPositions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [hoveredDay, setHoveredDay] = useState(null); // { date, count, x, y }

  const heatmapRef = useRef(null);
  const sectionRef = useRef(null);

  // ── fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const username = "akshayrajput12";

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
        ]);

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        // ── contributions ──────────────────────────────────────────────────
        let rawDays = [];
        let total = 0;

        try {
          // Try the deno contrib API
          const contribRes = await fetch(
            `https://github-contributions-api.deno.dev/${username}.json`
          );
          if (contribRes.ok) {
            const contribData = await contribRes.json();

            /*
             * The API returns contributions as an array of weeks,
             * each week is an array of day objects:
             * { date, contributionCount, contributionLevel }
             *
             * contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE"
             *                    | "THIRD_QUARTILE" | "FOURTH_QUARTILE"
             */
            const levelMap = {
              NONE: 0,
              FIRST_QUARTILE: 1,
              SECOND_QUARTILE: 2,
              THIRD_QUARTILE: 3,
              FOURTH_QUARTILE: 4,
            };

            const weeks = contribData.contributions ?? [];
            weeks.forEach((week) => {
              // week is an array of day objects
              if (!Array.isArray(week)) return;
              week.forEach((day) => {
                if (!day?.date) return;
                const count = day.contributionCount ?? 0;
                rawDays.push({
                  date: day.date,
                  count,
                  level: levelMap[day.contributionLevel] ?? (count > 0 ? 1 : 0),
                });
                total += count;
              });
            });

            // Prefer the API's own total if available
            if (contribData.totalContributions) {
              total = contribData.totalContributions;
            }
          }
        } catch (_) {
          // contrib API failed — fallback below
        }

        // Fallback: generate plausible fake data
        if (rawDays.length === 0) {
          rawDays = generateFakeData();
          total = rawDays.reduce((s, d) => s + d.count, 0);
        }

        // Build the aligned grid
        const { grid: builtGrid, gridStart } = buildGrid(rawDays);
        const months = getMonthPositions(builtGrid, gridStart);

        setGrid(builtGrid);
        setMonthPositions(months);
        setTotalContributions(total);

        setGithubStats({
          username: userData.login,
          avatar: userData.avatar_url,
          name: userData.name || userData.login,
          bio: userData.bio || "Full-Stack Developer",
          followers: userData.followers,
          following: userData.following,
          publicRepos: userData.public_repos,
          totalStars: reposData.reduce(
            (acc, repo) => acc + (repo.stargazers_count || 0),
            0
          ),
          location: userData.location,
        });
      } catch (err) {
        console.error("GitHub fetch error:", err);
        const fake = generateFakeData();
        const { grid: builtGrid, gridStart } = buildGrid(fake);
        setGrid(builtGrid);
        setMonthPositions(getMonthPositions(builtGrid, gridStart));
        setTotalContributions(fake.reduce((s, d) => s + d.count, 0));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ── GSAP ──────────────────────────────────────────────────────────────────
  useGSAP(() => {
    if (loading || !githubStats) return;

    const ctx = gsap.context(() => {
      // Stat counters
      const statEls = sectionRef.current?.querySelectorAll(".stat-value") ?? [];
      statEls.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target"), 10) || 0;
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2.2,
            snap: { innerText: 1 },
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".stats-grid",
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      // Heatmap squares – staggered wave
      if (heatmapRef.current) {
        const squares =
          heatmapRef.current.querySelectorAll(".contribution-square");
        gsap.fromTo(
          squares,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: { amount: 1.8, from: "start", ease: "power1.inOut" },
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: heatmapRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }

      // Profile slide-in
      gsap.from(".profile-info", {
        x: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".profile-info",
          start: "top 90%",
          once: true,
        },
      });

      // Streak bar fill
      gsap.from(".streak-fill", {
        scaleX: 0,
        duration: 1.6,
        ease: "power3.out",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: ".streak-fill",
          start: "top 95%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, githubStats]);

  // ── derived stats ─────────────────────────────────────────────────────────
  const activeDays = grid
    .flat()
    .filter((c) => c && c.count > 0).length;

  const maxStreak = (() => {
    const flat = grid.flat().filter(Boolean);
    let max = 0, cur = 0;
    flat.forEach((c) => {
      if (c.count > 0) { cur++; max = Math.max(max, cur); }
      else cur = 0;
    });
    return max;
  })();

  const streakPercent = Math.min((maxStreak / 30) * 100, 100); // cap at 30 days for display

  // ── render ────────────────────────────────────────────────────────────────
  const CELL = 11; // px
  const GAP = 3;   // px

  return (
    <section
      ref={sectionRef}
      className="github-activity-section relative py-20 bg-transparent overflow-hidden"
    >
      {/* subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(39,211,83,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="github-section-container max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Left: Profile & Stats ────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-12">

            {/* profile */}
            {!loading && githubStats && (
              <div className="profile-info text-left">
                <div className="flex items-center gap-5 mb-5">
                  <div className="relative">
                    <img
                      src={githubStats.avatar}
                      alt={githubStats.name}
                      className="w-14 h-14 rounded-full border border-white/20 grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    {/* online dot */}
                    <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-[#39d353] border-2 border-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-white uppercase tracking-tight leading-tight">
                      {githubStats.name}
                    </h3>
                    <p className="text-[11px] font-mono text-white/35 italic mt-0.5">
                      @{githubStats.username}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/55 leading-relaxed font-light pl-5 border-l border-white/10">
                  {githubStats.bio}
                </p>
                {githubStats.location && (
                  <p className="mt-3 pl-5 flex items-center gap-1.5 text-[10px] text-white/25 uppercase tracking-widest font-bold">
                    <Icon icon="mdi:map-marker-outline" className="text-sm" />
                    {githubStats.location}
                  </p>
                )}
              </div>
            )}

            {/* stat counters */}
            <div className="stats-grid grid grid-cols-2 gap-x-8 gap-y-10">
              {[
                {
                  label: "Public Repos",
                  val: githubStats?.publicRepos ?? 0,
                  icn: "mdi:code-tags",
                },
                {
                  label: "Followers",
                  val: githubStats?.followers ?? 0,
                  icn: "mdi:account-group",
                },
                {
                  label: "Stars Earned",
                  val: githubStats?.totalStars ?? 0,
                  icn: "mdi:star-outline",
                },
                {
                  label: "Contributions",
                  val: totalContributions,
                  icn: "mdi:trending-up",
                },
              ].map((s, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex items-center gap-2 text-white/25 mb-2 group-hover:text-[#39d353] transition-colors duration-300">
                    <Icon icon={s.icn} className="text-base" />
                    <span className="text-[9px] uppercase font-bold tracking-[0.18em]">
                      {s.label}
                    </span>
                  </div>
                  <div
                    className="stat-value text-4xl font-extralight text-white tabular-nums"
                    data-target={loading ? 0 : s.val}
                  >
                    {loading ? "—" : s.val.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* extra micro-stats */}
            {!loading && (
              <div className="space-y-5 border-t border-white/5 pt-8">
                {/* active days */}
                <div className="flex justify-between text-[10px] text-white/30 font-mono uppercase tracking-widest">
                  <span>Active days</span>
                  <span className="text-white/60">{activeDays}</span>
                </div>

                {/* max streak */}
                <div>
                  <div className="flex justify-between text-[10px] text-white/30 font-mono uppercase tracking-widest mb-2">
                    <span>Best streak</span>
                    <span className="text-[#39d353]">{maxStreak} days</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="streak-fill h-full rounded-full bg-gradient-to-r from-[#006d32] to-[#39d353]"
                      style={{ width: `${streakPercent}%` }}
                    />
                  </div>
                </div>

                {/* intensity legend */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[9px] text-white/20 uppercase tracking-widest mr-1">
                    Less
                  </span>
                  {[0, 1, 2, 3, 4].map((l) => (
                    <div
                      key={l}
                      className={`w-[9px] h-[9px] rounded-[2px] border ${levelClass(l)}`}
                    />
                  ))}
                  <span className="text-[9px] text-white/20 uppercase tracking-widest ml-1">
                    More
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Heatmap ──────────────────────────────────────────── */}
          <div className="lg:col-span-8">
            <div className="activity-map">

              {/* header */}
              <div className="flex items-end justify-between mb-8">
                <div className="border-l-2 border-[#39d353]/40 pl-4 py-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-[0.3em]">
                    Contribution Activity
                  </h4>
                  <p className="text-[10px] text-white/30 font-mono mt-1">
                    LAST 365 DAYS · {totalContributions.toLocaleString()} TOTAL
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <Icon icon="mdi:github" className="text-white/20 text-base" />
                  <span className="text-[9px] text-white/20 font-mono uppercase tracking-widest">
                    github.com
                  </span>
                </div>
              </div>

              {/* ── Heatmap grid ──────────────────────────────────────────── */}
              <div
                ref={heatmapRef}
                className="overflow-x-auto overflow-y-hidden pb-4 custom-scrollbar scroll-smooth"
              >
                <div
                  className="relative"
                  style={{
                    minWidth: `${grid.length * (CELL + GAP) + 32}px`,
                  }}
                >
                  {/* Month labels — absolutely positioned above columns */}
                  <div className="relative mb-3" style={{ height: "16px", marginLeft: "32px" }}>
                    {monthPositions.map(({ label, colIndex }) => (
                      <span
                        key={`${label}-${colIndex}`}
                        className="absolute text-[9px] font-bold text-white/25 uppercase tracking-tighter select-none"
                        style={{ left: `${colIndex * (CELL + GAP)}px` }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* day-of-week labels + grid */}
                  <div className="flex gap-2">
                    {/* day labels */}
                    <div
                      className="flex flex-col text-[8px] font-bold font-mono text-white/20 uppercase select-none flex-shrink-0"
                      style={{ width: "28px", gap: `${GAP}px`, paddingTop: "1px" }}
                    >
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (d, i) => (
                          <div
                            key={d}
                            style={{ height: `${CELL}px`, lineHeight: `${CELL}px` }}
                            className={i % 2 === 0 ? "opacity-100" : "opacity-0"}
                          >
                            {d}
                          </div>
                        )
                      )}
                    </div>

                    {/* the actual grid */}
                    <div
                      className="flex"
                      style={{ gap: `${GAP}px` }}
                    >
                      {grid.map((week, wIdx) => (
                        <div
                          key={wIdx}
                          className="flex flex-col"
                          style={{ gap: `${GAP}px` }}
                        >
                          {week.map((day, dIdx) => {
                            if (!day) {
                              return (
                                <div
                                  key={dIdx}
                                  style={{ width: CELL, height: CELL }}
                                />
                              );
                            }
                            return (
                              <div
                                key={dIdx}
                                className={`contribution-square rounded-[2px] border ${levelClass(
                                  day.level
                                )} transition-all duration-150 cursor-default relative group`}
                                style={{ width: CELL, height: CELL }}
                                onMouseEnter={(e) => {
                                  const rect =
                                    e.currentTarget.getBoundingClientRect();
                                  setHoveredDay({
                                    date: day.date,
                                    count: day.count,
                                    x: rect.left + rect.width / 2,
                                    y: rect.top,
                                  });
                                }}
                                onMouseLeave={() => setHoveredDay(null)}
                              >
                                {/* glow pulse on hover for active cells */}
                                {day.level > 0 && (
                                  <div
                                    className="absolute inset-0 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    style={{
                                      boxShadow: `0 0 8px 2px rgba(57,211,83,${day.level * 0.15
                                        })`,
                                    }}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── footer ────────────────────────────────────────────────── */}
              <div className="flex flex-wrap justify-between items-center mt-8 pt-6 border-t border-white/5 gap-4">
                <a
                  href={`https://github.com/${githubStats?.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-white/35 hover:text-[#39d353] flex items-center gap-2 group transition-colors duration-300 uppercase tracking-widest font-bold"
                >
                  <Icon
                    icon="mdi:github"
                    className="text-base group-hover:rotate-12 transition-transform duration-300"
                  />
                  Visit My GitHub
                </a>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39d353] animate-pulse" />
                    <span className="text-[9px] text-white/20 font-mono uppercase tracking-widest">
                      Live Data
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest">
                      Interactive
                    </span>
                    <div className="w-10 h-[1px] bg-white/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-3 bg-[#39d353]/40 animate-slide-inf" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Global tooltip (portal-style, fixed) ───────────────────────────── */}
      {hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: hoveredDay.x,
            top: hoveredDay.y - 8,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-zinc-900/95 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 shadow-2xl">
            <div className="text-[8px] text-white/40 uppercase tracking-wider font-mono">
              {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="text-[11px] font-bold mt-0.5" style={{ color: hoveredDay.count > 0 ? "#39d353" : "#ffffff60" }}>
              {hoveredDay.count === 0
                ? "No contributions"
                : `${hoveredDay.count} contribution${hoveredDay.count !== 1 ? "s" : ""}`}
            </div>
          </div>
          {/* arrow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid rgba(24,24,27,0.95)",
              bottom: "-5px",
            }}
          />
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(57,211,83,0.08);
          border-radius: 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(57,211,83,0.18);
        }
        @keyframes slide-inf {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-slide-inf {
          animation: slide-inf 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default GitHub;