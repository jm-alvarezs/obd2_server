DROP PROCEDURE IF EXISTS getCargaCercana;
DELIMITER //
CREATE PROCEDURE getCargaCercana(IN input_fecha_hora DATETIME)
BEGIN
SELECT * FROM Carga
WHERE fecha_hora <= input_fecha_hora
ORDER BY fecha_hora DESC
LIMIT 1;
END //
DELIMITER ;