/**
 * Please complete this component, adding
 * additional functions and components as needed
 */
import React from "react";

// Create the dark mode context
const DarkModeContext = React.createContext();

// Provide the context
const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? "dark" : ""}>{children}</div>
    </DarkModeContext.Provider>
  );
};

// Consume the context
const useDarkMode = () => {
  const context = React.useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

const Solution = ({ users }) => {
  // get random members for each team
  const home = users.slice(0, 4);
  const away = users.slice(4);

  // set initial state for teams
  const [homeTeam, setHomeTeam] = React.useState(home);
  const [awayTeam, setAwayTeam] = React.useState(away);

  const { darkMode, toggleDarkMode } = useDarkMode();

  // create function to move team member
  const handleMoveTeamMember = (team, memberToMove) => {
    if (team === "Home Team") {
      setHomeTeam((prev) =>
        prev.filter((member) => member.name !== memberToMove.name)
      );
      setAwayTeam([...awayTeam, memberToMove]);
    }
    if (team === "Away Team") {
      setAwayTeam((prev) =>
        prev.filter((member) => member.name !== memberToMove.name)
      );
      setHomeTeam([...homeTeam, memberToMove]);
    }
  };

  // get first and last name, ignore middle names
  const getInitials = (name) => {
    const parts = name.split(" ");
    const firstName = parts[0];
    const lastName = parts[parts.length - 1];
    return `${firstName[0]}${lastName[0]}`;
  };

  // add validation message display when there is a mismatch in team numbers
  const isTeamMismatch = (members) => {
    const numOfMemberstoMove =
      members.length - 4 === 1 ? `1 player` : `${members.length - 4} players`;
    if (members.length > 4) {
      return `Note: There is a mismatch! Each team must only have 4 players. Please move ${numOfMemberstoMove} to the other team!`;
    } else {
      return null;
    }
  };

  return (
    <>
      <button onClick={toggleDarkMode} className="theme-switch">
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="grid grid-cols-2 gap-4">
        <Team title="Home Team">
          <TeamMembers
            members={homeTeam}
            team="Home Team"
            getInitials={getInitials}
            onClickMove={handleMoveTeamMember}
            isTeamMismatch={isTeamMismatch}
          />
        </Team>
        <Team title="Away Team">
          <TeamMembers
            members={awayTeam}
            team="Away Team"
            getInitials={getInitials}
            onClickMove={handleMoveTeamMember}
            isTeamMismatch={isTeamMismatch}
          />
        </Team>
      </div>
    </>
  );
};

/* Create new component for mapped team members */
const TeamMembers = ({
  members,
  team,
  onClickMove,
  getInitials,
  isTeamMismatch,
}) => {
  // set state for the display of the move team member button
  const [hoveredTeamMemberId, setHoveredTeamMemberId] = React.useState(false);

  return (
    <div className="team-members-container">
      {members.map((member, index) => (
        <div
          key={member.name}
          className="member-row"
          onMouseEnter={() => setHoveredTeamMemberId(index)}
          onMouseLeave={() => setHoveredTeamMemberId(null)}
        >
          <div className="initial-circle">{getInitials(member.name)}</div>
          <div>{member.name}</div>
          {hoveredTeamMemberId === index && (
            <button onClick={() => onClickMove(team, member)}>
              Move to {team}
            </button>
          )}
        </div>
      ))}
      {isTeamMismatch(members) && (
        <div className="mismatch-validation">{isTeamMismatch(members)}</div>
      )}
    </div>
  );
};

// -- you are free to modify rest of the file below, but don't need to --

/**
 * Team container component
 * @param children - content to render inside container
 * @param title - title
 * @constructor
 */
const Team = ({ children, title }) => (
  <div className="py-4 rounded-xl bg-white shadow-lg team-container">
    <h3 className="text-2xl font-bold mb-4 px-4">{title}</h3>
    <div className="divide-y divide-gray-300">{children}</div>
  </div>
);

/**
 * Main application
 */

const App = () => {
  /**
   * This simulates a JSON payload fetched from server API
   */
  const users = [
    { name: "Arienne Kailyn Newell" },
    { name: "Morten Wilkinson" },
    { name: "Benedikte Beyer" },
    { name: "Serena Montagne" },
    { name: "Rasmus Juventas Gadsby" },
    { name: "Amrit Boris Hahn" },
    { name: "Samson Gunnhildr Ferber" },
    { name: "Anton David" },
  ];

  return (
    <DarkModeProvider>
      <main className="h-full">
        <h1 className="text-center text-gray-900 text-4xl font-bold">
          Change Teams Component
        </h1>
        <div className="h-full flex items-center justify-center">
          <div className="bg-gray-300 w-full p-4 panel">
            <Solution users={users} />
          </div>
        </div>
      </main>
    </DarkModeProvider>
  );
};

export default App;
