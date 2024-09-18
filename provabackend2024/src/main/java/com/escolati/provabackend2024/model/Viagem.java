package com.escolati.provabackend2024.model;

import com.escolati.provabackend2024.dto.PersistViagemRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

import static java.util.Objects.nonNull;

@Table(name = "VIAGEM")
@Entity
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class Viagem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "NOME")
    private String nome;
    @Column(name = "DT_SAIDA")
    private LocalDate dataSaida;
    @Column(name = "DT_CHEGADA")
    private LocalDate dataChegada;
    @Column(name = "VL_VIAGEM")
    private BigDecimal valor;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "DESTINO_ID")
    private Destino destino;

    public Viagem(PersistViagemRequestDTO dto) {
        this.nome = dto.nome();
        this.dataSaida = dto.dataSaida();
        this.dataChegada = dto.dataChegada();
        this.valor = dto.valor();
    }

    public void update(PersistViagemRequestDTO dto) {
        this.nome = dto.nome();
        this.dataSaida = dto.dataSaida();
        this.dataChegada = dto.dataChegada();
        this.valor = dto.valor();
    }

    public void addDestino(Destino destino) {
        if (nonNull(this.destino) && this.destino.getNome().equalsIgnoreCase(destino.getNome())) return;
        this.destino = destino;
    }

    public void removeDestino() {
        this.destino = null;
    }

}
