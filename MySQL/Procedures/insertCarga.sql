DROP PROCEDURE IF EXISTS insertCarga;
DELIMITER //
CREATE PROCEDURE insertCarga(IN input_VIN VARCHAR(100), IN input_latitud VARCHAR(140), IN input_longitud VARCHAR(140), IN input_fecha_hora DATETIME)
BEGIN
INSERT INTO Carga(VIN, fecha_hora, latitud, longitud) VALUES (input_VIN, input_fecha_hora, input_latitud, input_longitud);
SELECT last_insert_id() as idCarga LIMIT 1;
END //
DELIMITER ;