package com.escolati.provabackend2024.dto;

import com.escolati.provabackend2024.model.Viagem;

import java.math.BigDecimal;
import java.time.LocalDate;

import static java.util.Objects.nonNull;

public record ViagemDTO(
        Long id,
        String nome,
        LocalDate dataSaida,
        LocalDate dataChegada,
        BigDecimal valor,
        String destino
) {
    public ViagemDTO(Viagem viagem) {
        this(viagem.getId(), viagem.getNome(), viagem.getDataSaida(), viagem.getDataChegada(), viagem.getValor(), nonNull(viagem.getDestino()) ? viagem.getDestino().getNome() : null);
    }
}
