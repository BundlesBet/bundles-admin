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
  const contractMatchIds: string[] = [];
  const contractMatchNames: string[] = [];
  const contractTeamAs: string[] = [];
  const contractTeamBs: string[] = [];

  matches.forEach((match: any) => {
    if (contractMatchIds.includes(match.espnMatchId.toString())) return;
    contractMatchIds.push(match.espnMatchId.toString());
    contractMatchNames.push(match.name);
    contractTeamAs.push(match.teams.a.abbreviation);
    contractTeamBs.push(match.teams.b.abbreviation);
  });

  return {
    contractMatchIds,
    contractMatchNames,
    contractTeamAs,
    contractTeamBs,
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
