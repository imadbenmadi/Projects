CREATE EVENT delete_old_tokens
ON SCHEDULE EVERY 1 DAY
DO
  DELETE FROM Refresh_tokens WHERE createdAt < NOW() - INTERVAL 3 DAY;



-- CREATE EVENT delete_old_tokens_test
-- ON SCHEDULE EVERY 10 SECOND
-- DO
--   DELETE FROM Refresh_tokens WHERE createdAt < NOW() - INTERVAL 10 SECOND;
