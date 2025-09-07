/* Delimitatore cambiato in ; */
/* Connessione a 127.0.0.1 tramite MariaDB or MySQL (TCP/IP), nome utente root, usando la password: Yes… */
SELECT CONNECTION_ID();
SHOW VARIABLES;
/* Changing character set from utf8mb4 to utf8mb4 */
/* Set di caratteri: utf8mb4 */
SHOW /*!50002 GLOBAL */ STATUS;
SELECT NOW();
/* Connesso. ID thread: 214 */
/* Reading function definitions from C:\Program Files\HeidiSQL\functions-mysql8.ini */
SHOW TABLES FROM `information_schema`;
/* Collegamento alla sessione “Unnamed” */
/* Caricamento del file “C:\Users\Fabio\AppData\Roaming\HeidiSQL\Backups\query-tab-.sql” (36 B) nella scheda query n° 1 */
/* Caricamento del file “C:\Users\Fabio\AppData\Roaming\HeidiSQL\Backups\query-tab-2025-09-05_17-01-08-210.sql” (26,1 KiB) nella scheda query n° 2 */
/* Ridimensionamento dei controlli ai DPI dello schermo: 100% */
USE manga_soul;
SELECT * FROM user;
/* Righe interessate: 0  Righe trovate: 1  Avvisi: 0  Durata di 2 query: 0,000 sec. */
USE manga_soul;
SELECT * FROM library;
/* Righe interessate: 0  Righe trovate: 0  Avvisi: 0  Durata di 2 query: 0,000 sec. */
USE manga_soul;
INSERT INTO library
VALUES 
(1, 1, '', 'no'),
(1, 2, '', 'no'),
(1, 8, '', 'no'),
(1, 10, '', 'no'),
(1, 12, '', 'no'),
(1, 15, '', 'no'),
(1, 18, '', 'no'),
(1, 21, '', 'no'),
(1, 25, '', 'no'),
(1, 27, '', 'no'),
(1, 30, '', 'no'),
(1, 37, '', 'no')
;
/* Errore SQL (1136): Column count doesn't match value count at row 1 */
/* Righe interessate: 0  Righe trovate: 0  Avvisi: 0  Durata di 1 di 2 query: 0,000 sec. */
USE manga_soul;
INSERT INTO library (user_id, manga_id, STATUS, fav)
VALUES 
(1, 1, '', 'no'),
(1, 2, '', 'no'),
(1, 8, '', 'no'),
(1, 10, '', 'no'),
(1, 12, '', 'no'),
(1, 15, '', 'no'),
(1, 18, '', 'no'),
(1, 21, '', 'no'),
(1, 25, '', 'no'),
(1, 27, '', 'no'),
(1, 30, '', 'no'),
(1, 37, '', 'no')
;
/* Errore SQL (1452): Cannot add or update a child row: a foreign key constraint fails (`manga_soul`.`library`, CONSTRAINT `library_ibfk_2` FOREIGN KEY (`manga_id`) REFERENCES `manga` (`id`)) */
/* Righe interessate: 0  Righe trovate: 0  Avvisi: 0  Durata di 1 di 2 query: 0,000 sec. */
USE manga_soul;
INSERT INTO `author` 
VALUES
(1, 'Kentaro Miura', '1966-07-11'),
(2, 'Naoki Urasawa', '1960-01-02'),
(3, 'Khoei Horikoshi', '1986-11-20'),
(4, 'Yūki Tabata', '1984-07-30'),
(5, 'Eiichirō Oda', '1975-01-01'),
(6, 'Hiromu Arakawa', '1973-05-08'),
(7, 'Yoshihiro Togashi', '1966-04-27'),
(8, 'Masashi Kishimoto', '1974-11-08'),
(9, 'Tite Kubo', '1977-06-26'),
(10, 'Daiki Kobayashi', '1991-09-23'),
(11, 'Aka Akasaka', '1988-08-29'),
(12, 'One', '1986-10-28'),
(13, 'Hiro Mashima', '1977-05-03'),
(14, 'Hajime Isayama', '1986-08-29'),
(15, 'Shinobu Ōtaka', '1983-05-09'),
(16, 'Osamu Tezuka', '1928-11-03'),
(17, 'Yu Aida', '1977-11-08'),
(18, 'Yana Toboso', '1984-01-24'),
(19, 'Rei Hiroe', '1972-12-05'),
(20, 'Kazuki Takahashi', '1961-10-04'),
(21, 'Gō Nagai', '1945-09-06'),
(22, 'Atsushi Ōkubo', '1979-09-20'),
(23, 'Makoto Yukimura', '1976-05-08'),
(24, 'Tatsuki Fujimoto', '1993-10-10'),
(25, 'Yūji Kaku', '1984-12-20'),
(26, 'Junji Itō', '1963-07-31'),
(27, 'Gege Akutami', '1992-02-26'),
(28, 'Hirohiko Araki', '1960-06-07'),
(29, 'Katsuhiro Ōtomo', '1954-04-15'),
(30, 'Akira Toriyama', '1955-04-05');
/* Errore SQL (1062): Duplicate entry '1' for key 'author.PRIMARY' */
/* Righe interessate: 0  Righe trovate: 0  Avvisi: 0  Durata di 1 di 3 query: 0,000 sec. */
USE manga_soul;
SELECT * FROM manga;
/* Righe interessate: 0  Righe trovate: 37  Avvisi: 0  Durata di 2 query: 0,000 sec. */
USE manga_soul;
INSERT INTO library (user_id, manga_id, STATUS, fav)
VALUES 
(1, 1, '', 'no'),
(1, 2, '', 'no'),
(1, 8, '', 'no'),
(1, 10, '', 'no'),
(1, 13, '', 'no'),
(1, 17, '', 'no'),
(1, 18, '', 'no'),
(1, 21, '', 'no'),
(1, 27, '', 'no'),
(1, 29, '', 'no'),
(1, 30, '', 'no'),
(1, 37, '', 'no')
;
/* Info: Records: 12  Duplicates: 0  Warnings: 0 */
/* Righe interessate: 12  Righe trovate: 0  Avvisi: 0  Durata di 2 query: 0,000 sec. */