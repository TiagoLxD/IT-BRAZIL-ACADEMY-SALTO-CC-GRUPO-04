-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "betValue" REAL NOT NULL,
    "id_user" TEXT NOT NULL,
    CONSTRAINT "Match_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user_one" TEXT NOT NULL,
    "id_user_two" TEXT NOT NULL,
    CONSTRAINT "Team_id_user_one_fkey" FOREIGN KEY ("id_user_one") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Team_id_user_two_fkey" FOREIGN KEY ("id_user_two") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MatchStarted" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_match" TEXT NOT NULL,
    "id_team_one" TEXT NOT NULL,
    "id_team_two" TEXT NOT NULL,
    CONSTRAINT "MatchStarted_id_match_fkey" FOREIGN KEY ("id_match") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MatchStarted_id_team_one_fkey" FOREIGN KEY ("id_team_one") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MatchStarted_id_team_two_fkey" FOREIGN KEY ("id_team_two") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MatchWon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_matchStarted" TEXT NOT NULL,
    "id_team" TEXT NOT NULL,
    "dateEnding" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MatchWon_id_matchStarted_fkey" FOREIGN KEY ("id_matchStarted") REFERENCES "MatchStarted" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MatchWon_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MatchProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_matchStarted" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_card" INTEGER NOT NULL,
    CONSTRAINT "MatchProgress_id_matchStarted_fkey" FOREIGN KEY ("id_matchStarted") REFERENCES "MatchStarted" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MatchProgress_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MatchProgress_id_card_fkey" FOREIGN KEY ("id_card") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MatchPoints" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_matchProgress" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    CONSTRAINT "MatchPoints_id_matchProgress_fkey" FOREIGN KEY ("id_matchProgress") REFERENCES "MatchProgress" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
