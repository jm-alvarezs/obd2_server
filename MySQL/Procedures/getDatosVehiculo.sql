DROP PROCEDURE IF EXISTS getDatosVehiculo;
DELIMITER //
CREATE PROCEDURE getDatosVehiculo(IN input_cmdID VARCHAR(40), IN input_VIN VARCHAR(40), IN input_limit INT, IN input_offset INT)
BEGIN
SELECT VIN, cmdID, avg(cmdResult) as cmdResult, DATE_FORMAT(fecha_hora, "%Y-%m-%d %h:%i") as fecha_hora
FROM Dato 
WHERE cmdID = input_cmdID AND avg(cmdResult) NOT LIKE "NODATA"
GROUP BY VIN, cmdID, DATE_FORMAT(fecha_hora, "%Y-%m-%d %h:%i")
ORDER BY fecha_hora ASC
LIMIT input_limit OFFSET input_offset;
END //
DELIMITER ;