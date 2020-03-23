DROP PROCEDURE IF EXISTS insertCarga;
DELIMITER //
CREATE PROCEDURE insertCarga(IN input_VIN VARCHAR(100), IN input_latitud DECIMAL(10,10), IN input_longitud DECIMAL(10,10), IN input_fecha_hora DATETIME)
BEGIN
INSERT INTO Carga(VIN, fecha_hora, latitud, longitud) VALUES (input_VIN, input_fecha_hora, input_latitud, input_longitud);
SELECT last_insert_id() as idCarga LIMIT 1;
END //
DELIMITER ;