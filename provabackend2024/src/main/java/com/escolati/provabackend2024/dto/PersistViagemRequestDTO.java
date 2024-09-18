package com.escolati.provabackend2024.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record PersistViagemRequestDTO(
        String nome,
        LocalDate dataSaida,
        LocalDate dataChegada,
        BigDecimal valor,
        String destino
) {
}
