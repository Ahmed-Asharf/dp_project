CREATE TABLE PLAYER(
   NAME VARCHAR(30),
   USERNAME VARCHAR(20),
   PASSWORD VARCHAR(20),
   PHONE VARCHAR(11),
   EMAIL VARCHAR(30),
   ADDRESS VARCHAR(50)
);


create table events(
	event_id varchar(5),
    startDate timestamp,
    endDate timestamp
);


create table administration(
	userName varchar(25),
    password varchar(25),
	admin_id varchar(5)
);

ALTER TABLE TOURNAMENTS ADD COLUMN IMAGE VARCHAR(100);
create table tour_info(
   id varchar(5),
   description varchar(500),
   primary key(id)
);
SELECT * FROM TEAMS;
TRUNCATE TEAMS;

SELECT * FROM MATCHES;
CREATE TABLE MATCHES(
   id varchar(5),
   teamA varchar(50),
   teamB varchar(50),
   tour_id varchar(5),
   winner varchar(50),
   match_date date
);

DROP TABLE MATCHES;
select * from matches;
DELETE FROM MATCHES WHERE TEAMB = 'PAPI';
INSERT INTO MATCHES VALUES('1', 'NAVI', 'PAPI', '1', NULL, '2021-01-01');


ALTER TABLE MATCHES ADD COLUMN id varchar(5) primary key;
ALTER TABLE TOUR_INFO RENAME COLUMN ID TO TOUR_ID;
create table players (
	id varchar(5),
    userName varchar(25),
    password varchar(16),
    phoneNumber varchar(11),
    email varchar(25),
    isBanned boolean default false,
    noOfTournaments int
);
ALTER TABLE PLAYERS RENAME COLUMN PLAYER_ID TO id;
ALTER TABLE PLAYERS RENAME COLUMN email to EMAIL;
create table teams(
	team_Name varchar(25),
    team_id varchar(5),
    levels varchar(15),
	knockedOut boolean default false
);
SET SQL_SAFE_UPDATES = 0;
ALTER TABLE PLAYERS ADD COLUMN tour_id varchar(5);
ALTER TABLE TOURNAMENTS MODIFY COLUMN ENDDATE DATE;
create table tournaments(	
    tour_id varchar(5),
    startDate timestamp,
    endDate timestamp,
    prize integer
);
SELECT * FROM TOUR_INFO;
ALTER TABLE TEAMS RENAME COLUMN ID TO id;
UPDATE TEAMS SET TOUR_ID = '1' WHERE TEAM_ID = '1';
INSERT INTO TEAMS(TEAM_ID, TEAM_NAME, SCORE) VALUES('1', 'NAVI', 5);
INSERT INTO TEAMS(TEAM_ID, TEAM_NAME, SCORE) VALUES('2', 'VITALITY', 2);
UPDATE TEAMS SET TOUR_ID = '15' WHERE TEAM_ID = 1 OR TEAM_ID = 2;
ALTER TABLE TOURNAMENTS RENAME COLUMN PLAYERs_PER_TEAM TO maxteams;
ALTER TABLE TEAMS ADD COLUMN SCORE INT;
ALTER TABLE TEAMS DROP COLUMN SCORE;
ALTER TABLE TOURNAMENTS ADD COLUMN time_added timestamp;
ALTER TABLE TOUR_INFO ADD COLUMN tagline varchar(100);
ALTER TABLE TOURNAMENTS MODIFY time_added varchar(20);
ALTER TABLE TEAMS DROP PLAYER_ID;
ALTER TABLE PLAYERS ADD COLUMN team_id varchar(5);
ALTER TABLE TOURNAMENTS RENAME COLUMN tour_id to id;
ALTER TABLE PLAYERS MODIFY EMAIL VARCHAR(50);
ALTER TABLE TOURNAMENTS MODIFY PRIZE VARCHAR(10);
ALTER TABLE TOUR_INFO MODIFY TAGLINE VARCHAR(500);
SELECT * FROM TOUR_INFO;
create table games(
	game_id varchar(5),
    game_Name varchar(25)
);
ALTER TABLE TOURNAMENTS ADD COLUMN maxplayers varchar(5);
ALTER TABLE TOURNAMENTS ADD COLUMN players_per_team varchar(5);
create table sponsours(
	sponsourId varchar(5),
    sponsourName varchar(25),
    investMoney integer
);
alter table sponsours add constraint pk_sponsour primary key(sponsourId); 
alter table events add constraint pk_event primary key(event_id);
alter table events add (sponsour_id varchar(5), tour_id varchar(5));
alter table administration add constraint pk_admin primary key(admin_id);
alter table administration add (tour_id varchar(5));
alter table players add constraint pk_player primary key (player_id);
alter table players add constraint unique_email unique(email);
alter table teams add constraint pk_team primary key(team_id);
alter table teams add tour_id varchar(5);
alter table teams add (player_id varchar(5),game_id varchar(5));
alter table tournaments add constraint pk_tour primary key (tour_id);
alter table tournaments add (game_id varchar(5), team_id varchar(5));
alter table games add constraint pk_game primary key (game_id);
alter table games add (tour_id varchar(5));
alter table events add constraint fk_sponsor foreign key(sponsour_id) references sponsours(sponsourId) on delete cascade on update cascade;
alter table events add constraint fk_event_tour foreign key(tour_id) references tournaments(tour_id) on delete cascade on update cascade;
alter table administration add constraint fk_tour foreign key (tour_id) references tournaments(tour_id) on delete cascade on update cascade;
alter table teams add constraint fk_player foreign key (player_id) references players(player_id) on delete cascade on update cascade;
alter table teams add constraint fk_game foreign key (game_id) references games(game_id) on delete cascade on update cascade;
alter table teams add constraint fk_tour_team  foreign key (tour_id) references tournaments(tour_id) on delete cascade on update cascade;
alter table tournaments add constraint fk_game_tour foreign key (game_id) references games(game_id) on delete cascade on update cascade;
alter table games add constraint fk_tour_game foreign key (tour_id) references tournaments(tour_id) on delete cascade on update cascade;

ALTER TABLE TOURNAMENTS ADD COLUMN tour_name VARCHAR(30);
UPDATE TOURNAMENTS SET tour_name = 'CSGO Battles' where game_id is null;

select * from tournaments;

