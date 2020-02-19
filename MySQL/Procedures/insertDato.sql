DROP PROCEDURE IF EXISTS insertDato;
DELIMITER //
CREATE PROCEDURE insertDato(IN input_VIN VARCHAR(100), IN input_cmdID VARCHAR(140), IN input_cmdResult VARCHAR(140), IN input_timestamp DATETIME)
BEGIN
INSERT INTO Dato (VIN, cmdID, cmdResult, timestamp) VALUES (input_VIN, input_cmdID, input_cmdResult, input_timestamp);
END //
DELIMITER ;