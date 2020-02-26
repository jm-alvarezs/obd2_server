DROP PROCEDURE IF EXISTS getPromedioMinuto;
DELIMITER //
CREATE PROCEDURE getPromedioMinuto()
BEGIN
SELECT 
    cmdID,
    ROUND(AVG(cmdResult), 2) AS promedio,
    count(cmdResult) AS datos,
    DATE_FORMAT(Dato.timestamp, '%Y-%m-%d %H:%i') AS fecha_hora
FROM
    Dato
GROUP BY cmdID , DATE_FORMAT(Dato.timestamp, '%Y %m %d %H %i');
END //
DELIMITER ;