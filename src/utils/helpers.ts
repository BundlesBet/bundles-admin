export const capMaxBetEndTime = (matches: any) => {
  const allMatches = [...matches];
  if (allMatches.length > 1) {
    // eslint-disable-next-line sonarjs/prefer-immediate-return
    const sortedMatches = allMatches.sort((a: MatchData, b: MatchData) => {
      const aStartTime = new Date(a.startTime).getTime();
      const bStartTime = new Date(b.startTime).getTime();
      return aStartTime - bStartTime;
    });
    return sortedMatches;
  }
  return matches;
};

export const formatContractData = (matches: any) => {
  const selectedMatchIds: string[] = [];
  const selectedMatchNames: string[] = [];
  const selectedTeamAs: string[] = [];
  const selectedTeamBs: string[] = [];

  matches.forEach((match: any) => {
    if (selectedMatchIds.includes(match.espnMatchId.toString())) return;
    selectedMatchIds.push(match.espnMatchId);
    selectedMatchNames.push(match.name);
    selectedTeamAs.push(match.teams.a.abbreviation);
    selectedTeamBs.push(match.teams.b.abbreviation);
  });

  return {
    selectedMatchIds,
    selectedMatchNames,
    selectedTeamAs,
    selectedTeamBs,
  };
};

export const extractMatchIds = (matches: any) => {
  const selectedMatchIds: string[] = [];

  matches.forEach((match: any) => {
    if (selectedMatchIds.includes(match.espnMatchId.toString())) return;
    selectedMatchIds.push(match.espnMatchId.toString());
  });

  return selectedMatchIds;
};
