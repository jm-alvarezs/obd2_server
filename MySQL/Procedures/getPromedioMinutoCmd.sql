DROP PROCEDURE IF EXISTS getPromedioMinutoCmd;
DELIMITER //
CREATE PROCEDURE getPromedioMinutoCmd(IN input_cmdID VARCHAR(100))
BEGIN
SELECT 
    cmdID,
    ROUND(AVG(cmdResult), 2) AS promedio,
    count(cmdResult) AS datos,
    DATE_FORMAT(Dato.timestamp, '%Y-%m-%d %H:%i') AS fecha_hora
FROM
    Dato
WHERE cmdID = input_cmdID
GROUP BY cmdID , DATE_FORMAT(Dato.timestamp, '%Y %m %d %H %i');
END //
DELIMITER ;